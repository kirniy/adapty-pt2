"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/CustomButton";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
    {
        label: "Product",
        href: "#",
        children: [
            { label: "Subscriptions SDK", href: "/product/sdk" },
            { label: "Paywall Builder", href: "/product/paywall" },
            { label: "A/B Testing", href: "/product/ab-testing" },
            { label: "Analytics", href: "/product/analytics" },
        ],
    },
    {
        label: "Solutions",
        href: "#",
        children: [
            { label: "For Developers", href: "/solutions/developers" },
            { label: "For Marketers", href: "/solutions/marketers" },
            { label: "For App Owners", href: "/solutions/owners" },
        ]
    },
    {
        label: "Resources", href: "#", children: [
            { label: "Blog", href: "/blog" },
            { label: "Documentation", href: "/docs" },
            { label: "Case Studies", href: "/case-studies" },
        ]
    },
    { label: "Pricing", href: "https://adapty.io/pricing", external: true },
    { label: "Blog", href: "/blog" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth h-[116px] flex items-center",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-border-subtle h-[80px]"
                    : "bg-transparent"
            )}
        >
            <Container className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <Image
                            src="/logos/adapty-logo-black.svg"
                            alt="Adapty"
                            width={110}
                            height={24}
                            className="h-6 w-auto"
                            style={{ width: "auto" }}
                        />
                    </Link>
                    <LanguageSwitcher />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="group relative">
                            {item.children ? (
                                <button className="flex items-center gap-1 text-[15px] font-medium text-foreground-secondary hover:text-foreground transition-all duration-300 ease-smooth py-2">
                                    {item.label}
                                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ) : item.external ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[15px] font-medium text-foreground-secondary hover:text-foreground transition-all duration-300 ease-smooth"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-[15px] font-medium text-foreground-secondary hover:text-foreground transition-all duration-300 ease-smooth"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://app.adapty.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-medium text-foreground hover:text-brand transition-all duration-300 ease-smooth whitespace-nowrap"
                    >
                        Log in
                    </a>
                    <Button>Sign up</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="absolute inset-0 top-0 h-screen w-full bg-white flex flex-col pt-32 px-6 gap-6 md:hidden">
                        {NAV_ITEMS.map(item => (
                            item.external ? (
                                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="text-2xl font-semibold">{item.label}</a>
                            ) : (
                                <Link key={item.label} href={item.href} className="text-2xl font-semibold">{item.label}</Link>
                            )
                        ))}
                        <div className="mt-8 flex flex-col gap-4">
                            <Button className="w-full" size="lg">Sign up</Button>
                            <a href="https://app.adapty.io" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" className="w-full" size="lg">Log in</Button>
                            </a>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}
