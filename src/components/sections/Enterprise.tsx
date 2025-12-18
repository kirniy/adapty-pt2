import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import React from "react";
import { Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Enterprise = () => {
    return (
        <Section className="py-24 bg-foreground text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-6 text-white/80 font-semibold bg-white/10 px-3 py-1 rounded-full text-sm border border-white/10">
                            <Shield className="w-4 h-4" />
                            <span>Enterprise Grade</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Secure, reliable, and <br /> compliant
                        </h2>
                        <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
                            Adapty is built for scale. We process billions of requests with 99.9% uptime SLA, SOC2 compliance, and enterprise-grade security.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-white text-foreground hover:bg-white/90 border-0">Contact Sales</Button>
                            <Button variant="secondary" className="bg-transparent text-white border-white/20 hover:bg-white/10">View Security Docs</Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-smooth">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">SOC 2 Type II Certified</h3>
                                    <p className="text-white/60 leading-relaxed">Regularly audited security controls and processes to ensure your data is safe.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-smooth">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">GDPR & CCPA Compliant</h3>
                                    <p className="text-white/60 leading-relaxed">Full tools for data privacy management, user deletion, and consent tracking.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-smooth">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">99.9% Uptime SLA</h3>
                                    <p className="text-white/60 leading-relaxed">Enterprise infrastructure designed for high availability and low latency globally.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
