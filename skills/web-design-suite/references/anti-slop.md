# Anti-slop checklist

One deduplicated list of the patterns that make a page read as AI-generated, merged from taste-skill, Impeccable's detector rules, frontend-design, Emil Kowalski, Vercel guidelines and the image-direction skills. Load this on every build, redesign and review. Cite items as `anti-slop.md SL#`.

Every item is a default to avoid, not a law: if the brief explicitly asks for one of these (conflicts.md C0), do it on purpose and do it well. If you notice one in your output that the brief did not ask for, rewrite the element; do not soften it.

The self-check: cover the logo. If someone could guess this page's look from its category alone ("AI startup", "cookware brand", "dev tool"), it is slop. Rework until the answer is not obvious.

## Composition

- **SL1** Hero plus three equal icon-heading-text cards as the page skeleton. Identical card rows repeated section after section.
- **SL2** Hero-metric template: big number, small label, row of supporting stats, gradient accent. Three identical KPI columns ("99% satisfaction") nobody asked for.
- **SL3** Text plus gradient blob as the hero visual. A hero needs a real image, demo, product moment or committed type treatment.
- **SL4** Div-built fake screenshots: fake dashboards, task lists, terminals, browser chrome assembled from styled divs.
- **SL5** Nested containers: cards in cards, double-bezel shells, one giant rounded panel wrapping more bordered panels.
- **SL6** Same layout family repeated: three or more image/text zigzags in a row, every section centered, identical rhythm everywhere.
- **SL7** Eyebrow or kicker label above headings (tiny uppercase, wide tracking, often a pill). Section numbers (`01 /`, `002 ·`) that encode no real sequence.
- **SL8** Bento grids with empty cells, or every cell white-on-white text.
- **SL9** Hero overload: trust strip, pricing teaser, tagline under CTAs, avatar row, version badge ("BETA", "v2.0") inside the hero.
- **SL10** Decoration with no job: crosshair hairlines, grid-line backgrounds, scroll cues ("Scroll to explore", bouncing chevrons), locale/time/weather strips, decorative status dots, "BRAND. MOTION. SPATIAL." strips.
- **SL11** Logo walls with category labels under each logo, or plain-text wordmarks standing in for logos.
- **SL12** A modal for a task that needs neither interruption nor protected focus.
- **SL13** Centered everything with lifeless symmetry, or asymmetry with no reason; either way the composition was not derived from content.

## Surface and color

- **SL14** Purple-to-blue or violet gradients, cyan-on-dark neon, glowing colored shadows, radial halo or spotlight glows behind the hero.
- **SL15** Gradient text on headings or metrics.
- **SL16** Reflex cream/beige ground with serif display and terracotta, clay or brass accent. Reflex near-black (`#0a0a0a`, `#111`) with one acid accent.
- **SL17** Glassmorphism on cards. Blur and translucency used as decoration rather than for floating chrome.
- **SL18** Thick colored border on one side of a card or callout (side-tab accent), especially on rounded corners.
- **SL19** Hairline border plus wide diffuse shadow on every card in a row. Default `rgba(0,0,0,.1)` shadow everywhere.
- **SL20** One border radius on everything regardless of hierarchy; oversized rounded everything; non-concentric nested radii.
- **SL21** Mesh blobs, floating spheres, noise over everything, repeating stripe gradients as filler texture.
- **SL22** Gray text on a colored background. Low-contrast placeholder or helper text.
- **SL23** A single random dark section in a light page (or the reverse) that is not a deliberate theme switch.
- **SL24** Images buried under a near-opaque wash or at near-zero opacity. Broken or empty `<img>` sources.

## Typography

