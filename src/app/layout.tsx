import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorTracker } from "@/components/ui/CursorTracker";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adapty-pt2.vercel.app"),
  title: {
    default: "Adapty – In-App Subscription Infrastructure",
    template: "%s | Adapty",
  },
  description: "The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code. Trusted by 15,000+ apps worldwide.",
  keywords: ["in-app subscriptions", "paywall", "A/B testing", "mobile monetization", "subscription analytics", "iOS subscriptions", "Android subscriptions", "RevenueCat alternative"],
  authors: [{ name: "Adapty" }],
  creator: "Adapty Tech Inc.",
  publisher: "Adapty Tech Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adapty-pt2.vercel.app",
    siteName: "Adapty",
    title: "Adapty – In-App Subscription Infrastructure",
    description: "The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adapty – In-App Subscription Infrastructure",
    description: "The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code.",
    creator: "@adapaborisov",
  },
  alternates: {
    canonical: "https://adapty-pt2.vercel.app",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gilroy.variable} font-sans antialiased text-foreground bg-background flex flex-col min-h-screen`}>
        <CursorTracker />
        <Header />
        <main className="flex-grow pt-[116px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
