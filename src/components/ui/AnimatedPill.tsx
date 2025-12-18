import React from 'react';

interface AnimatedPillProps {
    children: React.ReactNode;
}

export function AnimatedPill({ children }: AnimatedPillProps) {
    return (
        <div className="animated-gradient-border inline-flex p-[1px] rounded-full">
            {/* The padding in parent + bg-white in child creates the border effect if we rely on the pseudo-element mask from globals.css. 
            However, the brief provided css uses a mask on the pseudo-element to show ONLY the border.
            Let's stick to the brief's assumption that the pseudo-element handles the visual border.
            The brief's css for .animated-gradient-border::before uses -webkit-mask-composite: xor to exclude the content box, 
            so the background only shows in the padding area?
            Wait, the brief's CSS sets padding: 2px on the pseudo-element? No, padding on pseudo-element doesn't affect box-sizing like that usually unless configured.
            Actually, the brief's CSS uses `mask-composite: exclude` with `content-box` and `linear-gradient` to create a border mask.
            So the `.animated-gradient-border` div just needs to be the container.
            The child needs to be transparent? No, "bg-white rounded-full" in the brief's JSX.
            Let's paste the brief's JSX exactly.
        */}
            <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium relative z-10">
                {children}
            </div>
        </div>
    );
}