- **SL25** Oversized italic serif display hero (Fraunces, Instrument Serif, Playfair, Newsreader). Reflex font picks from any shortlist without a reason.
- **SL26** One word in the headline accented with italic, weight or color by default.
- **SL27** All-caps labels everywhere, wide-tracked micro text, mono used as a "technical" costume.
- **SL28** Flat hierarchy: heading and body sizes within 1.25x; giant heading over weak tiny subcopy; headlines wrapping to four or more lines.
- **SL29** Body lines over 80 characters; body under 14px; functional text under 11px; justified narrow columns; crushed tracking below -0.04em.
- **SL30** Title Case On Every Heading. Straight quotes and `...` in rendered copy.
- **SL31** Font weight that changes on hover or selection (layout shift).

## Motion

- **SL32** The same fade-and-rise entrance on every section; hover transitions on every card; content hidden at rest until a script reveals it.
- **SL33** Bounce or elastic easing; `scale(0)` entrances; `ease-in` on UI; `transition: all`.
- **SL34** Perpetual loops with no live data: pulsing dots, blinking fake cursors, typewriter headlines, shimmer on static text.
- **SL35** Auto-scrolling marquees and auto-advancing carousels; scroll hijacking or inertia smooth-scroll; parallax not mapped 1:1 to scroll.
- **SL36** Animation on keyboard-triggered or 100+-times-a-day actions. No `prefers-reduced-motion` path.
- **SL37** `window.addEventListener('scroll')` driving animation; `will-change` on everything.

## Content and copy

- **SL38** Buzzwords: elevate, seamless, unleash, next-gen, revolutionize, game-changer, supercharge, empower, cutting-edge, world-class, enterprise-grade, transformative, streamline, delve, tapestry, "powerful solution".
- **SL39** Aphoristic cadence: "Not a feature. A platform.", "X. No Y.", "Just Y." landing three or more times. "Theater" framing.
- **SL40** Em dashes in UI copy (conflicts.md C14). Middle dots joining everything ("A · B · C"). "WORD — fragment" labels.
- **SL41** Placeholder people and brands: John Doe, Jane Smith, Acme, Nexus, SmartFlow, Flowbit, NovaCore. Lorem ipsum.
- **SL42** Fake-precise or fake-round numbers (99.99%, 10x, 48k) not backed by the brief. Invented customers, prices, benchmarks or testimonials presented as real.
- **SL43** Performative-craftsman labels: "Field notes", "Quietly trusted by", "Currently on the bench", photo-credit captions on stock images, version footers on marketing pages.
- **SL44** Duplicate CTA intent ("Get started" and "Start free" on one page); CTA labels that wrap or exceed three words; generic "Submit", "Learn more", "Click here".
- **SL45** "Oops!" errors, exclamation marks on success, passive voice, errors without a recovery step.
- **SL46** Trailing `→` appended to every link and button by reflex.

## Assets and icons

- **SL47** Emoji or unicode glyphs used as icons. Mixed icon libraries or stroke weights on one surface. Cliché metaphors (rocket = launch, shield = security).
- **SL48** Pictorial scenes assembled from SVG primitives; many-vertex `clip-path` blobs faking an organic edge.
- **SL49** Same avatar for different people; identical dates on every blog card; stock "diverse team" photos.

## Code

- **SL50** Placeholder code: `// ...`, `// TODO`, "rest of code", "for brevity", skeletons where a full implementation was asked for.
- **SL51** `<div onClick>` instead of `<button>`; `<img>` without `alt`; `outline: none` with no focus-visible replacement; zoom disabled in the viewport meta.
- **SL52** `h-screen`/`100vh` heroes; `z-index: 9999`; arbitrary pixel widths on text containers; `h-screen` app shells that break under mobile browser chrome.

## Machine checks

`evals/check.mjs` reads the JSON block below and scans generated files. `scope`: `markup` (html, jsx, tsx, vue, svelte, astro, mdx), `style` (css and scss plus markup), `all` (also js and ts). `max`: allowed occurrences per file before the rule fires (default 0). `unless`: skip the file if this regex matches anywhere in it. Errors fail the check; warnings are reported. Override a rule the brief explicitly requests with `--allow ID`.

