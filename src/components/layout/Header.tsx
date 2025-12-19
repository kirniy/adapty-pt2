"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/CustomButton";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProductMenu } from "./menus/ProductMenu";
import { CasesMenu } from "./menus/CasesMenu";
import { ResourcesMenu } from "./menus/ResourcesMenu";
import { DocsMenu } from "./menus/DocsMenu";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

// Mobile menu data mirrors mega menu content for full coverage on small screens.
type MobileMenuItem = {
    title: string;
    href: string;
    badge?: string;
};

type MobileMenuSection = {
    title: string;
    items: MobileMenuItem[];
};

type MobileMenuConfig = {
    topLinks?: MobileMenuItem[];
    sections?: MobileMenuSection[];
};

const MOBILE_MENU_DATA: Record<string, MobileMenuConfig> = {
    Product: {
        topLinks: [
            { title: "Product", href: "https://adapty.io/product/" },
            { title: "Solution", href: "https://adapty.io/solutions/" },
            { title: "Adapty SDK", href: "https://adapty.io/docs/sdk/" },
            { title: "Integrations", href: "https://adapty.io/integrations/" },
            { title: "Why Adapty?", href: "https://adapty.io/why-adapty/" },
            { title: "Product changelog", href: "https://adapty.io/changelog/" },
            { title: "System status", href: "https://status.adapty.io/" },
        ],
        sections: [
            {
                title: "TECH",
                items: [
                    { title: "Subscriptions SDK", href: "https://adapty.io/sdk/" },
                    { title: "Subscribers sync", href: "https://adapty.io/subscription-sync/" },
                    { title: "Fallback paywalls", href: "https://adapty.io/fallback-paywalls/" },
                    { title: "Refund saver", href: "https://adapty.io/refund-saver/" },
                ],
            },
            {
                title: "PAYWALLS",
                items: [
                    { title: "Paywall builder", href: "https://adapty.io/paywall-builder/" },
                    { title: "Onboarding builder", href: "https://adapty.io/onboarding-builder/" },
                    { title: "AI generator", href: "https://adapty.io/ai-paywall-generator/" },
                    { title: "A/B testing", href: "https://adapty.io/paywall-ab-testing/" },
                    { title: "Autopilot", href: "https://adapty.io/autopilot/", badge: "new" },
                    { title: "Targeting", href: "https://adapty.io/paywall-targeting/" },
                    { title: "Localizations", href: "https://adapty.io/paywall-localization/" },
                    { title: "Remote config", href: "https://adapty.io/remote-config/" },
                ],
            },
            {
                title: "ANALYTICS",
                items: [
                    { title: "Revenue analytics", href: "https://adapty.io/revenue-analytics/" },
                    { title: "LTV analytics", href: "https://adapty.io/ltv-analytics/" },
                    { title: "AI LTV and revenue predictions", href: "https://adapty.io/predictive-analytics/" },
                    { title: "LTV prediction model", href: "https://adapty.io/ltv-prediction-model/" },
                    { title: "Apple ads manager", href: "https://adapty.io/apple-ads-manager/" },
                ],
            },
        ],
    },
    Cases: {
        sections: [
            {
                title: "CASE STUDIES",
                items: [
                    { title: "Productivity app", href: "https://adapty.io/clients/productivity-app/" },
                    { title: "Text on Pic", href: "https://adapty.io/clients/text-on-pic/" },
                    { title: "Trip planning", href: "https://adapty.io/clients/trip-planning/" },
                    { title: "Going Merry", href: "https://adapty.io/clients/going-merry/" },
                    { title: "Shmoody", href: "https://adapty.io/clients/shmoody/" },
                    { title: "Lively", href: "https://adapty.io/clients/lively/" },
                    { title: "Glam AI", href: "https://adapty.io/clients/glam-ai/" },
                    { title: "Pepapp", href: "https://adapty.io/clients/pepapp/" },
                    { title: "Fotorama", href: "https://adapty.io/clients/fotorama/" },
                    { title: "Wave", href: "https://adapty.io/clients/wave/" },
                    { title: "Impala", href: "https://adapty.io/clients/impala-studios/" },
                    { title: "View all case studies", href: "https://adapty.io/clients/" },
                ],
            },
        ],
    },
    Resources: {
        sections: [
            {
                title: "LEARN",
                items: [
                    { title: "Blog", href: "https://adapty.io/blog/" },
                    { title: "Podcasts", href: "https://adapty.io/podcasts/" },
                    { title: "Glossary", href: "https://adapty.io/glossary/" },
                ],
            },
            {
                title: "CONNECT",
                items: [
                    { title: "Community", href: "https://adapty.io/community/" },
                    { title: "Webinars", href: "https://adapty.io/webinars/" },
                    { title: "Events", href: "https://adapty.io/events/" },
                    { title: "Careers", href: "https://adapty.io/careers/" },
                ],
            },
            {
                title: "DISCOVER",
                items: [
                    { title: "Paywall newsletter", href: "https://adapty.io/paywall-newsletter/" },
                    { title: "Apple receipt validation", href: "https://adapty.io/apple-receipt-validation/" },
                    { title: "Apple fiscal calendar", href: "https://adapty.io/apple-fiscal-calendar/" },
                    { title: "Apple ads manager", href: "https://adapty.io/apple-ads-manager/" },
                    { title: "LTV prediction model", href: "https://adapty.io/ltv-prediction-model/" },
                    { title: "Subscription calculator", href: "https://adapty.io/subscription-calculator/" },
                    { title: "Refund calculator", href: "https://adapty.io/refund-calculator/" },
                    { title: "Paywall library", href: "https://adapty.io/paywall-library/" },
                    { title: "Comparing alternatives", href: "https://adapty.io/alternative-comparison/" },
                ],
            },
            {
                title: "EBOOKS",
                items: [
                    { title: "Grow your app from $10K to $100K MRR", href: "https://adapty.io/ebooks/10k-100k-mrr/" },
                    { title: "Turn your weekend app into a $1K/mo business", href: "https://adapty.io/ebooks/weekend-app-1k-mo/" },
                    { title: "Scale your app from $1K to $10K MRR", href: "https://adapty.io/ebooks/1k-10k-mrr/" },
                    { title: "A refund guide to saving your app revenue", href: "https://adapty.io/ebooks/refund-guide/" },
                ],
            },
            {
                title: "RESEARCH",
                items: [
                    { title: "Onboarding A/B test ideas checklist", href: "https://adapty.io/ebooks/onboarding-ab-test-ideas/", badge: "new" },
                    { title: "State of in-app subscriptions 2025", href: "https://adapty.io/ebooks/state-of-in-app-subscriptions-2024/" },
                    { title: "Adapty pricing index", href: "https://adapty.io/ebooks/pricing-index/" },
                ],
            },
        ],
    },
    Docs: {
        topLinks: [
            { title: "Quick start", href: "https://adapty.io/docs/quickstart/" },
            { title: "Migrate to Adapty", href: "https://adapty.io/docs/migration/" },
            { title: "Platform status page", href: "https://status.adapty.io/" },
            { title: "Support Center", href: "https://adapty.io/support/" },
            { title: "All docs", href: "https://adapty.io/docs/" },
        ],
        sections: [
            {
                title: "MOBILE SDK",
                items: [
                    { title: "iOS", href: "https://adapty.io/docs/ios-installation/" },
                    { title: "Android", href: "https://adapty.io/docs/android-installation/" },
                    { title: "React Native", href: "https://adapty.io/docs/react-native-installation/" },
                    { title: "Unity", href: "https://adapty.io/docs/unity-installation/" },
                    { title: "Flutter", href: "https://adapty.io/docs/flutter-installation/" },
                    { title: "FlutterFlow", href: "https://adapty.io/docs/flutterflow-installation/" },
                    { title: "Capacitor", href: "https://adapty.io/docs/capacitor-installation/" },
                    { title: "Kotlin Multiplatform", href: "https://adapty.io/docs/kmp-installation/" },
                ],
            },
            {
                title: "WEB PAYMENTS",
                items: [
                    { title: "Stripe", href: "https://adapty.io/docs/stripe/" },
                ],
            },
            {
                title: "WEB API",
                items: [
                    { title: "Server-side API", href: "https://adapty.io/docs/api/" },
                ],
            },
        ],
    },
};

