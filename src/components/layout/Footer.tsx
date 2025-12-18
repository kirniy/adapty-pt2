"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin, Disc as Discord } from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { label: "Paywall Builder", href: "/product/paywall" },
            { label: "A/B Testing", href: "/product/ab-testing" },
            { label: "Analytics", href: "/product/analytics" },
            { label: "Integrations", href: "/integrations" },
            { label: "SDKs", href: "/docs/sdks" },
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Blog", href: "/blog" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Community", href: "/community" },
            { label: "Help Center", href: "/help" },
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ]
    },
];

const SOCIAL_LINKS = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Discord className="w-5 h-5" />, href: "#", label: "Discord" },
];

export function Footer() {
    return (
        <footer className="bg-white border-t border-border-subtle pt-24 pb-12">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-24 mb-24">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col items-start">
                        <Link href="/" className="mb-8 block">
                            <Image src="/logos/adapty-logo-black.svg" alt="Adapty" width={120} height={28} className="h-7 w-auto" />
                        </Link>
                        <p className="text-foreground-secondary leading-relaxed mb-8 max-w-sm">
                            Grow your mobile app subscription revenue with data-driven insights, A/B testing, and paywall management.
                        </p>

                        <div className="flex items-center gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-foreground-secondary hover:bg-foreground hover:text-white transition-all duration-300 ease-smooth"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-2 md:col-span-8 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {FOOTER_LINKS.map((group) => (
                            <div key={group.title}>
                                <h4 className="font-bold text-foreground mb-6">{group.title}</h4>
                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-foreground-secondary hover:text-brand transition-colors duration-200 block text-sm font-medium"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-secondary/60">
                    <p>© {new Date().getFullYear()} Adapty Tech Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms</Link>
                        <Link href="/sitemap" className="hover:text-foreground">Sitemap</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
