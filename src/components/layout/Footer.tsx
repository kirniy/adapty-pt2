import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background-tertiary border-t border-border-default pt-20 pb-12">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    {/* Col 1 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Product</h4>
                        <ul className="flex flex-col gap-3 text-sm text-foreground-secondary">
                            <li><Link href="#" className="hover:text-brand transition-colors">Subscriptions SDK</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Paywall Builder</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">A/B Testing</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Analytics</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    {/* Col 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Solutions</h4>
                        <ul className="flex flex-col gap-3 text-sm text-foreground-secondary">
                            <li><Link href="#" className="hover:text-brand transition-colors">For Developers</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">For Marketers</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">For App Owners</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">For Startups</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">For Enterprise</Link></li>
                        </ul>
                    </div>
                    {/* Col 3 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Resources</h4>
                        <ul className="flex flex-col gap-3 text-sm text-foreground-secondary">
                            <li><Link href="#" className="hover:text-brand transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Help Center</Link></li>
                        </ul>
                    </div>
                    {/* Col 4 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Company</h4>
                        <ul className="flex flex-col gap-3 text-sm text-foreground-secondary">
                            <li><Link href="#" className="hover:text-brand transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Legal</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-brand transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-default gap-4">
                    <p className="text-sm text-foreground-muted">© 2025 Adapty. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        {['x', 'linkedin', 'github', 'youtube'].map((social) => (
                            <Link key={social} href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                                <Image
                                    src={`/icons/${social}.svg`}
                                    alt={social}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
