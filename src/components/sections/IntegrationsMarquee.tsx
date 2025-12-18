import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';

const INTEGRATIONS = [
    'amplitude', 'mixpanel', 'appsflyer', 'adjust',
    'branch', 'braze', 'facebook', 'firebase-ga',
    'pushwoosh', 'onesignal', 'airbridge', 'singular',
    'splitmetrics', 'webhook', 'appmetrica', 'posthog',
    'stripe', 'tenjin', 'apple-ads'
];

export const IntegrationsMarquee = () => {
    return (
        <Section className="py-16 overflow-hidden bg-bg-primary">
            <div className="text-center mb-10">
                <p className="text-text-secondary text-sm uppercase tracking-wider font-medium">Integrations</p>
                <h2 className="text-2xl md:text-3xl font-semibold mt-2">Works with your favorite tools</h2>
            </div>

            <div className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex animate-marquee gap-8 md:gap-12 py-4">
                    {INTEGRATIONS.map((name) => (
                        <div
                            key={name}
                            className="relative w-[120px] md:w-[160px] h-[40px] md:h-[48px] shrink-0 opacity-70 hover:opacity-100 transition-all duration-300"
                        >
                            <Image
                                src={`/integrations/${name}.svg`}
                                alt={name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {INTEGRATIONS.map((name) => (
                        <div
                            key={`${name}-duplicate`}
                            className="relative w-[120px] md:w-[160px] h-[40px] md:h-[48px] shrink-0 opacity-70 hover:opacity-100 transition-all duration-300"
                        >
                            <Image
                                src={`/integrations/${name}.svg`}
                                alt={name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
