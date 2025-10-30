# Design Guidelines: AI Portfolio Website (Origin-Inspired)

## Design Approach
**Reference-Based Design** inspired by Origin template's modern tech aesthetic. Drawing from platforms like Linear, Vercel, and Stripe for clean, gradient-heavy, futuristic UI patterns with strong emphasis on visual hierarchy and smooth interactions.

## Core Design Principles
- **Tech-Forward Aesthetic**: Modern, gradient-rich design that communicates innovation
- **Visual Hierarchy**: Bold typography with clear content progression
- **Purposeful Animation**: Subtle, performance-focused micro-interactions
- **Trust & Professionalism**: Clean layouts with ample whitespace

---

## Color Palette

### Primary Colors
- **Primary Gradient**: 250 100% 60% → 280 90% 55% (blue to purple diagonal gradient)
- **Background Dark**: 240 15% 8% (deep navy-black)
- **Surface Dark**: 240 12% 12% (elevated cards/sections)

### Accent & UI Colors
- **Accent Purple**: 270 85% 65% (CTAs, highlights)
- **Accent Blue**: 220 95% 60% (links, interactive elements)
- **Success Green**: 145 65% 55% (stats, checkmarks)
- **Text Primary**: 0 0% 98% (headings, important text)
- **Text Secondary**: 240 5% 70% (body text, descriptions)
- **Border Subtle**: 240 10% 20% (card borders, dividers)

---

## Typography

### Font Families
- **Primary**: Inter (headings, UI elements)
- **Body**: Inter (paragraphs, descriptions)
- **Code/Stats**: JetBrains Mono (technical specs, numbers)

### Type Scale
- **Hero Headline**: text-6xl md:text-7xl lg:text-8xl, font-bold, leading-tight
- **Section Headers**: text-4xl md:text-5xl, font-bold, tracking-tight
- **Subsection Headers**: text-2xl md:text-3xl, font-semibold
- **Body Large**: text-lg md:text-xl, leading-relaxed
- **Body Regular**: text-base, leading-relaxed
- **Small/Meta**: text-sm, text-secondary

---

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24, 32**
- Component padding: p-6, p-8
- Section spacing: py-20, py-24, py-32
- Element gaps: gap-4, gap-6, gap-8
- Container margins: mx-auto with max-w-7xl

### Grid Structure
- **Container**: max-w-7xl mx-auto px-6 md:px-8
- **Project Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Features Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- **Industries**: grid-cols-2 md:grid-cols-3 lg:grid-cols-6

---

## Component Library

### Navigation
- Sticky header with backdrop-blur-xl and subtle border-b
- Logo on left, menu items center, CTA buttons right
- Transparent background with blur effect on scroll
- Height: h-16 to h-20

### Hero Section
- Full viewport height (min-h-screen) with gradient background
- Diagonal gradient overlay from top-left (blue) to bottom-right (purple)
- **Large Hero Image**: Mockup of AI dashboard/interface positioned right side, 50% width on desktop
- Headline: Massive, bold typography with gradient text effect
- Subheading: 2-line description, text-xl, max-w-2xl
- CTA buttons: Primary filled purple, Secondary outline with blur backdrop
- Animated particles/grid pattern overlay (subtle)

### Project Cards
- Glassmorphic cards: backdrop-blur-md with border border-white/10
- Rounded corners: rounded-2xl
- Padding: p-6 to p-8
- Hover state: slight scale (1.02) and border glow
- Structure: Project thumbnail (16:9 ratio), title, description, tech stack pills, live demo link button

### How It Works Section
- 3-column grid on desktop, stacked mobile
- Each step: Large number (01, 02, 03), icon, title, description
- Progress connector line between steps (horizontal on desktop)
- Background: subtle gradient from dark to darker

### Statistics Section
- 4-column grid showcasing key metrics
- Large numbers with gradient text effect
- Icon + Number + Label format
- Animated counter effect on scroll into view

### Features Grid
- 4-column grid reducing to 2 on tablet, 1 on mobile
- Icon (gradient colored), bold title, 2-line description
- Minimal borders, focus on iconography
- Background: slightly lighter than base dark

### Pricing Table
- 3-column cards side-by-side on desktop
- Middle card (Professional) elevated and highlighted
- Each card: Title, price (large, bold), feature list with checkmarks, CTA button
- Professional tier: Different border color (purple glow)

### Industries Served
- 6-column icon grid (3 on tablet, 2 on mobile)
- Industry icons with labels underneath
- Subtle hover effect: icon color shift to gradient
- Clean, minimal presentation

### Footer
- 3-column layout: Brand/description, Quick Links, Contact/Social
- Social icons with hover gradient effect
- Subtle top border
- Background: Slightly darker than body

---

## Images

### Hero Section
- **Primary Hero Image**: AI dashboard mockup or interface screenshot, positioned on right 50% of hero
- Style: Floating with subtle shadow, slight perspective tilt
- Format: PNG with transparency for modern look
- Include subtle glow/gradient border effect

### Project Showcase Cards
- **Project Thumbnails**: 16:9 aspect ratio screenshots of each project
- High-quality interface screenshots showing the actual applications
- Consistent presentation (browser mockup frames optional)

### Background Elements
- Subtle grid pattern overlay on dark sections
- Gradient orbs/blobs as decorative elements (low opacity)
- Abstract tech-themed illustrations where appropriate

---

## Animations
- **Scroll-triggered fades**: Sections fade up on scroll into view
- **Hover interactions**: Subtle scale (1.02-1.05) and glow effects on cards
- **Gradient animations**: Slow-moving gradient backgrounds
- **Counter animations**: Numbers count up when statistics section is visible
- **Particle effects**: Minimal floating particles in hero section background
- Keep all animations subtle and performance-optimized

---

## Accessibility
- Maintain WCAG AA contrast ratios (light text on dark backgrounds)
- Focus states: visible purple ring on interactive elements
- Consistent dark mode throughout (no light mode toggle needed)
- Semantic HTML structure for all sections

---

## Key Visual Treatments
- **Glassmorphism**: Cards with backdrop-blur and subtle borders
- **Gradient Text**: Apply to headlines and key numbers
- **Glow Effects**: Subtle purple/blue glows on hover states
- **Depth**: Layered elements with shadows and blur create depth
- **Asymmetry**: Break grid occasionally for visual interest (hero layout, featured projects)

This design creates a modern, tech-forward portfolio that communicates expertise in AI development while maintaining professional credibility through clean layouts and purposeful visual hierarchy.