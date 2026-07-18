# PrintEve Homepage — UI kit

A high-fidelity, interactive recreation of the PrintEve marketing homepage, composed from the design-system primitives and brand assets. Green identity, light + dark mode.

Open `index.html`.

## Files

- `index.html` — page shell + all layout CSS, loads React/Babel, the DS bundle, then the section scripts.
- `Icons.jsx` — lucide-style stroke icon set (`window.PEIcons`).
- `Data.jsx` — homepage content lifted from the source repo (`window.PEData`).
- `SiteHeader.jsx` — sticky header: top bar, logo, Products mega-menu, search, dark-mode toggle, account, cart, mobile menu.
- `Hero.jsx` — headline, dual CTA, trust row, floating product tiles, trust-badge strip.
- `Sections.jsx` — `SectionHead`, Stats, Categories, HowItWorks, WhyChooseUs.
- `Showcase.jsx` — FeaturedProducts (horizontal scroll), PartnerSection, Testimonials (marquee).
- `FooterFaq.jsx` — Faq, FinalCta, SiteFooter (newsletter + socials).
- `App.jsx` — composition + cart drawer, auth modal, toast, dark-mode state.

## Interactions

- **Dark mode** — sun/moon toggle flips `data-theme` on the root; all tokens swap.
- **Cart** — "Start Printing" / product cards add an item and open a slide-in cart drawer with running subtotal.
- **Auth** — the account icon opens a login/register modal (toggles between modes).
- **Mega-menu** — hover "Products" for the category grid; responsive mobile menu on small screens.
- **FAQ** — single-expand accordion. **Testimonials** — auto-scrolling marquee (pauses on hover).

## Components used from the system

Button, Input, Badge, Avatar, Rating, Accordion, StatCard, CategoryCard, ProductCard — all from `window.PrintEveDesignSystem_a6adda`.

## Note

This recreates the homepage in the **green brand direction** per the project brief. The source repo's home page is structurally the same but blue-themed; see the root README for the rebrand note.
