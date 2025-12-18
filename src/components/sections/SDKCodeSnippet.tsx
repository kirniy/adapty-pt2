"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React, { useState } from "react";
import { Check, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = 'swift' | 'kotlin' | 'flutter' | 'react-native';

const CODE_EXAMPLES: Record<Tab, string> = {
    swift: `import Adapty

// 1. Activate Adapty
try await Adapty.activate("PUBLIC_KEY")

// 2. Display paywall
if let paywall = try await Adapty.getPaywall("placement_id") {
    // show your paywall view
}

// 3. Make purchase
let result = try await Adapty.makePurchase(product: product)
if result.accessLevel["premium"]?.isActive == true {
    // grant access
}`,
    kotlin: `import com.adapty.Adapty

// 1. Activate Adapty
Adapty.activate(context, "PUBLIC_KEY")

// 2. Display paywall
Adapty.getPaywall("placement_id") { result ->
    val paywall = result.getOrNull()
}

// 3. Make purchase
Adapty.makePurchase(activity, product) { result ->
    if (result.success) {
        // grant access
    }
}`,
    flutter: `import 'package:adapty_flutter/adapty_flutter.dart';

// 1. Activate Adapty
try {
  await Adapty.activate().activate();
} catch (e) {
  print(e);
}

// 2. Display paywall
final paywall = await Adapty().getPaywall(placementId: "placement_id");

// 3. Make purchase
final result = await Adapty().makePurchase(product: product);
if (result?.accessLevel["premium"]?.isActive == true) {
   // grant access
}`,
    'react-native': `import { adapty } from 'react-native-adapty';

// 1. Activate Adapty
await adapty.activate('PUBLIC_KEY');

// 2. Display paywall
const paywall = await adapty.getPaywall('placement_id');

// 3. Make purchase
const result = await adapty.makePurchase(product);
if (result.accessLevel['premium'].isActive) {
  // grant access
}`
};

export const SDKCodeSnippet = () => {
    const [activeTab, setActiveTab] = useState<Tab>('swift');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(CODE_EXAMPLES[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section className="py-24 bg-background-secondary border-y border-border-subtle overflow-hidden">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            10 lines of code <br /> to get started
                        </h2>
                        <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                            Our SDK is open-source, lightweight, and designed for developers.
                            It handles everything from subscription state to receipt validation.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                'Automatic receipt validation',
                                'Real-time subscription status',
                                'Paywall A/B testing built-in',
                                'Offline mode support'
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center text-brand flex-shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-foreground font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border-subtle shadow-sm">
                                <Image src="/sdks/swift.svg" alt="Swift" width={24} height={24} />
                                <span className="font-semibold">iOS</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border-subtle shadow-sm">
                                <Image src="/sdks/kotlin.svg" alt="Kotlin" width={24} height={24} />
                                <span className="font-semibold">Android</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border-subtle shadow-sm">
                                <Image src="/sdks/flutter.svg" alt="Flutter" width={24} height={24} />
                                <span className="font-semibold">Flutter</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative group perspective-1000 min-w-0">
                        {/* Abstract glow */}
                        <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full -z-10 group-hover:bg-brand/30 transition-colors duration-500" />

                        <div className="bg-[#1E1E2E] rounded-xl shadow-2xl border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
                            {/* Window Actions + Tabs */}
                            <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-white/5 bg-[#252535] gap-3">
                                <div className="flex gap-2 flex-shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="flex gap-1 bg-black/20 p-1 rounded-lg overflow-x-auto scrollbar-hide">
                                    {(['swift', 'kotlin', 'flutter', 'react-native'] as Tab[]).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                "px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200 capitalize whitespace-nowrap flex-shrink-0",
                                                activeTab === tab
                                                    ? "bg-white/10 text-white shadow-sm"
                                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                            )}
                                        >
                                            {tab.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Code Area */}
                            <div className="p-4 md:p-6 overflow-x-auto relative group/code">
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover/code:opacity-100"
                                    title="Copy code"
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>

                                <pre className="font-mono text-[11px] md:text-sm leading-relaxed text-[#CDD6F4] min-w-0">
                                    <code className="block">
                                        {CODE_EXAMPLES[activeTab].split('\n').map((line, i) => (
                                            <div key={i} className="table-row">
                                                <span className="table-cell select-none text-right pr-2 md:pr-4 text-white/20 w-6 md:w-8">{i + 1}</span>
                                                <span className="table-cell whitespace-pre-wrap break-words">
                                                    {highlightSyntax(line)}
                                                </span>
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

// Simple syntax highlighter for the demo
function highlightSyntax(code: string) {
    // Basic rules
    const rules = [
        { regex: /\/\/.*/g, color: '#565f89' }, // Comments
        { regex: /"(.*?)"/g, color: '#9ECE6A' }, // Strings
        { regex: /\b(import|try|await|if|let|var|const|final|val|fun|return)\b/g, color: '#BB9AF7' }, // Keywords
        { regex: /\b(Adapty|adapty)\b/g, color: '#7AA2F7' }, // Classes/Objects
        { regex: /\b(activate|getPaywall|makePurchase)\b/g, color: '#7DCFFF' }, // Functions
    ];

    let parts = [{ text: code, color: '' }];

    // Very naive implementation for visual demo only
    // In production we'd use PrismJS or similar

    // For now, let's keep it simple and just return the string if simple regex fails or just color keywords
    // Reverting to manual span wrapping for specific known keywords for stability

    // Check for comments first - prevents duplication bug
    if (code.trim().startsWith('//')) {
        return <span className="text-[#565f89]">{code}</span>;
    }

    // Quick manual highlighting for key terms
    const words = code.split(' ');
    return words.map((word, i) => {
        let color = '#CDD6F4';
        if (['import', 'try', 'await', 'if', 'let', 'val', 'const', 'final', 'catch', 'final'].includes(word)) color = '#BB9AF7';
        if (word.includes('"') || word.includes("'")) color = '#9ECE6A';
        if (word.includes('Adapty') || word.includes('adapty')) color = '#7AA2F7';
        if (word.includes('activate') || word.includes('getPaywall') || word.includes('makePurchase')) color = '#7DCFFF';

        return <span key={i} style={{ color }}>{word} </span>
    });
}
