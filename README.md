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
- Real multi-page navigation (Home, Thesis, Entities, Contact, Privacy, Terms)
- Animated 3D background with Three.js (subtle particles, mouse interactivity)
- Framer Motion page transitions and scroll reveal animations
- Advanced button animations (glow, shine, ripple, loading particles)
- Optimized fonts with next/font
- Accessibility-focused
- Performance-optimized
- Mobile-first approach

## Getting Started

1. Install dependencies:
```bash
npm install
```
2. Run the development server:
```bash
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
./app/
  layout.tsx           # Root layout, fonts, page transitions and 3D background
  page.tsx             # Home page
  globals.css          # Global styles and Tailwind imports
  thesis/page.tsx      # Thesis page
  entities/page.tsx    # Entities page
  contact/page.tsx     # Contact page with strategic inquiry form
  privacy/page.tsx     # Privacy Policy
  terms/page.tsx       # Terms & Conditions

./components/
  Header.tsx           # Navigation header
  Footer.tsx           # Footer with legal links
  Hero.tsx             # Main hero section
  Entities.tsx         # Home entities section
  Thesis.tsx           # Home thesis section
  Contact.tsx          # Home contact section
  AnimatedButton.tsx   # Advanced animated button component
  Background3D.tsx     # Three.js background particles
  ClientLayout.tsx     # Framer Motion page transitions
  Reveal.tsx           # Scroll reveal wrapper
  TypingHeading.tsx    # Typing effect heading
  QuickNavButtons.tsx  # Quick navigation button group

package.json
tsconfig.json
tailwind.config.ts
postcss.config.js
```
## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```
## Brand Identity

- **Company**: SYNARCH
- **Philosophy**: Silent Power
- **Slogan**: Architects of Inevitability
- **Operating Entities**: NOEMA (R&D) and FULCRUM (Investment Platform)
- **Contact**: contact@synarch.global

## License

Private - All rights reserved.
