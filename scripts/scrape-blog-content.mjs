#!/usr/bin/env node
/**
 * Scrapes full blog post content from Adapty.io and converts to Sanity Portable Text
 * Usage: node scripts/scrape-blog-content.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read blog posts
const blogPostsPath = path.join(__dirname, 'blog-posts.json');
const { posts } = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));

// Output directory for scraped content
const contentDir = path.join(__dirname, 'blog-content');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

/**
 * Converts markdown text to Sanity Portable Text blocks
 */
function markdownToPortableText(markdown) {
  if (!markdown) return [];

  const blocks = [];
  const lines = markdown.split('\n');
  let currentParagraph = [];
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeLanguage = '';

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join('\n').trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: [],
          children: parseInlineMarkup(text)
        });
      }
      currentParagraph = [];
    }
  }

  function generateKey() {
    return Math.random().toString(36).substring(2, 10);
  }

  function parseInlineMarkup(text) {
    const children = [];
    let remaining = text;

    // Simple text without markup
    if (!remaining.includes('**') && !remaining.includes('*') && !remaining.includes('[') && !remaining.includes('`')) {
      return [{ _type: 'span', _key: generateKey(), text: remaining, marks: [] }];
    }

    // Parse inline markup (bold, italic, links, code)
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(remaining)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: remaining.substring(lastIndex, match.index),
          marks: []
        });
      }

      const matched = match[0];

      if (matched.startsWith('**') && matched.endsWith('**')) {
        // Bold
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(2, -2),
          marks: ['strong']
        });
      } else if (matched.startsWith('*') && matched.endsWith('*')) {
        // Italic
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(1, -1),
          marks: ['em']
        });
      } else if (matched.startsWith('`') && matched.endsWith('`')) {
        // Inline code
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(1, -1),
          marks: ['code']
        });
      } else if (matched.startsWith('[')) {
        // Link - for now just extract the text
        const linkMatch = matched.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: linkMatch[1],
            marks: []
          });
        }
      }

      lastIndex = match.index + matched.length;
    }

    // Add remaining text
    if (lastIndex < remaining.length) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: remaining.substring(lastIndex),
        marks: []
      });
    }

    return children.length > 0 ? children : [{ _type: 'span', _key: generateKey(), text: remaining, marks: [] }];
  }

  for (const line of lines) {
    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: generateKey(),
            text: codeBlockContent.join('\n'),
            marks: ['code']
          }]
        });
        inCodeBlock = false;
        codeBlockContent = [];
        codeLanguage = '';
      } else {
        // Start code block
        flushParagraph();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Empty line - flush paragraph
    if (line.trim() === '') {
      flushParagraph();
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h1',
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: line.slice(2).trim(), marks: [] }]
      });
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: line.slice(3).trim(), marks: [] }]
      });
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: line.slice(4).trim(), marks: [] }]
      });
      continue;
    }

    if (line.startsWith('#### ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h4',
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: line.slice(5).trim(), marks: [] }]
      });
      continue;
    }

    // Bullet points
    if (line.match(/^[-*]\s/)) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: parseInlineMarkup(line.slice(2).trim())
      });
      continue;
    }

    // Numbered list
    if (line.match(/^\d+\.\s/)) {
      flushParagraph();
      const text = line.replace(/^\d+\.\s/, '').trim();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: [],
        children: parseInlineMarkup(text)
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        markDefs: [],
        children: parseInlineMarkup(line.slice(2).trim())
      });
      continue;
    }

    // Skip images (we handle them separately if needed)
    if (line.startsWith('![') || line.includes('![')) {
      continue;
    }

    // Regular text - add to current paragraph
    currentParagraph.push(line);
  }

  // Flush any remaining paragraph
  flushParagraph();

  return blocks;
}

/**
 * Extracts article body from scraped markdown
 * Removes navigation, footer, and other non-content elements
 */
function extractArticleBody(markdown, title) {
  if (!markdown) return '';

  // Find the start of the article content (after the title and metadata)
  const lines = markdown.split('\n');
  let startIndex = 0;
  let endIndex = lines.length;

  // Skip until we find the main content
  // Usually after "min read" or author info
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (line.includes('min read') || line.includes('minute read')) {
      startIndex = i + 1;
      break;
    }
    // Also check for the actual title to skip past header
    if (line.includes(title?.toLowerCase()?.slice(0, 30))) {
      startIndex = i + 1;
    }
  }

  // Find where the footer/related content starts
  for (let i = lines.length - 1; i >= startIndex; i--) {
    const line = lines[i].toLowerCase();
    if (
      line.includes('related posts') ||
      line.includes('continue reading') ||
      line.includes('recommended for you') ||
      line.includes('share this') ||
      line.includes('subscribe to') ||
      line.includes('try adapty') ||
      line.includes('get started') ||
      line.includes('© adapty') ||
      line.includes('privacy policy') ||
      line.includes('terms of service') ||
      line.includes('book a demo')
    ) {
      endIndex = i;
      break;
    }
  }

  // Extract the body content
  const bodyLines = lines.slice(startIndex, endIndex);

  // Clean up the content
  const cleanedLines = bodyLines.filter(line => {
    const trimmed = line.trim().toLowerCase();
    // Skip navigation elements
    if (trimmed.startsWith('[') && (trimmed.includes('blog') || trimmed.includes('home') || trimmed.includes('pricing'))) {
      return false;
    }
    // Skip social share buttons
    if (trimmed.includes('share on') || trimmed.includes('tweet this')) {
      return false;
    }
    return true;
  });

  return cleanedLines.join('\n').trim();
}

// Main execution
async function main() {
  console.log(`Found ${posts.length} blog posts to process`);

  // Create a mapping file for later import
  const mappingData = {
    posts: [],
    processedAt: new Date().toISOString()
  };

  for (const post of posts) {
    console.log(`\nProcessing: ${post.slug}`);

    const contentFile = path.join(contentDir, `${post.slug}.json`);

    // Check if already processed
    if (fs.existsSync(contentFile)) {
      console.log(`  Already processed, skipping`);
      const existing = JSON.parse(fs.readFileSync(contentFile, 'utf-8'));
      mappingData.posts.push(existing);
      continue;
    }

    // For now, create placeholder entries
    // The actual scraping will be done via Firecrawl MCP
    const entry = {
      slug: post.slug,
      title: post.title,
      url: post.url,
      needsScraping: true
    };

    mappingData.posts.push(entry);
  }

  // Write mapping file
  const mappingFile = path.join(contentDir, '_mapping.json');
  fs.writeFileSync(mappingFile, JSON.stringify(mappingData, null, 2));

  console.log(`\nMapping file created: ${mappingFile}`);
  console.log(`Posts needing scraping: ${mappingData.posts.filter(p => p.needsScraping).length}`);
}

main().catch(console.error);

// Export for use in other scripts
export { markdownToPortableText, extractArticleBody };
