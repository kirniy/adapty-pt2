import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import React from "react";
import { Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/CustomButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const Enterprise = () => {
    return (
        <Section className="py-24 bg-white text-foreground overflow-hidden relative">
            {/* Ambient Background Glow - Subtle & Light */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 text-brand font-medium bg-brand/5 px-4 py-1.5 rounded-full text-sm border border-brand/10">
                            <Shield className="w-4 h-4" />
                            <span>Enterprise Grade</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-foreground">
                            Secure, reliable, <br /> and compliant
                        </h2>
                        <p className="text-xl text-foreground-secondary mb-12 leading-relaxed max-w-lg">
                            Adapty is built for scale. We process billions of requests with 99.9% uptime SLA, SOC2 compliance, and enterprise-grade security.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="h-12 px-8 text-base">Contact Sales</Button>
                            <Button variant="outline" className="h-12 px-8 text-base bg-white hover:bg-gray-50">View Security Docs</Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <SpotlightCard className="bg-white border-border-subtle p-8 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(103, 32, 255, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/10">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">SOC 2 Type II Certified</h3>
                                    <p className="text-foreground-secondary leading-relaxed text-[15px]">Regularly audited security controls and processes to ensure your data is safe.</p>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="bg-white border-border-subtle p-8 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(38, 109, 240, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/10">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">GDPR & CCPA Compliant</h3>
                                    <p className="text-foreground-secondary leading-relaxed text-[15px]">Full tools for data privacy management, user deletion, and consent tracking.</p>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="bg-white border-border-subtle p-8 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(168, 85, 247, 0.05)">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0 border border-purple-500/10">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">99.9% Uptime SLA</h3>
                                    <p className="text-foreground-secondary leading-relaxed text-[15px]">Enterprise infrastructure designed for high availability and low latency globally.</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
