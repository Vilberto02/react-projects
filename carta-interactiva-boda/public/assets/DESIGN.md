# Design System Specification: High-End Editorial Wedding Memory

## 1. Overview & Creative North Star: "The Digital Heirloom"
This design system is built upon the concept of **"The Digital Heirloom."** It rejects the cold, boxed-in nature of standard e-commerce in favor of an editorial, tactile experience that feels like flipping through a high-end linen-bound wedding album. 

The goal is to evoke nostalgia and permanence. We achieve this through **intentional asymmetry**, where imagery and text overlap to create a sense of depth, and a **"Breathable Luxury"** layout strategy that utilizes extreme white space to signal premium positioning. We are not just selling a box; we are providing a sanctuary for memories.

---

## 2. Color & Tonal Depth
The palette transitions from the ephemeral (Soft Creams) to the grounded (Deep Forest Green).

### Surface Hierarchy & The "No-Line" Rule
To maintain a high-end aesthetic, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined through background color shifts.
- **Surface (Primary):** `#fdf9f3` (Base for most pages).
- **Surface-Container-Low:** `#f7f3ed` (Used for subtle section changes).
- **Surface-Container-Highest:** `#e6e2dc` (Used for inset content or secondary "wells").

### The Glass & Gradient Rule
To move beyond a "flat" feel, use **Glassmorphism** for floating navigation and overlays.
- **Floating Navigation:** Use `surface` at 80% opacity with a `backdrop-blur: 20px`.
- **Signature Gradients:** For primary CTAs and hero section transitions, use a subtle linear gradient from `primary` (#7a5642) to `primary_container` (#d0a38b) at a 135-degree angle to add a "satin" finish.

---

## 3. Typography: The Editorial Voice
We pair the timeless authority of a serif with the modern clarity of a geometric sans-serif.

### Display & Headlines (The Serif)
Using **Noto Serif** (as a high-end alternative to Playfair), these should be treated as design elements themselves.
- **Display-LG (3.5rem):** Reserved for hero titles and poetic brand statements.
- **Headline-MD (1.75rem):** Used for storytelling sections.
- **Letter Spacing:** Headlines should have a slight `-0.02em` tracking to feel tighter and more bespoke.

### Body & Labels (The Sans-Serif)
Using **Manrope**, chosen for its warmth and legibility.
- **Body-LG (1rem):** Primary reading weight. Ensure a line height of `1.6` for a relaxed, editorial feel.
- **Label-MD (0.75rem):** Used for metadata, uppercase with `0.1em` tracking for a "gallery label" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We utilize **Tonal Layering** to create a soft, natural lift.

- **The Layering Principle:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f7f3ed) background. This creates a "paper-on-linen" effect that feels physical.
- **Ambient Shadows:** For floating elements like Modals or Cart drawers, use an ultra-diffused shadow: `0px 20px 40px rgba(28, 28, 24, 0.05)`. The shadow color is a tinted version of `on_surface` to mimic natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` (#d4c4b7) at **15% opacity**. Never use 100% opaque lines.

---

## 5. Components

### Buttons
- **Primary:** Rounded-XL (1.5rem), using the Primary Satin Gradient. Text is `on_primary` (#ffffff), uppercase `label-md` with tracking.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `primary`.
- **Tertiary:** No background or border. Text in `primary` with a 1px underline that expands from the center on hover.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid the use of divider lines. Separate list items using `spacing-4` (1.4rem) or a subtle shift to `surface_container_low`.
- **Imagery:** All cards must feature a `0.5rem` (DEFAULT) corner radius. Images should have a subtle 2% "inner glow" to soften the transition from image to frame.

### Memory "Moments" (Custom Component)
A bespoke component for this design system: A high-quality photo paired with a `title-sm` caption, slightly overlapping the image corner. The caption sits on a `surface_container` glass morphic plate.

### Input Fields
- **Style:** Minimalist underline style using `outline_variant` at 40% opacity. 
- **Active State:** Underline transitions to `tertiary` (Deep Forest Green) and thickness increases to 2px.

---

## 6. Do’s and Don’ts

### Do:
- **Use Asymmetry:** Place a text block slightly off-center to a hero image to create a curated, high-fashion look.
- **Embrace White Space:** Use `spacing-20` (7rem) between major sections to let the brand "breathe."
- **Layering:** Place a `dusty rose` (primary_container) accent shape *behind* an image of a memory box to add warmth.

### Don't:
- **Don't use pure black:** Use `on_surface` (#1c1c18) for text to keep the contrast soft and romantic.
- **Don't use sharp corners:** This is a romantic system; always use at least `sm` (0.25rem) or `md` (0.75rem) rounding.
- **Don't over-animate:** Transitions should be "Slow & Intentional" (e.g., 400ms ease-out) rather than "Snappy & Functional."

### Accessibility Note
Ensure that all text on `primary_container` (Dusty Rose) or `tertiary` (Forest Green) meets WCAG AA standards by using the designated `on_` tokens (`on_primary_container` and `on_tertiary`).