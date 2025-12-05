# Design System Guidelines

## Core Philosophy
**"Engineering over Decoration"**
- The UI should feel like a heads-up display (HUD) or a technical manual.
- High contrast, raw data exposure, visible grids, and structural typography.
- **NO** shadows (except for specific elevated cards), **NO** rounded corners > 2px (except circles).

## 1. Color Palette
Strictly Monochromatic.
- **Background**: `bg-white` (Main), `bg-neutral-50` (Hover/Alt).
- **Foreground**: `text-black` (Headings), `text-neutral-900` (Body).
- **Muted**: `text-neutral-500` (Meta data, descriptors).
- **Borders**: `border-black/10` (Subtle dividers), `border-black/20` (Active dividers).
- **Accents**: `bg-green-500` (Status indicators only).

## 2. Typography
**Primary Font**: Inter (`font-sans`)
- Used for: Headings, Body text, Buttons.
- Characteristics: Tight tracking (`tracking-tight` or `tracking-tighter`), bold weights for headers.

**Secondary Font**: JetBrains Mono (`font-mono`)
- Used for: Dates, Tags, Navigation labels, Footer metadata, "Status" text.
- Characteristics: Uppercase often used (`uppercase`), small text sizes (`text-xs` or `text-sm`).

## 3. Layout Patterns
- **The "Noise"**: A subtle SVG noise texture is applied to the `<body>` background to prevent the white from feeling "flat" or "sterile".
- **Topographic Lines**: `BackgroundGrid.tsx` provides faint SVG curves that evoke maps or elevation data.
- **Orbital Elements**: Key visual motifs involve concentric circles, dashed lines, and slow rotation.

## 4. Animation Tokens
Defined in `tailwind.config.ts`.
- `animate-scroll`: Infinite horizontal marquee (20s).
- `animate-rotate-orbit`: 10s linear rotation for logo rings.
- `animate-spin-slow`: 60s rotation for large background wireframes.
- `animate-pulse`: Used for the green "Online" status dot.

## 5. UI Components

### Buttons
- **Primary**: Solid Black, White Text. Sharp corners (`rounded-sm`).
- **Secondary**: Neutral Gray (`bg-neutral-100`), Black Text.
- **Ghost**: Transparent, Hover Gray.

### Cards & Rows
- **PostRow**: Minimalist list item.
  - Left: Date (Mono).
  - Center: Title + Description.
  - Right: Arrow Icon (Visible on hover).
  - Interaction: Entire row hovers to `bg-neutral-50`.

### Modals
- Backdrop blur (`backdrop-blur-sm`).
- Sharp edges, heavy drop shadow, border.
- `animate-in fade-in zoom-in-95` entry animation.
