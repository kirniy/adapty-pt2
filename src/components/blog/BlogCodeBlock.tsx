"use client";

import { useMemo, useState } from "react";
import Prism from "prismjs";
import { CheckCircle2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-php";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

const LANGUAGE_ALIASES: Record<string, string> = {
    "objective c": "Objective-C",
    "objective-c": "Objective-C",
    "react native": "React Native",
    "react-native": "React Native",
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

const PRISM_LANGUAGE_ALIASES: Record<string, string> = {
    "objective-c": "objectivec",
    "objective c": "objectivec",
    "react native": "jsx",
    "react-native": "jsx",
    "javascript": "javascript",
    "js": "javascript",
    "typescript": "typescript",
    "ts": "typescript",
    "shell": "bash",
    "sh": "bash",
    "html": "markup",
    "xml": "markup",
};

const normalizeCodeBlock = (code: string, language?: string) => {
    let label = language && language !== "text" ? language : "";
    let normalized = code;

    if (!label) {
        const lines = code.split("\n");
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

    return { code: normalized, label };
};

const getPrismLanguage = (language?: string) => {
    if (!language) return "markup";
    const lower = language.toLowerCase();
    return PRISM_LANGUAGE_ALIASES[lower] || lower;
};

type BlogCodeBlockProps = {
    code: string;
    language?: string;
    className?: string;
};

export function BlogCodeBlock({ code, language, className }: BlogCodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const normalized = useMemo(() => normalizeCodeBlock(code, language), [code, language]);
    const label = normalized.label || (language && language !== "text" ? language : "Code");
    const prismLanguage = getPrismLanguage(label || language);

    const highlighted = useMemo(() => {
        const grammar = Prism.languages[prismLanguage] || Prism.languages.markup;
        return Prism.highlight(normalized.code || "", grammar, prismLanguage);
    }, [normalized.code, prismLanguage]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(normalized.code || "");
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={cn("my-6", className)}>
            <div className="flex items-center justify-between rounded-t-2xl border border-border-subtle bg-[#171725] px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{label}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="blog-code-block overflow-x-auto rounded-b-2xl border border-t-0 border-border-subtle bg-[#0F0F1A] px-5 py-4 text-sm leading-relaxed">
                <code
                    className={`language-${prismLanguage}`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            </pre>
        </div>
    );
}
