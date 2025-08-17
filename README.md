# SYNARCH Landing Page

A minimalist, brutalist web design for SYNARCH, a private deep-tech holding company. The design embodies the brand's philosophy of "Silent Power" and slogan "Architects of Inevitability."

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (body) and Playfair Display (headings) via Google Fonts

## Design Philosophy

- **Visual Style**: Minimalist Brutalism - structural, clean, and powerful
- **Color Palette**: Strictly monochromatic - deep charcoal (#111111) background with sharp white (#FFFFFF) text
- **Layout**: Single scrolling experience with heavy emphasis on negative space
- **Typography**: The design's power comes from typography, layout, and structure alone

## Features

- Fully responsive design
- Smooth scroll navigation
- Optimized fonts with next/font
- Accessibility-focused
- Performance-optimized
- Mobile-first approach

## Getting Started

1. Install dependencies:
   `ash
   npm install
   ``n
2. Run the development server:
   `ash
   npm run dev
   ``n
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

``n+-- app/
¦   +-- layout.tsx          # Root layout with fonts and metadata
¦   +-- page.tsx            # Main page component
¦   +-- globals.css         # Global styles and Tailwind imports
+-- components/
¦   +-- Header.tsx          # Navigation header
¦   +-- Hero.tsx            # Main hero section
¦   +-- Thesis.tsx          # Company thesis section
¦   +-- Entities.tsx        # Operating entities (NOEMA & FULCRUM)
¦   +-- Contact.tsx         # Contact information
¦   +-- Footer.tsx          # Footer with navigation
+-- package.json
+-- tsconfig.json
+-- tailwind.config.ts
+-- postcss.config.js
+-- next.config.js
``n
## Build and Deploy

`ash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
``n
## Brand Identity

- **Company**: SYNARCH
- **Philosophy**: Silent Power
- **Slogan**: Architects of Inevitability
- **Operating Entities**: NOEMA (R&D) and FULCRUM (Investment Platform)
- **Contact**: contact@synarch.global

## License

Private - All rights reserved.
