#!/usr/bin/env node
/**
 * Fetches missing blog posts in parallel using native fetch
 * Much faster than scraping one by one
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Missing post slugs
const missingSlugs = [
  'paywall-newsletter-23',
  'paywall-newsletter-22',
  'how-health-and-fitness-apps-nail-upselling-on-ios',
  '9-subscription-trends-dominating-2025',
  'paywall-newsletter-21',
  'how-to-lower-cac-with-ad-platform-signals',
  'state-of-in-app-subscriptions-2025-in-10-minutes',
  'from-pmf-to-profit-in-subscription-app',
  'quickstart-adapty-setup-guide-react-native-with-expo',
  'wwdc25-what-apple-announced',
  'how-to-build-personalized-paywalls',
  'add-android-in-app-purchases-to-your-app',
  'quickstart-adapty-setupguide-ios-with-swiftui',
  'how-to-use-push-notifications-to-increase-app-revenue',
  'quickstart-adapty-setup-guide-ios-with-uikit',
  'guide-to-ad-testing',
  'revenuecat-alternatives-why-i-switched-to-adapty',
  'new-us-ruling-on-external-ios-payments',
  'why-japanese-aso-creatives-need-different-strategy',
  'why-your-web-to-app-funnel-is-broken-and-how-to-fix-it',
  'paywall-newsletter-20',
  'how-to-optimize-aso-for-japan',
  'what-is-web-to-app-and-how-does-it-work',
  'february-adapty-updates-rich-text-smarter-taxes-and-more',
  'what-japanese-paywalls-look-like-and-why-western-strategies-wont-work'
];

/**
 * Extracts text content from HTML (basic extraction)
 */
function extractContent(html) {
  // Find the article content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!articleMatch) return null;

  let content = articleMatch[1];

  // Remove script and style tags
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Convert headers
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');

  // Convert paragraphs
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');

  // Convert lists
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');

  // Convert bold/strong
  content = content.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');

  // Convert italic/em
  content = content.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Convert links
  content = content.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Remove remaining HTML tags
  content = content.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&#39;/g, "'");
  content = content.replace(/&ldquo;/g, '"');
  content = content.replace(/&rdquo;/g, '"');
  content = content.replace(/&lsquo;/g, "'");
  content = content.replace(/&rsquo;/g, "'");
  content = content.replace(/&mdash;/g, '—');
  content = content.replace(/&ndash;/g, '–');

  // Clean up whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();

  return content;
}

async function fetchPost(slug) {
  const url = `https://adapty.io/blog/${slug}/`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error(`  [ERR] ${slug}: HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();
    const content = extractContent(html);

    if (content && content.length > 100) {
      console.log(`  [OK] ${slug} (${content.length} chars)`);
      return { slug, content, url };
    } else {
      console.error(`  [WARN] ${slug}: No content extracted`);
      return null;
    }
  } catch (err) {
    console.error(`  [ERR] ${slug}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`Fetching ${missingSlugs.length} missing posts in parallel...\n`);

  // Fetch all posts in parallel
  const results = await Promise.all(missingSlugs.map(fetchPost));

  // Filter successful results
  const successful = results.filter(r => r !== null);

  console.log(`\nSuccessfully fetched: ${successful.length}/${missingSlugs.length}`);

  // Save to file
  const outputPath = path.join(__dirname, 'fetched-missing-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    fetchedAt: new Date().toISOString(),
    total: successful.length,
    posts: successful
  }, null, 2));

  console.log(`Saved to: ${outputPath}`);
}

main().catch(console.error);
