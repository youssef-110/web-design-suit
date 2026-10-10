# Typography

Choosing faces, setting a scale, and the rendering details that make text feel finished. Cite as `typography/type-system.md TYP#`.

## Choosing faces

- **TYP1. Choose by mode** (conflicts.md C10). Operate and Read: the system stack (`system-ui, -apple-system, "Segoe UI", sans-serif`) or one workhorse UI face; stability and scanability first. Persuade and Experience: a face chosen from the subject's world, the way you would choose an object for a set.
- **TYP2. Avoid the reflex picks.** For Persuade/Experience these are training-data defaults and need a written reason no other face satisfies: Inter as display, Geist, Outfit, Plus Jakarta Sans, DM Sans, Space Grotesk, Space Mono, IBM Plex, Syne, Instrument Sans, Fraunces, Instrument Serif, Playfair Display, Cormorant, Lora, Crimson, Newsreader, DM Serif. A subject association (books want serif, tech wants mono) is not a reason.
- **TYP3. Serif only with a reason** (conflicts.md C9): the brand names it, or the subject's world genuinely uses it and you can say why. No oversized italic serif hero by default.
- **TYP4. One family, or two clearly distinct ones.** A second family needs a job only it can do (display voice, code). Never a third without a reason.
- **TYP5. Never a system display face** (Impact, Arial Black, the platform sans) as the voice of a branded page. Source and self-host a face that matches.
- **TYP6. If the user pins a font, use it** (conflicts.md C0) and tune it well.

## The scale

- **TYP7. Fewest roles that make hierarchy unmistakable**: display, heading, body, label/meta, and data or code when needed. Name tokens by role (`--text-display`), not value.
- **TYP8. Steps of at least 1.25x between adjacent roles**, and hierarchy built from size, weight, space and color together, not size alone. Use 500 and 600 weights for subtle steps, not only 400 and 700.
- **TYP9. Display size** at most about 6rem; fluid with `clamp()` on Persuade surfaces (for example `clamp(2.5rem, 5vw + 1rem, 5.5rem)`); fixed and predictable on Operate and Read surfaces.
- **TYP10. Body text 16px minimum on the web** (1rem). 14px only for genuinely secondary text. Functional text (buttons, labels, table cells, nav) never under 11px; inputs 16px on touch (`mobile/mobile-web.md` MOB4).
- **TYP11. Measure 45 to 75 characters** for prose (`max-width: 65ch` is a good default); under 80 always.
- **TYP12. Leading inversely to size and measure**: about 1.05 to 1.15 for display, 1.5 to 1.7 for body, looser for wide measures, serif body and scripts with tall ascenders. Light text on dark: add a little leading, tracking and one weight step.
- **TYP13. Tracking by size**: display slightly negative (about -0.01 to -0.03em, never past -0.04em); body near 0; small uppercase labels slightly positive (0.04 to 0.08em). Never one letter-spacing for every size.
- **TYP14. Italic display with descenders** (g, j, p, q, y) needs line-height of at least 1.1 and a little bottom padding so descenders do not clip.

## Treatments to avoid by default

- **TYP15. No single-word accent** in a headline (italic, weight or color) unless the brand voice does it (conflicts.md C11).
- **TYP16. No all-caps labels everywhere** and no tracked micro-labels above headings (conflicts.md C1). Uppercase only for short labels that need it; never for runs of 80 characters or more.
- **TYP17. Monospace only for code, data, measurements and keys** (conflicts.md C15).
- **TYP18. Gradient text is out** (anti-slop.md SL15). Emphasis comes from weight, size or position.
- **TYP19. Sentence case** for headings, buttons and labels (conflicts.md C12). Brand names keep their own casing.

## Rendering details

- **TYP20. `text-wrap: balance` on headings** (short blocks, 6 lines or fewer); **`text-wrap: pretty` on paragraphs, captions and list items**; neither on long-form text of 10+ lines or code.
- **TYP21. `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`** once on the root.
- **TYP22. `font-variant-numeric: tabular-nums`** on numbers that change or align: counters, prices, timers, table columns, dashboards. Not on phone numbers, zip codes or version strings.
- **TYP23. Never change font weight on hover or selection**; it shifts layout. Use color, underline or a background.
- **TYP24. Typographic characters in rendered copy**: `…` not `...`, curly quotes and apostrophes, non-breaking spaces in `10&nbsp;MB` and `⌘&nbsp;K`, no em dashes as punctuation (conflicts.md C13, C14). Loading labels end in `…`.
- **TYP25. Paragraph rhythm**: spacing between paragraphs or a first-line indent, not both.
- **TYP26. Links**: underline with a set `text-underline-offset` (about 0.2em) and `text-decoration-thickness`; color alone is not enough in body copy.

## Loading

- **TYP27. Self-host fonts** (`next/font`, or `@font-face` with `woff2`). Load only the weights and subsets used; `font-display: swap` (or `optional` for non-critical faces); preload the one or two faces in the first viewport.
- **TYP28. Prevent reflow**: metric-compatible fallbacks (`size-adjust`, `ascent-override`) or `next/font`'s automatic fallback. Wait for `document.fonts.ready` before measuring or splitting text for animation.
- **TYP29. Respect the user**: never block zoom; size in `rem`; layouts survive 200 percent text size.

## Verify

Roles are distinguishable without reading the words; measure stays within 45 to 75ch at every width; no heading wraps to four or more lines at 1280; no text under the size floors; the computed `font-family` is the intended face (not the fallback); no layout shift when fonts load.
