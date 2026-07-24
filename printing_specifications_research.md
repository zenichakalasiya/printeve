# Commercial Printing Specifications & Customization Parameters

To successfully print a physical product, commercial printers require a set of rigid technical specifications. Without these, the final product can suffer from color shifting, pixelation, incorrect sizing, print alignment errors, or binding issues.

Below is a detailed breakdown of the mandatory properties and customization options required by printers, organized by general print parameters, file-level specs, and product-specific configurations.

---

## 1. Core Material & Stock Parameters (The "Paper")

The material chosen defines the visual and tactile feel of the product. Printers require:

### 1.1 Paper Weight & Thickness (GSM vs. Points)
*   **GSM (Grams per Square Meter):** The standard metric measure for paper density.
    *   **70 – 100 GSM:** Standard office paper (letterheads, inner pages of books, envelopes).
    *   **120 – 170 GSM:** Light card/heavy paper (flyers, brochures, posters, magazine pages).
    *   **250 – 350 GSM:** Heavy cardstock (business cards, brochure covers, postcards, packaging).
    *   **400+ GSM:** Premium/luxury cardstock (thick business cards, premium invitation tags).
*   **Points (pt) / Caliper (US System):** Measures the actual thickness of the sheet in thousandths of an inch.
    *   *14 pt (0.014 inches)* and *16 pt (0.016 inches)* are the most common commercial cardstocks.

### 1.2 Paper Texture & Type
*   **Art Paper / Wood-free:** Smooth, refined paper optimized for color replication.
*   **Kraft Paper:** Unbleached, brown, fibrous paper. Popular for rustic, organic, and eco-friendly branding.
*   **Linen / Textured Paper:** Paper with embossed parallel lines or cross-hatch textures. Ideal for premium letterheads, invitation envelopes, and high-end cards.
*   **Synthetic Paper:** Tear-proof, waterproof polyester-based material. Used for outdoor menus or heavy-duty tags.
*   **Vinyl (for Stickers):** PVC/Polyester base, weather-proof, outdoor-grade, and flexible.

### 1.3 Finishes & Coatings
*   **Uncoated:** Standard porous paper. Feels natural. Mandatory if the customer needs to write on the product (e.g., note cards, calendars, registration forms).
*   **Matte Coating:** Flat, non-reflective coating. Eliminates glare and gives a modern, elegant look.
*   **Gloss Coating:** Highly reflective, shiny coating that makes images and colors pop.
*   **Satin/Silk Finish:** A middle ground between matte and gloss; soft, low-glare finish.
*   **Specialty Coatings:**
    *   *Aqueous Coating (AQ):* A fast-drying water-based sealer applied during printing to prevent smudging.
    *   *UV Coating / High-Gloss UV:* A liquid coating cured with ultraviolet light for an ultra-shiny, protective layer.
    *   *Soft-Touch / Velvet:* A micro-thin laminate that gives the surface a soft, suede-like tactile sensation.

---

## 2. Dimensional & Physical Parameters (The "Size")

Printers do not print on precut sheets of the exact size; they print on large sheets and cut them down. Hence, sizing parameters are strict:

