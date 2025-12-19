import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read blog posts JSON
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-posts.json'), 'utf8'));

// Get file extension from URL
function getExtension(url) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
    return ext;
  }
  return '.webp';
}

// Update image paths to local
blogData.posts = blogData.posts.map(post => {
  const ext = getExtension(post.image);
  return {
    ...post,
    imageLocal: `/blog/${post.slug}${ext}`,
    imageOriginal: post.image
  };
});

// Write updated JSON
fs.writeFileSync(
  path.join(__dirname, 'blog-posts.json'),
  JSON.stringify(blogData, null, 2)
);

console.log('Updated blog-posts.json with local image paths');
console.log(`Total posts: ${blogData.posts.length}`);
