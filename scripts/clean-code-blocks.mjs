#!/usr/bin/env node
/**
 * Cleans blog code blocks in Sanity:
 * - de-duplicates consecutive identical code blocks
 * - pulls language labels from the first line when missing
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/clean-code-blocks.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5c34qsa",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-19",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.SANITY_API_TOKEN) {
  console.error("Missing SANITY_API_TOKEN. Aborting.");
  process.exit(1);
}

const LANGUAGE_ALIASES = {
  "objective c": "Objective-C",
  "objective-c": "Objective-C",
  "react native": "React Native",
  "c#": "C#",
  "csharp": "C#",
  "js": "JavaScript",
  "ts": "TypeScript",
};

const KNOWN_LANGUAGES = new Set([
  "Swift",
  "Kotlin",
  "Objective-C",
  "Java",
  "JavaScript",
  "TypeScript",
  "React Native",
  "Flutter",
  "Dart",
  "C#",
  "Python",
  "Ruby",
  "PHP",
  "Go",
  "Rust",
  "SQL",
  "Bash",
  "Shell",
  "JSON",
  "HTML",
  "CSS",
]);

function normalizeCodeBlock(code, language) {
  let label = language && language !== "text" ? language : "";
  let normalized = code || "";

  if (!label) {
    const lines = normalized.split("\n");
    const firstLineIndex = lines.findIndex((line) => line.trim() !== "");
    if (firstLineIndex >= 0) {
      const raw = lines[firstLineIndex].trim();
      const lower = raw.toLowerCase();
      const mapped = LANGUAGE_ALIASES[lower] || raw;
      if (KNOWN_LANGUAGES.has(mapped)) {
        label = mapped;
        lines.splice(0, firstLineIndex + 1);
        if (lines[0] === "") {
          lines.shift();
        }
        normalized = lines.join("\n");
      }
    }
  }

  return { code: normalized, language: label || language };
}

function cleanBody(body) {
  const cleaned = [];
  let changed = false;

  for (const block of body) {
    const prev = cleaned[cleaned.length - 1];
    if (block?._type === "codeBlock" && prev?._type === "codeBlock" && prev.code === block.code) {
      changed = true;
      continue;
    }

    if (block?._type === "codeBlock") {
      const normalized = normalizeCodeBlock(block.code, block.language);
      if (normalized.code !== block.code || normalized.language !== block.language) {
        cleaned.push({ ...block, code: normalized.code, language: normalized.language || "text" });
        changed = true;
        continue;
      }
    }

    cleaned.push(block);
  }

  return { cleaned, changed };
}

const posts = await client.fetch(
  `*[_type == "blogPost" && count(body[_type == "codeBlock"]) > 0]{_id, slug, body}`
);

let updated = 0;

for (const post of posts) {
  const body = Array.isArray(post.body) ? post.body : [];
  const { cleaned, changed } = cleanBody(body);
  if (!changed) {
    continue;
  }

  await client.patch(post._id).set({ body: cleaned }).commit();
  updated += 1;
  console.log(`Updated ${post.slug?.current || post._id}`);
}

console.log(`Done. Updated ${updated} posts.`);
