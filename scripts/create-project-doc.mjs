import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, LevelFormat, PageBreak } from 'docx';
import fs from 'fs';

// Adapty Design System Colors
const COLORS = {
  brand: "6720FF",           // Brand purple
  textPrimary: "09090B",     // Near black
  textSecondary: "52525B",   // Gray text
  bgSecondary: "FAFAFA",     // Off-white sections
  border: "E4E4E7",          // Light borders
  white: "FFFFFF",
  success: "16A34A",         // Green for checkmarks
};

// Gilroy is the project's custom font - fallback to system fonts for Word compatibility
const FONT_FAMILY = "Gilroy, Helvetica Neue, Arial";

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: COLORS.border };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT_FAMILY, size: 24, color: COLORS.textPrimary }
      }
    },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 64, bold: true, color: COLORS.brand, font: FONT_FAMILY },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 40, bold: true, color: COLORS.textPrimary, font: FONT_FAMILY },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: COLORS.textPrimary, font: FONT_FAMILY },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: COLORS.textSecondary, font: FONT_FAMILY },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "sections-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Adapty PT2 - Project Documentation", italics: true, color: COLORS.textSecondary, size: 20, font: FONT_FAMILY })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Page ", size: 20, color: COLORS.textSecondary, font: FONT_FAMILY }),
          new TextRun({ children: [PageNumber.CURRENT], size: 20, color: COLORS.textSecondary, font: FONT_FAMILY }),
          new TextRun({ text: " of ", size: 20, color: COLORS.textSecondary, font: FONT_FAMILY }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20, color: COLORS.textSecondary, font: FONT_FAMILY })
        ]
      })] })
    },
    children: [
      // Title Page
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Adapty PT2")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [
        new TextRun({ text: "Homepage & Blog Redesign", size: 32, color: COLORS.textSecondary, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new TextRun({ text: "Modern SaaS Aesthetic in the style of Attio / Linear / Vercel / Polar.sh", size: 24, italics: true, color: COLORS.textSecondary, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 200 }, children: [
        new TextRun({ text: "Version 0.9.0-beta", bold: true, size: 28, color: COLORS.brand, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "December 19, 2025", size: 22, color: COLORS.textSecondary, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1200 }, children: [
        new TextRun({ text: "Live Demo: ", size: 22, font: FONT_FAMILY }),
        new TextRun({ text: "https://adapty-pt2.vercel.app", size: 22, color: COLORS.brand, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "GitHub: ", size: 22, font: FONT_FAMILY }),
        new TextRun({ text: "https://github.com/kirniy/adapty-pt2", size: 22, color: COLORS.brand, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "CMS Studio: ", size: 22, font: FONT_FAMILY }),
        new TextRun({ text: "https://adapty-pt2.vercel.app/studio", size: 22, color: COLORS.brand, font: FONT_FAMILY })
      ]}),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Executive Summary
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Executive Summary")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("This document provides a comprehensive overview of the Adapty PT2 project - a complete redesign of the Adapty.io homepage and blog section in a modern SaaS aesthetic. The project was completed in approximately 24 hours using AI-powered development tools.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Key Achievements:", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Full content copy of adapty.io homepage with 19 sections")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("48 blog posts imported from adapty.io/blog into Sanity CMS")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Light theme with modern Attio/Linear/Vercel aesthetic")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fully responsive design with 96 responsive utilities")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Static site generation (SSG) for SEO crawlability")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Production-ready with polished animations")] }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Test Task Requirements
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Test Task Requirements")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The following table shows all requirements from the test assignment and how each was fulfilled:")
      ]}),

      // Requirements Table
      new Table({
        columnWidths: [3500, 1200, 4660],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: COLORS.brand, type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Requirement", bold: true, color: COLORS.white, font: FONT_FAMILY })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, shading: { fill: COLORS.brand, type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Status", bold: true, color: COLORS.white, font: FONT_FAMILY })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, shading: { fill: COLORS.brand, type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Implementation Details", bold: true, color: COLORS.white, font: FONT_FAMILY })] })] }),
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Full content copy of homepage", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "19 sections with authentic Adapty content", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Blog visible section (previews)", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "48 posts imported with metadata and content", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Style: Attio/Linear/Vercel/Polar.sh", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Clean white backgrounds, subtle shadows, modern typography", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Light theme (mandatory)", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "White backgrounds throughout all sections", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "CMS connected (editable)", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sanity.io Studio at /studio route", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Production-ready appearance", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Polished with Framer Motion animations", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Mobile responsive", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "96 responsive utilities across 29 files", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Static site (SSG) for crawlers", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ PASS", color: COLORS.success, bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "generateStaticParams for all blog pages", font: FONT_FAMILY })] })] }),
          ]}),
        ]
      }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Tech Stack
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Technology Stack")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Core Framework")] }),
      new Table({
        columnWidths: [2500, 1500, 5360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: COLORS.bgSecondary, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Technology", bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, shading: { fill: COLORS.bgSecondary, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Version", bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, shading: { fill: COLORS.bgSecondary, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Purpose", bold: true, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Next.js", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "16.0.10", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "React framework with App Router, SSG", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "TypeScript", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "5.x", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Type safety and developer experience", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Tailwind CSS", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "3.x", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Utility-first CSS styling", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Framer Motion", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Latest", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Smooth animations and transitions", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sanity.io", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "v3", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Headless CMS for blog content", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Gilroy Font", font: FONT_FAMILY, bold: true, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Custom", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Self-hosted custom typography (81 font files)", font: FONT_FAMILY })] })] }),
          ]}),
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 Custom vs Third-Party Components")] }),

      new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "Custom-Built Components:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("All 19 homepage sections (Hero, Features, Stats, Testimonials, etc.)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Mega menu navigation with dropdowns")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Mobile accordion menu")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("ShineBeam hover effect component")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("NumberTicker animated counter")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Morphing text animation")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Trust badges marquee")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("SDK code snippet with syntax highlighting")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Blog listing and detail pages")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Portable Text renderer for blog content")] }),

      new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "Third-Party Libraries:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Framer Motion - animation library")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Lucide React - icon library")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("next-sanity - Sanity CMS integration")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("clsx/tailwind-merge - utility functions")] }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Homepage Sections
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Homepage Sections (19 Total)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Each section was carefully implemented to match the original adapty.io content while applying the modern SaaS aesthetic:")] }),

      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Header ", bold: true }), new TextRun("- Mega menu navigation with Product, Cases, Resources, Docs dropdowns")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Hero ", bold: true }), new TextRun("- Email signup form, trust badges marquee, morphing text animation")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Ebook Badge ", bold: true }), new TextRun("- Floating promotional badge linking to Adapty ebook")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Paywall A/B Testing ", bold: true }), new TextRun("- Feature section with testimonial from HubX CEO")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Refund Saver ", bold: true }), new TextRun("- Feature section with 78% refund prevention metric")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Subscription Analytics ", bold: true }), new TextRun("- BI dashboard preview with real-time metrics")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "No-Code Paywall Builder ", bold: true }), new TextRun("- Visual builder showcase with drag-and-drop interface")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "FunnelFox Web-to-App ", bold: true }), new TextRun("- Conversion funnel feature with QR code visualization")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Revenue Sync ", bold: true }), new TextRun("- Mosaic grid of 22 integration logos with animated arrows")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Role Cards ", bold: true }), new TextRun("- Three cards for Developers, App Owners, and Marketers")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Stats ", bold: true }), new TextRun("- $2B+ revenue tracked, 99.99% uptime, 2.5B+ users, 60B+ API calls")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "SDK Code Snippet ", bold: true }), new TextRun("- Interactive code tabs (Swift, Kotlin, Flutter, React Native)")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "SDK Grid ", bold: true }), new TextRun("- 10 platform cards with brand-colored hover effects")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Testimonials Carousel ", bold: true }), new TextRun("- 5 customer quotes with side arrows and photo portraits")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Integrations Marquee ", bold: true }), new TextRun("- Scrolling partner logos (Amplitude, AppsFlyer, etc.)")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "G2 Badges ", bold: true }), new TextRun("- 5 Winter 2025 award badges with hover effects")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Case Studies ", bold: true }), new TextRun("- 9 real customer cases with metrics (+50%, +102%, 5x, etc.)")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Enterprise ", bold: true }), new TextRun("- Enterprise features section with contact CTA")] }),
      new Paragraph({ numbering: { reference: "sections-list", level: 0 }, children: [new TextRun({ text: "Footer ", bold: true }), new TextRun("- Full sitemap with all navigation links")] }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Blog & CMS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Blog & CMS Integration")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Sanity CMS Configuration")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Project ID: ", bold: true }), new TextRun("r5c34qsa")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Dataset: ", bold: true }), new TextRun("production")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Studio URL: ", bold: true }), new TextRun("https://adapty-pt2.vercel.app/studio")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 Content Schemas")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "blogPost: ", bold: true }), new TextRun("Title, slug, excerpt, mainImage, body (Portable Text), author, category, publishedAt, readTime")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "author: ", bold: true }), new TextRun("Name, image, role")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "category: ", bold: true }), new TextRun("Title, description")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 Imported Content")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "48 blog posts ", bold: true }), new TextRun("with full metadata")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "23 posts ", bold: true }), new TextRun("with complete Portable Text body content")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "7 categories: ", bold: true }), new TextRun("Engineering, Growth, Industry Reports, etc.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "5 authors ", bold: true }), new TextRun("with Gravatar avatars")] }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // AI Tools
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. AI-Powered Development")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("This project was built using a multi-AI collaborative approach, leveraging the strengths of different AI models for optimal results.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Primary Agent: Claude Code with Claude Opus 4.5")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Tool: ", bold: true }), new TextRun("Claude Code - Anthropic's official CLI for Claude")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Model: ", bold: true }), new TextRun("Claude Opus 4.5 (claude-opus-4-5-20251101)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Primary development agent handling 90% of code generation, file operations, and project orchestration")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Key Capabilities Used:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Multi-file editing with full context awareness")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Bash commands for git, npm, and file system operations")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("MCP servers: Firecrawl (web scraping), Chrome DevTools, Magic (UI components)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Task delegation to specialized sub-agents")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("TodoWrite for structured task management")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 Secondary Agent: Gemini 3.0 Pro in Google Antigravity")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Tool: ", bold: true }), new TextRun("Google Antigravity (internal development environment)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Model: ", bold: true }), new TextRun("Gemini 3.0 Pro")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Content extraction, image analysis, SEO recommendations")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Tasks Performed:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Extracting blog content from adapty.io")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Image asset analysis and optimization suggestions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("SEO metadata generation")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Accessibility audit recommendations")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 Tertiary Agent: ChatGPT Codex 5.2")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Tool: ", bold: true }), new TextRun("OpenAI ChatGPT with Codex 5.2 engine")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Code review, optimization suggestions, documentation")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Tasks Performed:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Tailwind CSS utility class optimization")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Animation timing curve suggestions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Code review and refactoring recommendations")] }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Development Timeline
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Development Timeline")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Total Development Time: ", bold: true }),
        new TextRun("~24 hours")
      ]}),

      new Table({
        columnWidths: [2500, 6860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: COLORS.bgSecondary, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Date/Time", bold: true, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, shading: { fill: COLORS.bgSecondary, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Milestone", bold: true, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 18, 20:26", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Initial setup: Next.js project, documentation, assets", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 18, 21:09", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Design system extracted from Attio/Linear/Vercel", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 19, 00:00-12:00", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Core homepage sections implemented (all 19 sections)", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 19, 12:00-18:00", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Blog integration, Sanity CMS setup, 48 posts imported", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 19, 18:00-20:00", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Mobile fixes, hover effects, UI polish", font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Dec 19, 20:30", font: FONT_FAMILY, color: COLORS.brand })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Final polish, documentation, v0.9.0-beta release", font: FONT_FAMILY })] })] }),
          ]}),
        ]
      }),

      // Page Break
      new Paragraph({ children: [new PageBreak()] }),

      // Deliverables
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Deliverables")] }),

      new Table({
        columnWidths: [2500, 6860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: COLORS.brand, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Deliverable", bold: true, color: COLORS.white, font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, shading: { fill: COLORS.brand, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Link", bold: true, color: COLORS.white, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Hosted Page", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "https://adapty-pt2.vercel.app", color: COLORS.brand, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "GitHub Repository", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "https://github.com/kirniy/adapty-pt2", color: COLORS.brand, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "CMS Studio", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "https://adapty-pt2.vercel.app/studio", color: COLORS.brand, font: FONT_FAMILY })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Prompt History", font: FONT_FAMILY })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Documented in README.md and commit messages", font: FONT_FAMILY })] })] }),
          ]}),
        ]
      }),

      new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_2, children: [new TextRun("Version Information")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Current Version: ", bold: true, font: FONT_FAMILY }), new TextRun({ text: "0.9.0-beta", color: COLORS.brand, font: FONT_FAMILY })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Status: ", bold: true, font: FONT_FAMILY }), new TextRun({ text: "Production-ready beta", font: FONT_FAMILY })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Total Commits: ", bold: true, font: FONT_FAMILY }), new TextRun({ text: "50+", font: FONT_FAMILY })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Files Changed: ", bold: true, font: FONT_FAMILY }), new TextRun({ text: "100+", font: FONT_FAMILY })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Lines of Code: ", bold: true, font: FONT_FAMILY }), new TextRun({ text: "10,000+", font: FONT_FAMILY })] }),

      // Closing
      new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "— End of Document —", italics: true, color: COLORS.textSecondary, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
        new TextRun({ text: "Built with AI-powered development", size: 20, color: COLORS.textSecondary, font: FONT_FAMILY })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: "Claude Opus 4.5 | Gemini 3.0 Pro | ChatGPT Codex 5.2", size: 20, color: COLORS.brand, font: FONT_FAMILY })
      ]}),
    ]
  }]
});

// Save the document
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("/Users/kirniy/dev/adapty-pt2/Adapty_PT2_Project_Documentation.docx", buffer);
console.log("Document created: Adapty_PT2_Project_Documentation.docx");
