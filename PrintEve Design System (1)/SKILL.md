---
name: printeve-design
description: Use this skill to generate well-branded interfaces and assets for PrintEve, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map

- `readme.md` — the design guide: brand context, content voice, visual foundations, iconography, full file index. **Start here.**
- `styles.css` — single global stylesheet to link; pulls in all tokens + Inter.
- `tokens/` — color, type, spacing, shadow CSS custom properties (green brand, with dark mode).
- `assets/` — `logo-mark.svg` and the green-toned category illustration set.
- `components/` — React UI primitives (Button, Input, Card, Badge, Accordion, ProductCard, …), each with a `.d.ts` contract and `.prompt.md` usage note.
- `guidelines/` — visual specimen cards (color, type, spacing, brand).
- `ui_kits/homepage/` — a full, interactive homepage recreation to copy patterns from.

## Key brand facts

- **Green identity:** primary `#16A34A`, secondary `#22C55E`, soft accent `#DCFCE7`, slate neutrals, near-white canvas.
- **Inter** type; soft 12–24px corners; low-spread cool shadows; restrained 0.15–0.2s motion.
- **lucide** icons (2px stroke); flat green vector illustrations; **no emoji**.
- Voice: confident, benefit-led, "you/your brand"; Title Case headings; ₹ INR, pan-India.
