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

const TABLE_DIVIDER_RE = /\|\s*-{3,}\s*\|/;

function unescapeMarkdown(value) {
  return value.replace(/\\([_[\](){}/])/g, "$1");
}

function extractTableCode(block) {
  if (!block || block._type !== "block" || block.style !== "normal" || block.listItem) {
    return null;
  }

  const rawText = Array.isArray(block.children)
    ? block.children.map((child) => child.text || "").join("")
    : "";

  if (!rawText || !rawText.includes("|") || !TABLE_DIVIDER_RE.test(rawText)) {
    return null;
  }

  const normalized = rawText
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  const segments = normalized
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const contentSegments = segments.filter((segment) => !/^[-–—]+$/.test(segment));
  if (contentSegments.length !== 1) {
    return null;
  }

  const code = unescapeMarkdown(contentSegments[0]).trim();
  return code || null;
}

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
    const tableCode = extractTableCode(block);
    if (tableCode) {
      cleaned.push({
        _key: block._key,
        _type: "codeBlock",
        code: tableCode,
        language: "text",
      });
      changed = true;
      continue;
    }

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

const posts = await client.fetch(`*[_type == "blogPost"]{_id, slug, body}`);

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
