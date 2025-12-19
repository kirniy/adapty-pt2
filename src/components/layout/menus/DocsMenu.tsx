"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SIDEBAR_LINKS = [
    { title: "Quick start", href: "https://adapty.io/docs/quickstart/" },
    { title: "Migrate to Adapty", href: "https://adapty.io/docs/migration/" },
    { title: "Platform status page", href: "https://status.adapty.io/" },
    { title: "Support Center", href: "https://adapty.io/support/" },
];

const SECTIONS = {
    mobile: {
        title: "MOBILE SDK",
        items: [
            { title: "iOS", href: "https://adapty.io/docs/ios-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-apple.svg" },
            { title: "Android", href: "https://adapty.io/docs/android-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-android.svg" },
            { title: "React Native", href: "https://adapty.io/docs/react-native-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-react.svg" },
            { title: "Unity", href: "https://adapty.io/docs/unity-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-unity.svg" },
            { title: "Flutter", href: "https://adapty.io/docs/flutter-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-flutter.svg" },
            { title: "FlutterFlow", href: "https://adapty.io/docs/flutterflow-installation/", icon: "https://adapty.io/assets/uploads/2024/04/flutterflow-1.svg" },
            { title: "Capacitor", href: "https://adapty.io/docs/capacitor-installation/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-capacitor.svg" },
            { title: "Kotlin Multiplatform", href: "https://adapty.io/docs/kmp-installation/", icon: "https://adapty.io/assets/uploads/2024/05/kmp.svg" },
        ]
    },
    web: {
        title: "WEB PAYMENTS",
        items: [
            { title: "Stripe", href: "https://adapty.io/docs/stripe/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-stripe.svg" },
        ]
    },
    api: {
        title: "WEB API",
        items: [
            { title: "Server-side API", href: "https://adapty.io/docs/api/", icon: "https://adapty.io/assets/uploads/2024/03/icon-20x20-api.svg" },
        ]
    }
};

export function DocsMenu() {
    return (
        <div className="flex w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden border border-border-subtle p-2">
            {/* Sidebar */}
            <div className="w-[200px] flex-shrink-0 flex flex-col gap-1 p-6 border-r border-border-subtle/50">
                {SIDEBAR_LINKS.map((link) => (
                    <Link
                        key={link.title}
                        href={link.href}
                        className="text-[15px] font-bold text-foreground py-2 hover:text-brand transition-colors block leading-snug"
                    >
                        {link.title}
                    </Link>
                ))}
                <Link
                    href="https://adapty.io/docs/"
                    className="flex items-center gap-1 text-[15px] font-bold text-foreground hover:text-brand transition-colors mt-4 group"
                >
                    All docs
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-white grid grid-cols-4 gap-x-8 gap-y-10">
                {/* Mobile SDKs - spans 4 cols */}
                <div className="col-span-4">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-4">
                        {SECTIONS.mobile.title}
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                        {SECTIONS.mobile.items.map(item => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group flex items-center gap-2.5 p-1 -ml-1 rounded-lg hover:bg-background-secondary/50 transition-colors"
                            >
                                <div className="w-5 h-5 flex-shrink-0 relative">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[14px] font-medium text-foreground group-hover:text-brand transition-colors">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Web Payments */}
                <div className="col-span-2">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-4">
                        {SECTIONS.web.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                        {SECTIONS.web.items.map(item => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group flex items-center gap-2.5 p-1 -ml-1 rounded-lg hover:bg-background-secondary/50 transition-colors"
                            >
                                <div className="w-5 h-5 flex-shrink-0 relative">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[14px] font-medium text-foreground group-hover:text-brand transition-colors">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Web API */}
                <div className="col-span-2">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-4">
                        {SECTIONS.api.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                        {SECTIONS.api.items.map(item => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group flex items-center gap-2.5 p-1 -ml-1 rounded-lg hover:bg-background-secondary/50 transition-colors"
                            >
                                <div className="w-5 h-5 flex-shrink-0 relative">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[14px] font-medium text-foreground group-hover:text-brand transition-colors">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