| Parameter | Definition | Purpose |
| :--- | :--- | :--- |
| **Trim Size (Finished Size)** | The actual final dimensions of the printed product after it is cut. | Determines the physical boundaries of the product. |
| **Bleed Size** | An extra margin (typically **3mm** or **0.125"**) extending outside the Trim Size. | Crucial to prevent thin white slivers along the edges if the cutter shifts slightly. |
| **Safe Zone (Margin)** | An interior margin (typically **3mm to 5mm** or **0.125" to 0.25"**) inside the Trim line. | Keeps text and critical graphics from being cut off during high-speed cropping. |
| **Orientation** | The alignment of the artboard: Portrait (vertical) vs. Landscape (horizontal). | Dictates how the sheet is fed into the press and how it is bound. |

```
┌───────────────────────────────────────────┐  ◄─── Bleed Edge (Background image must fill to here)
│   ┌───────────────────────────────────┐   │  ◄─── Trim Edge (Where the blade cuts)
│   │   ┌───────────────────────────┐   │   │
│   │   │                           │   │   │  ◄─── Safe Zone Edge (All text/logos must be inside)
│   │   │    Text & Safe Content    │   │   │
│   │   │                           │   │   │
│   │   └───────────────────────────┘   │   │
│   └───────────────────────────────────┘   │
└───────────────────────────────────────────┘
```

---

## 3. Color Profiles & Ink Parameters (The "Color")

Digital displays project light (RGB), whereas printing presses lay down ink (CMYK). Printers require:

### 3.1 CMYK Color Space (Cyan, Magenta, Yellow, Key/Black)
*   **Mandatory Rule:** Files must be designed in or converted to CMYK. RGB files will undergo automatic conversion, leading to duller colors, particularly in bright greens, blues, and pinks.

### 3.2 Spot Colors (Pantone / PMS)
*   Used when absolute color precision is required (e.g., Coca-Cola Red, Starbucks Green) or for colors that CMYK cannot reproduce (neon, true metallic gold, silver).
*   **Requires:** Pantone Matching System (PMS) swatches configured in the artwork file.

### 3.3 Ink Coverage Limit (Total Area Coverage - TAC)
*   The sum of C, M, Y, and K percentages in any one pixel.
*   **Limit:** Usually capped at **300% to 320%** for offset printing. Over-saturation leads to wet ink pooling, offsetting (ink transferring to the sheet on top), or ripping.

---

## 4. Post-Press Finishing & Fabrication (The "Embellishments")

These options happen after the ink has dried and require specific physical alignments:

*   **Lamination:** Thin plastic film adhered to one or both sides (matte, gloss, soft-touch) to add structural strength and resistance to tears and water.
*   **Folding:**
    *   *Half-Fold / Bi-fold:* Folder in half (creates 4 panels).
    *   *Tri-Fold / C-fold:* Inner flap folds in, covered by outer flap.
    *   *Z-Fold:* Accordion fold resembling a "Z".
    *   *Gate Fold:* Two side panels meeting in the center like double doors.
*   **Binding:**
    *   *Saddle Stitch:* Spine is stapled (cheapest, max ~64 pages).
    *   *Perfect Bound:* Softcover book style with a flat glued spine (requires a minimum spine thickness of ~3mm).
    *   *Spiral / Wire-O:* Punch holes with plastic/metal loops (lays completely flat).
*   **Embossing & Debossing:** Using a metal die to physically raise (emboss) or recess (deboss) sections of the paper.
*   **Foil Stamping (Hot / Cold Foil):** Transferring thin metallic foils (Gold, Silver, Rose Gold, Holographic) onto selected areas using heat and pressure.
*   **Die-Cutting:** Using a custom blade to crop shapes out of the stock.
    *   *Standard:* Straight cuts, rounded corners (typical radii: 0.125" or 0.25").
    *   *Custom:* Unique custom curves (e.g., heart shapes, star stickers, custom hangtags).

---

## 5. Product-Specific Customization Grids

Here is what a printer specifically asks for depending on the item:

### 5.1 Custom Stickers & Labels
Stickers require adhesive parameters and custom cutting lines:
*   **Format:**
    *   *Die-Cut (Custom contour):* Single stickers cut fully through both sticker paper and backing.
    *   *Kiss-Cut:* Cut only through the sticker layer; backing remains square/rectangular (easier to peel).
    *   *Sheet Stickers:* Multiple kiss-cut stickers on a single A4/Letter backing sheet.
    *   *Roll Stickers:* Printed on continuous rolls (required for automatic labeling machinery).
*   **Adhesive Strength:**
    *   *Removable:* Low tack, leaves no residue.
    *   *Permanent:* Standard utility adhesive.
    *   *High-Tack/Industrial:* Heavy adhesive for textured surfaces or outdoor machinery.
*   **Cutting File Requirement:** A vector path on a separate layer (usually colored in 100% Magenta spot color named "Dieline" or "Cutpath").

### 5.2 Brochures & Flyers
*   **Flat Size vs. Folded Size:** A printer needs both (e.g., Flat: A4, Folded: Tri-fold to 99x210mm).
*   **Page Count:** Multi-page brochures require counts in multiples of 4 (e.g., 8, 12, 16, 20 pages) due to folding mechanics.
*   **Creasing:** Mandatory for stock heavier than 150 GSM to prevent the paper fibers from cracking when folded.

### 5.3 Business Cards & Postcards
*   **Plies/Layers:** 
    *   *Single Ply:* Standard cardstock (e.g., 350 GSM).
    *   *Multi-Ply (Duplex/Triplex):* Two or three card sheets glued together, sometimes with a colored core sandwich layer.
*   **Edge Finishing:** Standard square edges, rounded corners, or painted edges (applying colored inks/foil to the card edges).

---

## 6. Pre-Press File Checklist (What Printers Require to Process Files)

When files are uploaded to PrintEve, they must pass this automatic pre-flight check to guarantee quality:

1.  **Format:** Native PDF/X-1a:2001 or PDF/X-4.
2.  **Resolution:** 300 DPI minimum at 100% print scale (no low-res screenshots).
3.  **Color Space:** 100% CMYK (convert RGB, warn user of color shift).
4.  **Fonts:** Outlined (converted to vector paths) or embedded (prevents fallback font rendering issues).
5.  **Dieline/Varnish Layer:** Spot UV and custom die-cuts must be on a separate, dedicated vector layer, configured as a vector spot color.
6.  **Rich Black:** Black backgrounds should use a rich black mix (e.g., C:60, M:40, Y:40, K:100) instead of pure black (C:0, M:0, Y:0, K:100) to ensure a deep, dark black color instead of a muddy gray.
7.  **Overprint:** Black text (under 12pt) should be set to "overprint" to avoid alignment gaps between background colors and text.
