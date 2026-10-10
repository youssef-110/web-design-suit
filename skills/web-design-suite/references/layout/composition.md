# Layout and composition

How a page turns priority into reading order, grouping and rhythm. Self-contained; load for any build or redesign. Cite as `layout/composition.md LAY#`.

## Before moving boxes

- **LAY1. Name the spatial thesis first.** One line each: the primary reading or task path; what belongs together and what must separate; what leads and what supports; the intended density; how it changes on narrow screens. Choose the simplest structure that expresses those relationships.
- **LAY2. Squint test.** With detail blurred you must still see the primary element, the secondary element and the major groups, in order. If you cannot, hierarchy is wrong before any styling.
- **LAY3. Derive composition from content, not habit.** Neither "split hero" nor "centered headline over cards" is a default (conflicts.md C2). Ask what the first viewport must prove and pick the form that proves it: a live demo, the product at real scale, an image, a committed type treatment.

## The first viewport

- **LAY4. The hero is a thesis.** If a visitor left after one viewport, they should be able to say what this is and what to do. A mood is not an answer.
- **LAY5. Hero fits the viewport.** Headline at most two lines on desktop (three for a deliberately poster-like world); supporting text at most about 20 words; the primary action visible without scrolling at 1280 x 800. Plan headline size and image size together: a long headline gets a smaller size, never a four-line wrap.
- **LAY6. Hero holds at most four text elements**: optional label (see LAY14), headline, one supporting line, actions. Trust logos, pricing teasers, feature bullets, avatar rows and version badges go in sections below (anti-slop.md SL9).
- **LAY7. Hero top padding** stays modest (about 6rem at desktop at most). If the hero needs more presence, increase type or asset scale, not empty space above it.
- **LAY8. Full-height heroes use `min-height: 100svh`**, never `100vh`/`h-screen` (conflicts.md C40).
- **LAY9. Persuade surfaces expose the real action in its working form**: the search, the booking slot, the add-to-cart, the install command. A link pointing elsewhere is weaker.

## Sections and rhythm

- **LAY10. One spacing scale, deliberate rhythm.** A 4-unit base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Tight inside groups, generous between groups, more space above a heading than below it. Never one giant padding value on every section (conflicts.md C5).
- **LAY11. Vary layout families.** A layout family (split text/image, card grid, full-bleed quote, list) appears once or twice per page, not in every section. No more than two consecutive image/text zigzags. An 8-section page uses at least four families.
- **LAY12. Pace the scroll.** A dense passage earns a quiet one; one section is the peak (largest type, strongest image, the signature interaction). The page ends on a real close: a final action, contact, or next step.
- **LAY13. Group by proximity before containers.** Spacing and alignment do the grouping; add a border or background only when proximity cannot. Never nest containers (conflicts.md C3).
- **LAY14. No eyebrow labels by default** (conflicts.md C1). No section numbers unless the content is a real sequence (steps, timeline).
- **LAY15. Section headers stack.** Headline above body, body at most 65ch. The "big headline left, small paragraph floating top-right" header is out unless the right column carries a real visual or control.

## Grids, cards, bento

- **LAY16. CSS Grid for two-dimensional layout**, flex for one-dimensional rows. No percentage math like `calc(33% - 1rem)`. Use `gap` for sibling spacing. Contain content at roughly 1200 to 1440px with auto margins; text columns narrower.
- **LAY17. Cards only when elevation means hierarchy** or the item is an independent, actionable object. Otherwise use spacing, a divider, or nothing. In dense layouts (DENSITY 7+) replace cards with rows separated by 1px rules.
- **LAY18. Same-size icon-heading-text cards are not page structure** (anti-slop.md SL1). If items are genuinely parallel, prefer a list, a table, a two-column definition layout, or varied tile sizes that reflect importance.
- **LAY19. Bento grids have exactly as many cells as items** and interlock with no empty cells (`grid-auto-flow: dense` helps). At least two cells carry real visual variation (image, product moment, data), not text on the same ground.
- **LAY20. Align shared elements across siblings.** In pricing or comparison columns, titles, prices, feature lists and buttons line up. Pin card actions to the bottom so buttons form one line.
- **LAY21. Long lists change component, not length.** Over about five items, group into clusters, use a two-column split, tabs, or a "show all" disclosure. A spec table with a rule under every row is the laziest form.

## Navigation

- **LAY22. One line at desktop, 64 to 72px tall** (never over 80). If items do not fit at 1024px, shorten labels, drop secondary items, or collapse. Current page is visibly marked. Sticky only on long pages. Form follows the visual world; a floating glass pill is not a default (conflicts.md C7).
- **LAY23. Wayfinding.** Every screen answers: where am I, where can I go, what is there, how do I get out. No dead ends; a branded 404 and a skip link exist.

## Operate and Read surfaces

- **LAY24. Operate: predictable structure is an affordance.** Shell first: navigation, work areas and what each is for, the data read first and its states. Standard controls; the visual world lends type, palette, density and one signature move only.
- **LAY25. Read: calm column inside a committed frame.** Body measure 60 to 75 characters, real hierarchy, contents and next/previous navigation. The world owns the masthead, rail and openers, never the reading order.

## Depth and layering

- **LAY26. Depth only for state or hierarchy.** One layer scale documented (base, sticky, dropdown, overlay, modal, toast). Prefer `isolation: isolate` for local stacking over large `z-index` values.
- **LAY27. Optical over geometric.** After rendering, adjust what looks off: icon-side button padding about 2px less than the text side, play triangles nudged right, bottom padding of a block slightly larger than top when it looks top-heavy.

## Verify

The squint test passes at desktop and mobile; spacing values come from the scale; no section repeats the previous section's family; the hero fits at 1280 x 800; every list over five items has a deliberate component; keyboard and DOM order match the visual order.
