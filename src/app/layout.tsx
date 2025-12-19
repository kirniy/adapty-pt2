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
  title: "Adapty - Grow Your In-App Subscription Revenue",
  description: "The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code.",
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