<!-- slop-patterns:start -->
```json
[
  { "id": "SL40-em-dash", "severity": "error", "scope": "markup", "pattern": "[—–]", "flags": "g", "message": "Em/en dash in UI copy (C14). Use a period, comma or hyphen for ranges." },
  { "id": "SL40-middot", "severity": "warn", "scope": "markup", "pattern": "·", "flags": "g", "max": 3, "message": "Middle dots used as a default separator." },
  { "id": "SL15-gradient-text", "severity": "error", "scope": "style", "pattern": "background-clip:\\s*text|bg-clip-text", "flags": "gi", "message": "Gradient text. Use a solid color; emphasis comes from weight or size." },
  { "id": "SL14-ai-gradient", "severity": "warn", "scope": "style", "pattern": "\\b(from|via|to)-(purple|violet|indigo|fuchsia)-\\d{2,3}\\b", "flags": "g", "message": "Purple/violet gradient stop: the AI default unless the brand is purple." },
  { "id": "SL14-glow", "severity": "warn", "scope": "style", "pattern": "\\bshadow-(purple|violet|indigo|fuchsia|cyan)-\\d{2,3}\\b|0\\s+0\\s+\\d{2,}px\\s+(rgba?\\((?!0,\\s*0,\\s*0)|#(?!000))", "flags": "g", "message": "Colored glow shadow." },
  { "id": "SL33-transition-all", "severity": "error", "scope": "style", "pattern": "transition:\\s*all\\b|\\btransition-all\\b", "flags": "g", "message": "transition: all. Name the exact properties." },
  { "id": "SL33-scale-zero", "severity": "error", "scope": "all", "pattern": "scale\\(0\\)|\\bscale-0\\b|scale:\\s*0(?![.\\d])", "flags": "g", "message": "Entrance from scale(0). Start at 0.95 with opacity 0." },
  { "id": "SL33-bounce", "severity": "error", "scope": "all", "pattern": "\\b(bounce|elastic)\\.(in|out|inOut)\\b|\\banimate-bounce\\b", "flags": "g", "message": "Bounce/elastic easing (C32)." },
  { "id": "SL33-ease-in", "severity": "warn", "scope": "style", "pattern": "\\bease-in\\b(?!-out)", "flags": "g", "message": "ease-in on UI feels sluggish. Use ease-out or the --ease-out token." },
  { "id": "SL37-scroll-listener", "severity": "warn", "scope": "all", "pattern": "addEventListener\\(\\s*['\"]scroll['\"]", "flags": "g", "message": "Scroll listener. Prefer IntersectionObserver, ScrollTrigger or CSS scroll-driven animation." },
  { "id": "SL37-will-change-all", "severity": "error", "scope": "style", "pattern": "will-change:\\s*all", "flags": "g", "message": "will-change: all." },
  { "id": "SL35-marquee", "severity": "warn", "scope": "markup", "pattern": "marquee", "flags": "gi", "message": "Auto-scrolling marquee (C35). Default is none." },
  { "id": "SL7-eyebrow", "severity": "warn", "scope": "markup", "pattern": "(uppercase[^\"'`]{0,80}tracking-|tracking-[^\"'`]{0,80}uppercase)", "flags": "g", "max": 1, "message": "More than one tracked-uppercase label: eyebrow pattern (C1)." },
  { "id": "SL7-section-numbers", "severity": "warn", "scope": "markup", "pattern": ">\\s*0[1-9]\\s*[/.·]", "flags": "g", "message": "Numbered section labels. Only for real sequences." },
  { "id": "SL10-scroll-cue", "severity": "error", "scope": "markup", "pattern": "scroll (to (explore|discover|begin)|down)", "flags": "gi", "message": "Scroll cue." },
  { "id": "SL38-buzzword", "severity": "error", "scope": "markup", "pattern": "\\b(elevate[sd]?|seamless(ly)?|unleash(es|ed)?|next-gen(eration)?|revolutioni[sz]e[sd]?|game-?changer|delve|supercharge[sd]?|empower(s|ed|ing)?|cutting-edge|world-class|enterprise-grade|tapestry|transformative|streamline[sd]?)\\b", "flags": "gi", "message": "Marketing buzzword. Say what the product literally does." },
  { "id": "SL41-placeholder-names", "severity": "error", "scope": "markup", "pattern": "\\b(John Doe|Jane Doe|Jane Smith|Acme( Corp| Inc)?|Lorem ipsum)\\b", "flags": "gi", "message": "Placeholder name or lorem ipsum." },
  { "id": "SL42-fake-precision", "severity": "warn", "scope": "markup", "pattern": "\\b99\\.9+%|\\b100% (satisfaction|uptime)", "flags": "gi", "message": "Fake-round metric. Use real data or label it as sample." },
  { "id": "SL46-arrow-suffix", "severity": "warn", "scope": "markup", "pattern": "[→↗]\\s*</(a|button|Link)>", "flags": "g", "max": 1, "message": "Trailing arrow appended to link/button text by reflex." },
  { "id": "SL30-straight-ellipsis", "severity": "warn", "scope": "markup", "pattern": ">[^<{]*[A-Za-z]\\.\\.\\.(?=[\\s<])", "flags": "g", "message": "Three dots in copy. Use the ellipsis character." },
  { "id": "SL31-weight-on-hover", "severity": "warn", "scope": "markup", "pattern": "hover:font-(medium|semibold|bold|black)", "flags": "g", "message": "Font weight change on hover shifts layout." },
  { "id": "SL47-emoji", "severity": "error", "scope": "markup", "pattern": "\\p{Extended_Pictographic}", "flags": "gu", "message": "Emoji in markup. Use an icon library glyph." },
  { "id": "SL50-placeholder-code", "severity": "error", "scope": "all", "pattern": "//\\s*\\.\\.\\.|/\\*\\s*\\.\\.\\.\\s*\\*/|\\brest of (the )?(code|component|file)\\b|\\bfor brevity\\b|//\\s*TODO\\b", "flags": "gi", "message": "Placeholder code. Complete the implementation." },
  { "id": "SL51-div-click", "severity": "error", "scope": "markup", "pattern": "<(div|span)\\b[^>]*\\bon[Cc]lick=", "flags": "g", "message": "Clickable div/span. Use <button> or <a>." },
  { "id": "SL51-img-alt", "severity": "error", "scope": "markup", "pattern": "<img\\b(?![^>]*\\balt=)[^>]*>", "flags": "gi", "message": "<img> without alt." },
  { "id": "SL51-outline-none", "severity": "error", "scope": "style", "pattern": "outline:\\s*none|\\boutline-none\\b", "flags": "g", "unless": "focus-visible", "message": "outline removed with no :focus-visible replacement in the file." },
  { "id": "SL51-zoom-disabled", "severity": "error", "scope": "markup", "pattern": "user-scalable\\s*=\\s*(no|0)|maximum-scale\\s*=\\s*1(\\.0)?\\b", "flags": "gi", "message": "Zoom disabled. Fix input font size instead." },
  { "id": "SL52-h-screen", "severity": "warn", "scope": "style", "pattern": "\\bh-screen\\b|height:\\s*100vh", "flags": "g", "message": "100vh/h-screen. Use 100svh for heroes, 100dvh for app shells (C40)." },
  { "id": "SL52-z-spam", "severity": "warn", "scope": "style", "pattern": "z-index:\\s*9{3,}|\\bz-\\[9{3,}\\]", "flags": "g", "message": "Arbitrary z-index. Use a documented layer scale or isolation: isolate." },
  { "id": "SL16-pure-black", "severity": "warn", "scope": "style", "pattern": "#000000\\b|#000\\b", "flags": "gi", "message": "Pure black. Derive ink from the palette hue (C17)." }
]
```
<!-- slop-patterns:end -->

What the script cannot see (composition, rhythm, copy quality, whether a pattern was requested) still needs the visual review in `verify.md`. A clean scan is a floor, not a pass.
