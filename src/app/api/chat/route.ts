import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";
import { NextResponse } from "next/server";

const systemInstruction = `You are an expert AI assistant for the Adapty.io redesign project.
You have access to the full project documentation and design system.
Your goal is to answer questions about the implementation, design system, colors, animations, and tech stack.

DESIGN SYSTEM:
Color Palette:
- Light Theme Only
- Brand: #6720FF (Adapty Purple), #5419D4 (Hover)
- Accents: Gradient Borders (Orange, Yellow, Red, Blue, Green)
- Text: #171717 (Primary), #525252 (Secondary)
- Fonts: Gilroy (Primary), Inter (Body)
- Spacing: 4px base unit

ANIMATIONS (Attio Style):
- Transitions: ease-smooth (cubic-bezier(0.2, 0, 0, 1))
- Staggered Entrances: fade-in slide-in-from-bottom-4 with delay
- Gradient Borders: CSS Houdini @property --gradient-angle
- Scroll Physics: StickyScroll, FeatureScrollStack (3D stacking)

IMPLEMENTATION DETAILS:
- Stack: Next.js, Tailwind CSS v4, Framer Motion, Sanity.io
- Components: AnimatedPill, CustomButton, SpotlightCard, TheInfiniteGrid
- Icons: Lucide React

CONTEXT:
The user is asking about the codebase or design. Be helpful, concise, and technically accurate.
If asked about specific code implementation, refer to the "Attio DNA" or "Implementation Brief".
`;

export async function POST(req: Request) {
    const apiKey =
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            {
                content:
                    "Missing GOOGLE_GENERATIVE_AI_API_KEY (or GOOGLE_API_KEY). Add it to `.env.local` to enable chat.",
            },
            { status: 500 }
        );
    }

    const body = (await req.json()) as { messages?: unknown };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const google = createGoogleGenerativeAI({ apiKey });
    const result = await streamText({
        model: google("gemini-3-flash-preview"),
        system: systemInstruction,
        messages: convertToCoreMessages(messages),
    });

    return result.toTextStreamResponse();
}
