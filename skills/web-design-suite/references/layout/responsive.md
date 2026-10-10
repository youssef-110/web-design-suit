# Responsive layout

How layouts adapt across widths, inputs and content extremes. Device-level touch fixes live in `mobile/mobile-web.md`. Cite as `layout/responsive.md RSP#`.

- **RSP1. Adaptation is rethinking, not scaling.** For each context decide what reorders, collapses, wraps, scrolls or stays fixed, and what remains most important.
- **RSP2. Mobile-first CSS.** Base styles for narrow screens, `min-width` queries layer complexity. Breakpoints come from where the content breaks; 640, 768, 1024 and 1280 usually suffice. Use `clamp()` for fluid type and spacing between breakpoints.
- **RSP3. Every multi-column layout declares its narrow fallback in the same component.** Asymmetric, overlapping or rotated layouts collapse to a single column under 768px; remove rotations and negative-margin overlaps there (they collide with touch targets).
- **RSP4. Container queries** for components that appear in different widths (sidebar card versus full-width card).
- **RSP5. Detect capability, not device.** `@media (hover: hover) and (pointer: fine)` gates hover styling; `(pointer: coarse)` enlarges targets. Never user-agent sniffing. Never put essential information or actions behind hover.
- **RSP6. Viewport units.** `100svh` for heroes and first screens; `100dvh` for app shells and bottom-pinned UI; avoid `100vh` (conflicts.md C40).
- **RSP7. No horizontal scroll at any width.** Common causes: fixed pixel widths, long unbreakable strings, off-screen animated elements, `100vw` with a scrollbar present. Fix the cause: `min-width: 0` on flex and grid children, `overflow-wrap: anywhere` on emails and URLs, `minmax(0, 1fr)` columns. Use `overflow-x: clip` on a wrapper only for decorative overflow.
- **RSP8. Text containers adapt to content.** No fixed widths on buttons or labels; leave 30 to 40 percent room for translation; test at 200 percent zoom and with the longest realistic strings.
- **RSP9. Responsive images.** `srcset` with width descriptors and an accurate `sizes`; `<picture>` when the crop must change (art direction); explicit `width`/`height` or `aspect-ratio` to prevent layout shift.
- **RSP10. Tables on narrow screens** become stacked rows with labels, or scroll horizontally inside their own container with a visible affordance; the page itself never scrolls sideways.
- **RSP11. Navigation adapts in stages**: full labels on desktop, compact on tablet, a drawer or bottom bar on phones. Keep the same information architecture everywhere.
- **RSP12. Tablet is its own layout**: two columns, master-detail, both touch and pointer.
- **RSP13. Very wide screens**: cap content width; let backgrounds and imagery bleed, not text.
- **RSP14. First viewport holds across desktop widths.** Check 1280, 1440 and 1600 wide: nothing the hero promises is pushed below the fold at 1280.

## Verify

Screenshots at 390, 768, 1280 and 1440; `scrollWidth <= innerWidth` at each; 200 percent zoom keeps content readable; hover-only affordances have a touch alternative.
