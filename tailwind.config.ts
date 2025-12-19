import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F4F5F6',
          muted: '#EEEFF1',
        },
        foreground: {
          DEFAULT: '#181818',
          secondary: '#75777C',
          muted: '#A1A1AA',
        },
        brand: {
          DEFAULT: '#6720FF',
          hover: '#5519CC',
          light: '#F5F3FF',
        },
        primary: {
          DEFAULT: '#6720FF',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FAFAFA',
          foreground: '#181818',
        },
        muted: {
          DEFAULT: '#EEEFF1',
          foreground: '#75777C',
        },
        accent: {
          DEFAULT: '#F4F5F6',
          foreground: '#181818',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E6E7EA',
          subtle: '#F0F0F0',
          focus: '#266DF0',
        },
        input: '#E6E7EA',
        ring: '#266DF0',
      },
      fontFamily: {
        sans: ['var(--font-gilroy)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        '4xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 6px rgba(28,40,64,0.06), 0 6px 20px -2px rgba(28,40,64,0.08)',
        'elevated': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2, 0, 0, 1)',
        'bounce': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.2, 0, 0, 1) forwards',
        'gradient-spin': 'gradient-spin 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-spin': {
          '0%': { '--gradient-angle': '0deg' },
          '100%': { '--gradient-angle': '360deg' },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
    addVariablesForColors,
  ],
};
export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
type TailwindPluginApi = {
  addBase: (base: Record<string, Record<string, string>>) => void;
  theme: (path: string) => unknown;
};

function addVariablesForColors({ addBase, theme }: TailwindPluginApi) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allColors = flattenColorPalette(theme("colors") as any);
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, String(val)])
  );

  addBase({
    ":root": newVars,
  });
}
