# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Velvet Prism."** This concept moves away from the utilitarian "grid of boxes" found in standard productivity tools and instead treats the interface as a tactile, high-end editorial space. By combining deep, light-absorbing blacks with ethereal, luminous purples, we create an environment that feels private, focused, and premium. 

We break the "template" aesthetic through intentional asymmetry—such as oversized display typography paired with generous negative space—and by replacing structural lines with tonal depth. The goal is a "soft minimalist" experience where the user feels they are interacting with layers of light and shadow rather than a flat digital screen.

## 2. Colors
This palette is rooted in a nocturnal spectrum, designed to minimize eye strain while highlighting essential actions through high-chroma accents.

### The "No-Line" Rule
Designers are strictly prohibited from using 1px solid borders to define sections or cards. Boundaries must be established through:
- **Tonal Shifts:** Placing a `surface_container_low` card on a `surface` background.
- **Soft Gradients:** Utilizing subtle transitions from `primary` to `primary_container` to define interactive zones.
- **Negative Space:** Using the spacing scale to group related elements without physical containers.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Each layer represents a different level of focus:
- **Base:** `surface` (#141218) — The foundation of the app.
- **Sectioning:** `surface_container_low` (#1d1a21) — Used for large grouped areas like task categories.
- **Floating/Interactive:** `surface_container_high` (#2b292f) — Used for active cards or items currently being interacted with.

### The "Glass & Gradient" Rule
To achieve a signature look, primary calls-to-action (CTAs) and hero headers should utilize semi-transparent layers. Use `primary` at 80% opacity with a `backdrop-blur` of 20px for floating elements. This ensures the deep purples of the background bleed through, creating a "frosted" effect that feels integrated into the OS.

## 3. Typography
We utilize **Plus Jakarta Sans** for its modern, geometric clarity and editorial weight.

*   **Display & Headline Scale:** Use `display-md` for personalized greetings (e.g., "Good Evening, Alberto") and `headline-sm` for section titles. These should have a tight `letterSpacing` (-0.02em) to feel authoritative and custom.
*   **The Content Layer:** `body-lg` is the workhorse for task titles. It provides high legibility against dark backgrounds.
*   **The Utility Layer:** `label-md` and `label-sm` should be used for metadata (dates, categories). Increase `letterSpacing` (0.05em) and use `on_surface_variant` to create a sophisticated, "captioned" feel.

## 4. Elevation & Depth
In this design system, depth is a feeling, not a structure.

*   **The Layering Principle:** Avoid shadows for static elements. If a card needs to feel elevated, move it from `surface_container_low` to `surface_container_highest`. The subtle shift in lightness provides a cleaner, more modern "lift."
*   **Ambient Shadows:** For the Floating Action Button (FAB) or critical overlays, use a diffused shadow.
    *   *Color:* `on_secondary_fixed_variant` at 8% opacity.
    *   *Blur:* 32px to 48px.
    *   *Offset:* Y=12.
*   **The "Ghost Border" Fallback:** If accessibility requirements demand a container edge, use a "Ghost Border": `outline_variant` at 15% opacity. Never use a 100% opaque border.

## 5. Components

### Headers
Headers should be asymmetric and breathable. 
- **Style:** Place a `headline-lg` title on the left, with a `body-sm` metadata label tucked subtly above it. 
- **Background:** Use a very soft radial gradient of `primary_container` (at 5% opacity) in the top corner to draw the eye toward the primary navigation.

### Task Lists
- **Structure:** No dividers. Separate tasks using `surface_container_low` backgrounds with `lg` (1rem) rounded corners.
- **Interaction:** On press, the background should transition to `surface_container_high`.
- **Completion:** Use a `primary` color checkmark that, when triggered, fades the text to `on_surface_variant` with a subtle strike-through.

### Floating Action Button (FAB)
- **Visuals:** Use the `xl` (1.5rem) or `full` roundedness. 
- **Color:** `primary_fixed` (#eaddff) with `on_primary_fixed` (#220f48) for the icon.
- **Signature Touch:** Apply a subtle inner-glow using a 1px inner-shadow of `primary` (white-tinted) to give the button a 3D, "jewel-like" quality.

### Input Fields
- **Container:** Use `surface_container_highest`. 
- **States:** The "Active" state should not be a border change, but a subtle glow: a `primary` outer shadow with 4px blur at 20% opacity.

## 6. Do's and Don'ts

### Do:
- **Do** use `primary_container` for secondary visual interest (like progress bars or graph lines).
- **Do** embrace "Atmospheric Space." If a screen feels crowded, increase the vertical padding between `surface_container` blocks.
- **Do** use `soft` transitions (250ms ease-out) for all hover and press states to maintain the "Velvet" feel.

### Don't:
- **Don't** use pure white (#FFFFFF) for text. Always use `on_surface` (#e7e0e9) to maintain the soft, premium contrast.
- **Don't** use standard Material icons in their default weight. Choose "Light" or "Thin" icon variants to match the Plus Jakarta Sans typography.
- **Don't** use hard-edged rectangles. Every interactive element must have at least a `md` (0.75rem) corner radius.