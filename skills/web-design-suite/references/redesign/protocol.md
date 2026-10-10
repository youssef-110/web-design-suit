# Redesign protocol

Upgrading an existing site or app without breaking what works. Cite as `redesign/protocol.md RED#`.

## Decide the mode first

- **RED1. Name the mode before touching anything**; misclassifying it is the biggest source of bad redesigns:
  - **Refine (preserve)**: keep the incumbent identity, behavior, copy and everything outside scope; improve execution.
  - **Overhaul**: keep product truth, content, information architecture, functions and constraints; replace the visual world. The old look is evidence of what the product is, not authority over what it becomes.
  - **Greenfield**: the brand itself is changing; treat as a new build.
  If unclear, ask once: "Should this keep the current look and get sharper, or start visually fresh while keeping the content?" Never split the difference by polishing a look you were asked to replace.
- **RED2. Targeted evolution or full redesign.** If IA, content and SEO are sound, evolve with the levers in RED6 (most value at low risk). If the debt is structural (no system, broken mobile, broken IA), redesign with strict content preservation.

## Audit before editing

- **RED3. Scan**: framework, styling method (Tailwind version, CSS modules, CSS-in-JS), component library, existing tokens, motion libraries, fonts, icons, analytics, routes.
- **RED4. Record what exists**: brand tokens (colors, type, radii, logo treatment); page tree and primary conversion paths; content blocks doing work versus filler; signature patterns worth keeping; current dials (VARIANCE, MOTION, DENSITY) as the starting point; SEO baseline (titles, meta, structured data, OG images, ranking URLs); accessibility wins to keep.
- **RED5. Diagnose** against `anti-slop.md`, the domain references and this checklist, and list findings with file and line before fixing:
  - Typography: default or reflex fonts; weak headline presence; body too wide; only 400 and 700 weights; proportional numbers in data; no tracking by size; orphans; all-caps subheads everywhere.
  - Color: pure black; oversaturated or multiple accents; mixed warm and cool grays; AI purple-blue gradients; generic black shadows; random dark section.
  - Layout: everything centered; three equal cards; `100vh` heroes; flex percentage math; no max-width; equal-height forced cards; uniform radius; buttons at random heights across a card row; misaligned shared elements across columns.
  - States: missing hover, pressed, focus, loading, empty, error; `href="#"` dead links; no current-page marker in nav.
  - Content: generic names, round fake numbers, buzzwords, "Oops!", exclamation success messages, lorem ipsum, Title Case everywhere, identical blog dates, repeated avatars.
  - Code: div soup, inline styles mixed with classes, hardcoded pixel widths, missing alt, `z-index: 9999`, dead commented code, imports not in `package.json`, missing meta and OG tags.
  - Omissions: no favicon, no 404, no skip link, no legal links, no form validation, no back path in flows.

## Fix in this order

- **RED6. Levers, highest value per risk first**; stop when the brief is satisfied:
  1. Typography (face, scale, measure, tracking) (`typography/type-system.md`)
  2. Color cleanup (one accent, one gray family, tinted shadows, contrast) (`color/color-system.md`)
  3. Interactive states (hover, press, focus) (`interaction/states.md`)
  4. Layout and spacing (container, rhythm, alignment) (`layout/composition.md`)
  5. Replace generic components (three-card rows, default accordions, carousels with dots)
  6. Loading, empty and error states
  7. Motion layer at the brief's MOTION dial (`motion/principles.md`)
  8. Hero and key-section recomposition
  9. Full block replacement, only where a block is unsalvageable
- **RED7. Work inside the existing stack.** Do not migrate frameworks or styling systems; check the Tailwind version before editing config; vanilla CSS stays vanilla. Small, reviewable changes; test after each.

## Never change silently

- **RED8. Ask before changing**: URLs and route slugs; primary navigation labels; form field names, order and IDs (analytics and autofill depend on them); section IDs and anchor links; analytics event names; logo or wordmark; legal, consent and cookie copy; factual claims, prices and testimonials. Do not regress existing accessibility.
- **RED9. Preserve copy voice** in a refine; visual modernisation is not a content rewrite. Fix only clearly broken copy (typos, "Oops!", buzzwords) and list the changes.
- **RED10. Brand stays recognisable**: an existing brand color stays (including purple); evolve type and spacing around it.

## Stress the result

- **RED11. Worst-case data pass** on key components: realistic long names ("Aleksandra Wiśniewska-Kowalczyk"), long emails, a one-letter name ("Jo"), missing optional fields, counts of 0, 1 and 1,284, empty lists and 1,000-row lists, translated labels, RTL. Feed it through the same data boundary as the demo data, behind a dev-only toggle. Common fixes: `flex-shrink: 0` on avatars and icons, `min-width: 0` on text columns, `overflow-wrap: anywhere` on emails and URLs, `white-space: nowrap` on badges, top-align rows once text wraps, `Intl.PluralRules`, `Intl.NumberFormat`, `tabular-nums`, `title` on truncated text, initials from grapheme clusters (`Intl.Segmenter`), image `onError` fallbacks.
- **RED12. Truncate, wrap or clamp per field**: wrap identifying text (names, titles); end-truncate secondary metadata with a way to read the full value; middle-truncate file names, hashes and long-domain emails; clamp card previews; never truncate numbers, amounts or dates.

## Deliver

- **RED13. Before/after evidence**: screenshots of the same viewport before and after for each major section, the list of changes by lever, and anything deliberately left alone with the reason.
