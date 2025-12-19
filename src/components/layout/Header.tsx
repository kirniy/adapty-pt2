"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/CustomButton";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProductMenu } from "./menus/ProductMenu";
import { CasesMenu } from "./menus/CasesMenu";
import { ResourcesMenu } from "./menus/ResourcesMenu";
import { DocsMenu } from "./menus/DocsMenu";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
    {
        label: "Product",
        component: ProductMenu,
    },
    {
        label: "Cases",
        component: CasesMenu,
    },
    {
        label: "Resources",
        component: ResourcesMenu,
    },
    {
        label: "Docs",
        component: DocsMenu,
    },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "https://adapty.io/pricing", external: true },
    { label: "web2app", href: "https://funnelfox.com/", external: true, highlight: true },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth h-[80px] flex items-center",
                isScrolled || hoveredNav
                    ? "bg-white/95 backdrop-blur-md border-b border-border-subtle"
                    : "bg-transparent"
            )}
            onMouseLeave={() => setHoveredNav(null)}
        >
            <Container className="flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4">
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
                            <div
                                key={item.label}
                                className="group relative"
                                onMouseEnter={() => item.component && setHoveredNav(item.label)}
                            >
                                {item.component ? (
                                    <button
                                        className={cn(
                                            "flex items-center gap-1 text-[15px] font-medium transition-all duration-300 ease-smooth py-6",
                                            hoveredNav === item.label ? "text-brand" : "text-foreground-secondary hover:text-foreground"
                                        )}
                                    >
                                        {item.label}
                                        <ChevronDown className={cn(
                                            "w-4 h-4 transition-transform duration-300",
                                            hoveredNav === item.label ? "rotate-180 text-brand" : "opacity-50 group-hover:opacity-100"
                                        )} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href || "#"}
                                        target={item.external ? "_blank" : undefined}
                                        className={cn(
                                            "text-[15px] font-medium transition-all duration-300 ease-smooth block py-6",
                                            item.highlight ? "text-[#FF8A00] hover:text-[#FF8A00]/80" : "text-foreground-secondary hover:text-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://app.adapty.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-medium text-brand hover:text-brand-dark transition-all duration-300 ease-smooth whitespace-nowrap px-4 py-2 rounded-lg border border-brand/20 hover:border-brand/40"
                    >
                        Sign up &gt;
                    </a>
                    <a
                        href="https://adapty.io/schedule-demo/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="bg-[#5900FF] hover:bg-[#4500C6] text-white">Contact sales &gt;</Button>
                    </a>
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
                            <div key={item.label}>
                                <div className="text-2xl font-semibold mb-2">{item.label}</div>
                                {/** Mobile sub-menus could be expanded here, simplified for now **/}
                            </div>
                        ))}
                    </div>
                )}
                {/* Centered Mega Menu Dropdown */}
                <AnimatePresence>
                    {hoveredNav && (
                        (() => {
                            const item = NAV_ITEMS.find(i => i.label === hoveredNav);
                            if (!item || !item.component) return null;
                            const Component = item.component;
                            return (
                                <motion.div
                                    key="mega-menu"
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-[80px] left-1/2 -translate-x-1/2 pt-2 z-40"
                                    onMouseEnter={() => setHoveredNav(hoveredNav)}
                                    onMouseLeave={() => setHoveredNav(null)}
                                >
                                    <Component />
                                </motion.div>
                            );
                        })()
                    )}
                </AnimatePresence>
            </Container>
        </header>
    );
}
