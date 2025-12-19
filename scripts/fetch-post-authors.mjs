#!/usr/bin/env node
/**
 * Fetches live Adapty blog posts and extracts author names/slugs.
 * Updates scripts/blog-posts.json with author + authorSlug fields and
 * refreshes the authors list.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogPostsPath = path.join(__dirname, 'blog-posts.json');
const blogData = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));

const USER_AGENT = 'Mozilla/5.0 (compatible; AdaptyBot/1.0; +https://adapty.io)';

function cleanUrl(url) {
  if (!url) return url;
  return url.split('?')[0];
}

function slugFromAuthorUrl(url) {
  if (!url) return null;
  const match = url.match(/\/author\/([^/]+)\/?$/i);
  return match ? match[1] : null;
}

function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function typeIncludes(node, type) {
  if (!node || !node['@type']) return false;
  const t = node['@type'];
  if (Array.isArray(t)) return t.includes(type);
  return t === type;
}

function collectJsonLdNodes(root, nodes) {
  if (!root) return;
  if (Array.isArray(root)) {
    root.forEach(item => collectJsonLdNodes(item, nodes));
    return;
  }
  if (typeof root !== 'object') return;
  nodes.push(root);
  if (Array.isArray(root['@graph'])) {
    root['@graph'].forEach(item => collectJsonLdNodes(item, nodes));
  }
}

function parseJsonLd(html) {
  const nodes = [];
  const scriptRegex = /<script[^>]+type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      collectJsonLdNodes(parsed, nodes);
    } catch {
      // Skip invalid JSON-LD blocks
    }
  }
  return nodes;
}

function extractAuthorFromJsonLd(nodes) {
  const nodeById = new Map();
  const people = [];

  for (const node of nodes) {
    if (node['@id']) nodeById.set(node['@id'], node);
    if (typeIncludes(node, 'Person') && node.name) {
      const url = node.url || node['@id'] || '';
      if (url.includes('/author/')) {
        people.push({ name: node.name, url });
      }
    }
  }

  for (const node of nodes) {
    if (!typeIncludes(node, 'Article') && !typeIncludes(node, 'BlogPosting') && !typeIncludes(node, 'NewsArticle')) {
      continue;
    }

    const author = node.author;
    if (!author) continue;

    const pickAuthor = item => {
      if (!item) return null;
      if (typeof item === 'string') {
        const byId = nodeById.get(item);
        if (byId && byId.name) {
          return { name: byId.name, url: byId.url || byId['@id'] || item };
        }
        return null;
      }
      if (typeof item === 'object') {
        if (item.name) {
          return { name: item.name, url: item.url || item['@id'] || '' };
        }
        if (item['@id']) {
          const byId = nodeById.get(item['@id']);
          if (byId && byId.name) {
            return { name: byId.name, url: byId.url || byId['@id'] || item['@id'] };
          }
        }
      }
      return null;
    };

    if (Array.isArray(author)) {
      for (const item of author) {
        const picked = pickAuthor(item);
        if (picked) return picked;
      }
    } else {
      const picked = pickAuthor(author);
      if (picked) return picked;
    }
  }

  if (people.length > 0) return people[0];
  return null;
}

function extractAuthorFromMeta(html) {
  const metaMatch = html.match(/<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  if (!metaMatch) return null;
  return { name: metaMatch[1].trim(), url: '' };
}

function extractAuthorFromHtml(html) {
  const nameMatch = html.match(/id=["']?author-name["']?[^>]*>([^<]+)</i);
  const urlMatch = html.match(/href=(?:'|\")?https?:\/\/adapty\.io\/author\/([^\s\"'>]+)\/?(?:'|\")?/i);
  if (!nameMatch && !urlMatch) return null;
  const name = nameMatch ? nameMatch[1].trim() : null;
  const slug = urlMatch ? urlMatch[1].trim() : null;
  const url = slug ? `https://adapty.io/author/${slug}/` : '';
  if (!name && !slug) return null;
  return { name: name || slug, url };
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
}

async function main() {
  const posts = blogData.posts || [];
  const updatedAuthors = new Map();
  const nameToPreferred = new Map();
  let updatedCount = 0;
  let missingCount = 0;

  for (const post of posts) {
    const url = cleanUrl(post.url);
    if (!url) {
      missingCount++;
      continue;
    }

    try {
      const html = await fetchHtml(url);
      const nodes = parseJsonLd(html);
      let author = extractAuthorFromJsonLd(nodes);
      if (!author) author = extractAuthorFromMeta(html);
      if (!author) author = extractAuthorFromHtml(html);

      if (!author || !author.name) {
        console.log(`  [MISS] ${post.slug} - author not found`);
        missingCount++;
        continue;
      }

      const slugFromUrl = slugFromAuthorUrl(author.url);
      const authorSlug = slugFromUrl || slugifyName(author.name);
      const authorName = author.name.trim();
      const fromUrl = Boolean(slugFromUrl);

      const preferred = nameToPreferred.get(authorName);
      if (!preferred || (!preferred.fromUrl && fromUrl)) {
        nameToPreferred.set(authorName, { slug: authorSlug, fromUrl });
      }

      const finalSlug = nameToPreferred.get(authorName).slug;
      post.author = authorName;
      post.authorSlug = finalSlug;
      updatedAuthors.set(finalSlug, { name: authorName, slug: finalSlug });
      updatedCount++;
      console.log(`  ✓ ${post.slug} -> ${post.author}`);
    } catch (err) {
      console.log(`  ✗ ${post.slug} - ${err.message}`);
      missingCount++;
    }
  }

  // Update authors list, preserving existing bios when available
  const existingBios = new Map();
  for (const author of blogData.authors || []) {
    if (author.slug && author.bio) existingBios.set(author.slug, author.bio);
    if (author.name && author.bio) existingBios.set(author.name, author.bio);
  }

  const authors = Array.from(updatedAuthors.values()).sort((a, b) => a.name.localeCompare(b.name));
  blogData.authors = authors.map(author => ({
    name: author.name,
    slug: author.slug,
    bio: existingBios.get(author.slug) || existingBios.get(author.name) || ''
  }));

  fs.writeFileSync(blogPostsPath, JSON.stringify(blogData, null, 2));

  console.log(`\nUpdated authors for ${updatedCount} posts.`);
  if (missingCount > 0) {
    console.log(`Missing author for ${missingCount} posts.`);
  }
  console.log(`Authors list now has ${blogData.authors.length} entries.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
