import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import React from "react";
import { Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/CustomButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TheInfiniteGrid } from "@/components/ui/TheInfiniteGrid";

export const Enterprise = () => {
    return (
        <Section className="py-24 bg-white text-foreground overflow-hidden relative">
            {/* Ambient Background Glow - Subtle & Light */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-[0.3]">
                <TheInfiniteGrid className="!static w-full h-full text-foreground/5" />
            </div>

            {/* Colorful Blur Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none opacity-60" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 text-brand font-medium bg-brand/5 px-4 py-1.5 rounded-full text-sm border border-brand/10">
                            <Shield className="w-4 h-4" />
                            <span>Enterprise Grade</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-foreground">
                            Enterprise-grade platform
                        </h2>
                        <p className="text-xl text-foreground-secondary mb-12 leading-relaxed max-w-lg">
                            Adapty is built for scale with secure infrastructure, reliable SLAs, and responsive support for high-growth teams.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="h-12 px-8 text-base">Contact Sales</Button>
                            <Button variant="outline" className="h-12 px-8 text-base bg-white hover:bg-gray-50">View Security Docs</Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <SpotlightCard className="bg-white/80 backdrop-blur-sm border-border-subtle p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" spotlightColor="rgba(103, 32, 255, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/10">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">Secure</h3>
                                    <ul className="space-y-2 text-foreground-secondary leading-relaxed text-[15px]">
                                        <li>SOC2 verified</li>
                                        <li>Encrypted</li>
                                        <li>24/7 global fraud monitoring</li>
                                    </ul>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="bg-white/80 backdrop-blur-sm border-border-subtle p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" spotlightColor="rgba(38, 109, 240, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/10">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">Reliable</h3>
                                    <ul className="space-y-2 text-foreground-secondary leading-relaxed text-[15px]">
                                        <li>99.99% SLA</li>
                                        <li>Over $500M/year of in-app purchases processed</li>
                                    </ul>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="bg-white/80 backdrop-blur-sm border-border-subtle p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" spotlightColor="rgba(168, 85, 247, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0 border border-purple-500/10">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">Responsive</h3>
                                    <ul className="space-y-2 text-foreground-secondary leading-relaxed text-[15px]">
                                        <li>Dedicated customer success manager</li>
                                        <li>Direct communication via Slack</li>
                                        <li>Live chat on the website</li>
                                        <li>Four ways to reach us</li>
                                    </ul>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
