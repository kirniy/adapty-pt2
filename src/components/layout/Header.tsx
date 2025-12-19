"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/CustomButton";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProductMenu } from "./menus/ProductMenu";
import { CasesMenu } from "./menus/CasesMenu";
import { ResourcesMenu } from "./menus/ResourcesMenu";
import { DocsMenu } from "./menus/DocsMenu";
import { AnimatePresence, motion } from "framer-motion";

// Mobile menu data - simplified versions of mega menus
const MOBILE_MENU_DATA: Record<string, { title: string; href: string }[]> = {
    Product: [
        { title: "Subscriptions SDK", href: "https://adapty.io/sdk/" },
        { title: "Paywall Builder", href: "https://adapty.io/paywall-builder/" },
        { title: "A/B Testing", href: "https://adapty.io/paywall-ab-testing/" },
        { title: "Revenue Analytics", href: "https://adapty.io/revenue-analytics/" },
        { title: "LTV Analytics", href: "https://adapty.io/ltv-analytics/" },
        { title: "Refund Saver", href: "https://adapty.io/refund-saver/" },
        { title: "Integrations", href: "https://adapty.io/integrations/" },
    ],
    Cases: [
        { title: "Productivity app", href: "https://adapty.io/clients/productivity-app/" },
        { title: "Text on Pic", href: "https://adapty.io/clients/text-on-pic/" },
        { title: "Going Merry", href: "https://adapty.io/clients/going-merry/" },
        { title: "Shmoody", href: "https://adapty.io/clients/shmoody/" },
        { title: "Glam AI", href: "https://adapty.io/clients/glam-ai/" },
        { title: "View all case studies", href: "https://adapty.io/clients/" },
    ],
    Resources: [
        { title: "Blog", href: "https://adapty.io/blog/" },
        { title: "Podcasts", href: "https://adapty.io/podcasts/" },
        { title: "Community", href: "https://adapty.io/community/" },
        { title: "Webinars", href: "https://adapty.io/webinars/" },
        { title: "Paywall Newsletter", href: "https://adapty.io/paywall-newsletter/" },
        { title: "Ebooks", href: "https://adapty.io/ebooks/10k-100k-mrr/" },
    ],
    Docs: [
        { title: "Quick Start", href: "https://adapty.io/docs/quickstart/" },
        { title: "iOS SDK", href: "https://adapty.io/docs/ios-installation/" },
        { title: "Android SDK", href: "https://adapty.io/docs/android-installation/" },
        { title: "React Native", href: "https://adapty.io/docs/react-native-installation/" },
        { title: "Flutter", href: "https://adapty.io/docs/flutter-installation/" },
        { title: "All Documentation", href: "https://adapty.io/docs/" },
    ],
};

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
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 top-[80px] bg-white z-40 overflow-y-auto md:hidden"
                        >
                            <div className="px-6 py-6 flex flex-col">
                                {NAV_ITEMS.map(item => (
                                    <div key={item.label} className="border-b border-border-subtle last:border-b-0">
                                        {item.component ? (
                                            // Accordion item with submenu
                                            <div>
                                                <button
                                                    onClick={() => setExpandedMobileMenu(
                                                        expandedMobileMenu === item.label ? null : item.label
                                                    )}
                                                    className="w-full flex items-center justify-between py-4 text-xl font-semibold text-foreground"
                                                >
                                                    {item.label}
                                                    <ChevronDown
                                                        className={cn(
                                                            "w-5 h-5 transition-transform duration-200",
                                                            expandedMobileMenu === item.label && "rotate-180"
                                                        )}
                                                    />
                                                </button>
                                                <AnimatePresence>
                                                    {expandedMobileMenu === item.label && MOBILE_MENU_DATA[item.label] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pb-4 pl-4 flex flex-col gap-3">
                                                                {MOBILE_MENU_DATA[item.label].map(subItem => (
                                                                    <Link
                                                                        key={subItem.title}
                                                                        href={subItem.href}
                                                                        onClick={() => {
                                                                            setMobileMenuOpen(false);
                                                                            setExpandedMobileMenu(null);
                                                                        }}
                                                                        className="flex items-center gap-2 py-2 text-base text-foreground-secondary hover:text-brand transition-colors"
                                                                    >
                                                                        <ChevronRight className="w-4 h-4 opacity-50" />
                                                                        {subItem.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            // Direct link
                                            <Link
                                                href={item.href || "#"}
                                                target={item.external ? "_blank" : undefined}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setExpandedMobileMenu(null);
                                                }}
                                                className={cn(
                                                    "block py-4 text-xl font-semibold transition-colors",
                                                    item.highlight
                                                        ? "text-[#FF8A00] hover:text-[#FF8A00]/80"
                                                        : "text-foreground hover:text-brand"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                {/* Mobile CTA Buttons */}
                                <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border-subtle">
                                    <a
                                        href="https://app.adapty.io"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center py-3 text-base font-semibold text-brand border border-brand rounded-lg hover:bg-brand/5 transition-colors"
                                    >
                                        Sign up
                                    </a>
                                    <a
                                        href="https://adapty.io/schedule-demo/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center py-3 text-base font-semibold text-white bg-[#5900FF] rounded-lg hover:bg-[#4500C6] transition-colors"
                                    >
                                        Contact sales
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