// Main menu items for mobile (matching original Adapty structure)
const MOBILE_MAIN_MENU = [
    { label: "Company", hasSubmenu: false, href: "https://adapty.io/about/" },
    { label: "Product", hasSubmenu: true },
    { label: "Solution", hasSubmenu: false, href: "https://adapty.io/solutions/" },
    { label: "Resources", hasSubmenu: true },
    { label: "Integrations", hasSubmenu: false, href: "https://adapty.io/integrations/" },
    { label: "Subscriptions SDK", hasSubmenu: false, href: "https://adapty.io/sdk/" },
    { label: "Case Studies", hasSubmenu: true, dataKey: "Cases" },
    { label: "Docs", hasSubmenu: true },
    { label: "Pricing", hasSubmenu: false, href: "https://adapty.io/pricing/" },
    { label: "Blog", hasSubmenu: false, href: "/blog" },
    { label: "web2app", hasSubmenu: false, href: "https://funnelfox.com/", highlight: true },
];

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
    const [portalReady, setPortalReady] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const bodyScrollYRef = useRef(0);
    const didLockScrollRef = useRef(false);
    const pathname = usePathname();

    useEffect(() => {
        setPortalReady(true);
        const ua = navigator.userAgent;
        const isiOSDevice = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        setIsIOS(isiOSDevice);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const resetBodyStyles = () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
        };

        if (!mobileMenuOpen) {
            if (didLockScrollRef.current && isIOS) {
                resetBodyStyles();
                window.scrollTo(0, bodyScrollYRef.current);
            } else {
                resetBodyStyles();
            }
            didLockScrollRef.current = false;
            return;
        }

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth ? `${scrollBarWidth}px` : "";

        if (isIOS) {
            bodyScrollYRef.current = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${bodyScrollYRef.current}px`;
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "hidden";
        }

        didLockScrollRef.current = true;

        return () => {
            resetBodyStyles();
            if (isIOS) {
                window.scrollTo(0, bodyScrollYRef.current);
            }
            didLockScrollRef.current = false;
        };
    }, [mobileMenuOpen, isIOS]);

    useEffect(() => {
        setMobileMenuOpen(false);
        setExpandedMobileMenu(null);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth h-[80px] flex items-center",
                (isScrolled || hoveredNav) && !mobileMenuOpen
                    ? "bg-white/95 md:backdrop-blur-md border-b border-border-subtle"
                    : "bg-transparent",
                mobileMenuOpen && "bg-transparent"
            )}
            onMouseLeave={() => setHoveredNav(null)}
        >
            <Container className="flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="relative z-50 group block w-[110px] h-6">
                            <Image
                                src="/logos/adapty-logo-black.svg"
                                alt="Adapty"
                                width={110}
                                height={24}
                                className="h-6 w-auto absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                                priority
                            />
                            <Image
                                src="/logos/adapty-logo-color.svg"
                                alt="Adapty"
                                width={110}
                                height={24}
                                className="h-6 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                priority
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
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {portalReady && createPortal(
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <>
                                {/* Backdrop overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 bg-black/20 z-[60] md:hidden"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setExpandedMobileMenu(null);
                                    }}
                                />
                                {/* Slide-in panel */}
                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    id="mobile-menu"
                                    className="mobile-menu-panel fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[70] flex flex-col md:hidden shadow-2xl"
                                >
                                    {/* Header with close button */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
                                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                            <Image
                                                src="/logos/adapty-logo-black.svg"
                                                alt="Adapty"
                                                width={90}
                                                height={20}
                                                className="h-5 w-auto"
                                                style={{ width: "auto" }}
                                            />
                                        </Link>
                                        <div className="flex items-center gap-3">
                                            <LanguageSwitcher />
                                            <button
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setExpandedMobileMenu(null);
                                                }}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                aria-label="Close menu"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Menu content - scrollable */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4" style={{ WebkitOverflowScrolling: "touch" }}>
                                        {!expandedMobileMenu ? (
                                            // Main menu view
                                            <div>
                                                {MOBILE_MAIN_MENU.map((item) => (
                                                    item.hasSubmenu ? (
                                                        <button
                                                            key={item.label}
                                                            onClick={() => setExpandedMobileMenu(item.dataKey || item.label)}
                                                            className="w-full flex items-center justify-between py-4 text-[17px] font-semibold text-foreground border-b border-border-subtle/50 last:border-b-0"
                                                        >
                                                            {item.label}
                                                            <ChevronRight className="w-5 h-5 text-foreground-muted" />
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href || "#"}
                                                            target={item.href?.startsWith("http") ? "_blank" : undefined}
                                                            rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className={cn(
                                                                "block py-4 text-[17px] font-semibold border-b border-border-subtle/50 last:border-b-0",
                                                                item.highlight
                                                                    ? "text-[#FF8A00]"
                                                                    : "text-foreground"
                                                            )}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        ) : (
                                            // Submenu view
                                            <div>
                                                {/* Back button and title */}
                                                <button
                                                    onClick={() => setExpandedMobileMenu(null)}
                                                    className="flex items-center gap-2 text-brand font-semibold mb-4 pb-4 border-b border-border-subtle w-full"
                                                >
                                                    <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                    {expandedMobileMenu}
                                                </button>

                                                {/* Top links (if any) */}
                                                {MOBILE_MENU_DATA[expandedMobileMenu]?.topLinks && (
                                                    <div className="mb-6">
                                                        {MOBILE_MENU_DATA[expandedMobileMenu].topLinks!.map((link) => (
                                                            <Link
                                                                key={link.title}
                                                                href={link.href}
                                                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                                onClick={() => {
                                                                    setMobileMenuOpen(false);
                                                                    setExpandedMobileMenu(null);
                                                                }}
                                                                className="block py-2.5 text-[15px] font-semibold text-foreground hover:text-brand transition-colors"
                                                            >
                                                                <span className="flex items-center gap-2">
                                                                    {link.title}
                                                                    {link.badge && (
                                                                        <span className="bg-[#EBE5FF] text-[#6720FF] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-[4px] leading-none">
                                                                            {link.badge}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Sections */}
                                                {MOBILE_MENU_DATA[expandedMobileMenu]?.sections?.map((section) => (
                                                    <div key={section.title} className="mb-6">
                                                        <h3 className="text-xs font-semibold text-foreground-muted tracking-wider mb-3">
                                                            {section.title}
                                                        </h3>
                                                        {section.items.map((item) => (
                                                            <Link
                                                                key={item.title}
                                                                href={item.href}
                                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                                onClick={() => {
                                                                    setMobileMenuOpen(false);
                                                                    setExpandedMobileMenu(null);
                                                                }}
                                                                className="block py-2.5 text-[15px] text-foreground hover:text-brand transition-colors"
                                                            >
                                                                <span className="flex items-center gap-2">
                                                                    {item.title}
                                                                    {item.badge && (
                                                                        <span className="bg-[#EBE5FF] text-[#6720FF] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-[4px] leading-none">
                                                                            {item.badge}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Fixed CTA buttons at bottom */}
                                    <div className="px-6 py-4 border-t border-border-subtle bg-white flex gap-3">
                                        <a
                                            href="https://app.adapty.io"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-3 text-sm font-semibold text-brand border border-brand rounded-lg hover:bg-brand/5 transition-colors"
                                        >
                                            Sign up
                                        </a>
                                        <a
                                            href="https://adapty.io/schedule-demo/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-3 text-sm font-semibold text-white bg-[#5900FF] rounded-lg hover:bg-[#4500C6] transition-colors"
                                        >
                                            Contact sales
                                        </a>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
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
