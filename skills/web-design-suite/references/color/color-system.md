# Color and surfaces

Palette strategy, roles, contrast, themes, and surface treatment (shadows, borders, materials). Cite as `color/color-system.md COL#`.

## Strategy before swatches

- **COL1. Pick a color strategy first** (conflicts.md C16):
  - **Restrained**: tinted neutrals plus one accent. The usual answer for Operate and Read. Accent saturation stays moderate (under about 80 percent).
  - **Committed**: one saturated color owns 30 to 60 percent of the surface.
  - **Full palette**: three or four named roles that each own regions.
  - **Drenched**: the surface is the color.
  Persuade and Experience may take the bolder strategies when the brief allows. Commit at page scale (fields that own whole regions), not as accents scattered over gray.
- **COL2. Hue from meaning, not category.** Choose from the product's world and what it must feel like, never "fintech means blue". If someone could guess the palette from the category, rework it.
- **COL3. Light or dark from the use scene.** Write one sentence: who uses this, where, under what light. Let that pick the theme (conflicts.md C19), not the category or "dark looks premium".
- **COL4. Avoid the calibration clusters** unless the brief asks (anti-slop.md SL14, SL16): warm cream with serif and terracotta; near-black with one acid or neon accent; purple-to-blue gradients; cyan on dark. For premium consumer briefs, the beige/brass/oxblood/espresso family is the default to avoid; alternatives include cold silver and smoke, forest green with bone and amber, black and tan, cobalt with one neutral, terracotta with slate, olive with brick, monochrome with one saturated pop.
- **COL5. If the brand is already a color, keep it** (conflicts.md C0), including purple. Execute it with intent: harmonised neutrals, restrained gradients, consistent use.

## Roles and tokens

- **COL6. Build roles, not a bag of swatches**: canvas, raised surface, overlay; text primary, secondary, disabled; action, focus, selection; border and separator; success, warning, error, info; data series when needed.
- **COL7. Semantic tokens remapped in one place for themes** (conflicts.md C20). Components reference `--surface`, `--text-muted`, `--accent`, never raw palette values.
- **COL8. OKLCH for new palettes.** Vary lightness for ramps; reduce chroma toward white and black instead of holding it constant.
- **COL9. Neutrals carry a trace of the world's hue** (low chroma), one temperature across the page; never mix warm and cool grays. No pure `#000`, and no reflex `#0a0a0a`/`#111` either (conflicts.md C17).
- **COL10. Color consistency lock.** The accent is used identically across every section and state. No new color appears in section seven.
- **COL11. Secondary text on a colored surface** is a darker or lighter step of that surface's hue, or the foreground at reduced alpha; never a generic gray (anti-slop.md SL22).
- **COL12. Prefer explicit colors over stacked translucent overlays** where contrast depends on what is underneath.

## Contrast and perception

- **COL13. WCAG AA minimums, computed, in every state**: body text and placeholders 4.5:1; large text (24px, or 18.66px bold) 3:1; icons, control borders and focus indicators 3:1. Check hover, disabled, text on images, and both themes.
- **COL14. Color is never the only code.** Pair status color with an icon, label, shape or position. Data series differ in lightness or pattern too.
- **COL15. Buttons**: text readable on its own fill; ghost buttons over photos get a scrim, solid fill or stroke. No white-on-white CTAs.
- **COL16. Interactive states increase contrast**: hover, active and focus are more prominent than rest.

## Themes

- **COL17. Dark mode is designed, not inverted.** Raise elevation with lighter surfaces, lower chroma on large fields, keep the accent recognisable, recheck every contrast pair.
- **COL18. Theme lock.** The page has one theme; sections do not flip between light and dark unless that switch is the deliberate, single compositional move of the page.
- **COL19. Browser surfaces carry the theme**: `color-scheme` on `<html>`, `<meta name="theme-color">` per scheme, styled `::selection`, `caret-color`, scrollbar colors where appropriate, and explicit background/color on native `<select>`.

## Surfaces

- **COL20. Shadows for elevation, borders for structure.** Cards, buttons and popovers that need depth use layered transparent shadows; dividers, table cells, inputs and focus states keep borders. Example tokens (light):
  ```css
  --shadow-border: 0 0 0 1px oklch(0 0 0 / .06), 0 1px 2px -1px oklch(0 0 0 / .06), 0 2px 4px 0 oklch(0 0 0 / .04);
  --shadow-border-hover: 0 0 0 1px oklch(0 0 0 / .08), 0 1px 2px -1px oklch(0 0 0 / .08), 0 2px 4px 0 oklch(0 0 0 / .06);
  ```
  Dark: a single ring, `0 0 0 1px oklch(1 0 0 / .08)` (hover `.13`).
- **COL21. Shadows have an offset and soft blur and share one light direction.** Tint them toward the surface hue. No zero-offset colored glows (anti-slop.md SL14). Never hairline border plus wide diffuse shadow across a row of cards (conflicts.md C23).
- **COL22. Radius scale tied to hierarchy, nested radii concentric**: outer radius = inner radius + padding (when padding exceeds about 24px, choose each independently). Shape lock: one documented system (all sharp, all soft, or a stated mix like pill buttons with 12px cards) used everywhere (conflicts.md C4).
- **COL23. Image outlines**: `outline: 1px solid oklch(0 0 0 / .1); outline-offset: -1px` in light, `oklch(1 0 0 / .1)` in dark. Pure black or white at low alpha, never a tinted neutral.
- **COL24. Translucency only for floating chrome** over moving content (nav, toolbar, sheet), with a `prefers-reduced-transparency` solid fallback and `prefers-contrast: more` defined border. Never stack translucent surfaces; text over blur gets more contrast and weight (conflicts.md C22).
- **COL25. Gradients**: only when they carry meaning (light, material, data). Use eased gradients or `mask-image` for fades to avoid banding. No decorative mesh blobs, radial halos or grid-line backgrounds (conflicts.md C21).
- **COL26. Images are visible.** No raster under a wash that hides it (anti-slop.md SL24).

## Verify

List the strategy and the role tokens; computed contrast for the lowest pair in each theme; no raw palette values in components; the accent appears identically everywhere; dark mode screenshot reviewed if shipped.
