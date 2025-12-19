import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { ShineBeam } from '@/components/ui/ShineBeam';

interface SDKItem {
    name: string;
    icon: string;
    href: string;
}

const SDKS: SDKItem[] = [
    { name: 'Swift', icon: '/sdks/swift.svg', href: '#' },
    { name: 'Kotlin', icon: '/sdks/kotlin.svg', href: '#' },
    { name: 'React Native', icon: '/sdks/react-native.svg', href: '#' },
    { name: 'Flutter', icon: '/sdks/flutter.svg', href: '#' },
    { name: 'Unity', icon: '/sdks/unity.svg', href: '#' },
    { name: 'Capacitor', icon: '/sdks/capacitor.svg', href: '#' },
    { name: 'KMP', icon: '/sdks/kmp.svg', href: '#' },
    { name: 'FlutterFlow', icon: '/sdks/flutterflow.svg', href: '#' },
    { name: 'Web API', icon: '/sdks/web-api.svg', href: '#' },
    { name: 'Stripe', icon: '/sdks/stripe.svg', href: '#' },
];

export const SDKGrid = () => {
    return (
        <Section className="bg-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold tracking-tight mb-6">
                        Get the SDK for your platform
                    </h2>
                    <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
                        Hard to pronounce, easy to use. Open-source, lightweight, and native SDKs for every major platform.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {SDKS.map((sdk) => (
                        <div
                            key={sdk.name}
                            className={cn(
                                "group flex flex-col items-center justify-center p-8",
                                "bg-background-secondary rounded-2xl border border-transparent",
                                "hover:bg-white hover:border-border-subtle hover:shadow-card",
                                "transition-all duration-300 ease-smooth cursor-pointer relative overflow-hidden"
                            )}
                        >
                            {/* Beam Effect */}
                            <ShineBeam size={300} duration={3} color="#6720FF" className="opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="relative w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src={sdk.icon}
                                        alt={sdk.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-semibold text-foreground text-lg">
                                    {sdk.name}
                                </span>
                            </div>
                    ))}
                        </div>
            </Container>
        </Section>
    );
};
