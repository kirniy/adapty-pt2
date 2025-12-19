import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read blog posts JSON
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-posts.json'), 'utf8'));

const blogDir = path.join(__dirname, '..', 'public', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(destPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Get file extension from URL
function getExtension(url) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
    return ext;
  }
  return '.webp';
}

async function downloadAllImages() {
  console.log(`Downloading ${blogData.posts.length} blog images...`);
  console.log('');

  let success = 0;
  let failed = 0;

  for (const post of blogData.posts) {
    const ext = getExtension(post.image);
    const filename = `${post.slug}${ext}`;
    const destPath = path.join(blogDir, filename);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭ Skipping (exists): ${filename}`);
      success++;
      continue;
    }

    try {
      await downloadFile(post.image, destPath);
      console.log(`✓ Downloaded: ${filename}`);
      success++;
    } catch (err) {
      console.log(`✗ Failed: ${filename} - ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`Done! ${success} downloaded, ${failed} failed`);

  // List files
  const files = fs.readdirSync(blogDir);
  console.log(`\nFiles in ${blogDir}:`);
  console.log(`Total: ${files.length} files`);
}

downloadAllImages().catch(console.error);
