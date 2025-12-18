import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';

const INTEGRATIONS = [
    'amplitude', 'mixpanel', 'slack', 'appsflyer', 'adjust',
    'branch', 'braze', 'facebook', 'firebase', 'segment',
    'pushwoosh', 'onesignal', 'airship', 'clevertap',
    'customerio', 'mparticle', 'singular', 'split',
    'tiktok', 'webhook', 'appmetrica', 'posthog'
];

export const IntegrationsMarquee = () => {
    return (
        <Section className="py-24 overflow-hidden bg-bg-secondary border-y border-border-subtle">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Sync data with your favorite tools</h2>
                <p className="text-text-secondary">Seamlessly integrate with the platforms you already use.</p>
            </div>

            <div className="relative w-full flex overflow-hidden mask-fade-sides">
                <div className="flex animate-marquee whitespace-nowrap gap-12 py-4">
                    {INTEGRATIONS.map((name) => (
                        <div key={name} className="relative w-[140px] h-[50px] shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
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
                        <div key={`${name}-duplicate`} className="relative w-[140px] h-[50px] shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
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
