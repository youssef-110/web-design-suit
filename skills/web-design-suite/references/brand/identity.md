# Brand identity

Building a brand world: strategy, the mark, and a brand board or style page. Use for brand briefs and whenever a build has no existing identity. Cite as `brand/identity.md BRD#`.

## Strategy first

- **BRD1. Infer the strategy before drawing anything**: category, audience, what the product does, its emotional promise, cultural position, trust level, the visual world it belongs to, one core metaphor, and what the brand must avoid. A brand is a visual argument for why the product exists, not decoration.
- **BRD2. Find the world, not the category.** List several concrete systems, artifacts, places or rituals the audience knows by heart (their publications, signage, tools' print heritage, physical objects), with one line on why each resonates and one on how it looks (ground, main colors, type voice, one signature). The obvious artifact of the category and its predictable opposite are both ruts; spend at most one candidate on each. Commit to one world; a world reduced to an accent on a neutral template is the default with a sticker on it.
- **BRD3. Ask what this would be as a physical object**, and what its world looked like before the web. Those answers carry materials, palette and type further than adjectives do.

## The mark

- **BRD4. A logo is simple, memorable, symbolic, scalable** and works as icon, wordmark, favicon, badge and pattern. It should look like the result of research and reduction.
- **BRD5. Build it with one method** (two at most):
  - **Monogram plus meaning**: the initial shaped by the metaphor (cuts, folds, negative space).
  - **Product action**: the product's main verb made abstract (build: frame or scaffold; protect: boundary; speak: waveform; automate: loop).
  - **Metaphor fusion**: two meaningful ideas reduced into one mark (owl plus drone vision; moon plus waveform).
  - **Negative space**: a hidden arrow, protected center, cutout initial.
  - **Construction geometry**: circles, diagonal cuts, grids, modular blocks, with the construction shown.
- **BRD6. Avoid**: generic bolts, random animals, fake crests, meaningless sparkles, clip-art, copies of famous marks, overcomplicated symbols, inconsistent variants.
- **BRD7. On the web**, author simple marks as clean SVG (a few paths, `currentColor`, works at 16px); anything pictorial is produced as an image, not assembled from SVG primitives (conflicts.md C47).

## The system

- **BRD8. Palette**: one dominant palette with named roles (`color/color-system.md` COL1, COL6), shown as swatches with hex/OKLCH values and the role each plays.
- **BRD9. Type**: one or two faces with a specimen line and the scale (`typography/type-system.md`).
- **BRD10. Tagline**: short and specific ("Nothing random.", "Your network. Our watch."). No buzzword soup, no long slogans.
- **BRD11. Imagery direction**: art-directed and matched to the palette and metaphor (landscape, product close-up, material texture, halftone). No generic stock people, office scenes or robot clichés.
- **BRD12. Application mockups are minimal and believable**: app icon, browser bar, a single UI chip, a card, a label. Not full fake dashboards.

## Brand board or brand page

- **BRD13. Default board (3 x 3)**: logo cover; logo construction; digital application; essence (tagline); color system; typography; physical application; image direction; system detail (UI chips, icon row, pattern). Compact options: 2 x 3 (logo, product surface, command or input panel, atmosphere image, symbol or badge, tagline) or 2 x 2.
- **BRD14. Rhythm**: not every panel equally loud. Alternate quiet, functional, emotional, technical, atmospheric and detailed panels; one strong idea per board.
- **BRD15. Text is sparse and large**: brand name, one tagline, a few section labels, short UI chips. No paragraphs, no tiny fake body copy.
- **BRD16. Premium detail rewards a closer look** (a construction line, one highlighted word, one accent chip), used sparingly.
- **BRD17. When an image-generation tool is available**, generate the board as one composed image per the layout above, then build any web version of the brand page from it without drifting into a generic template; when none is available, build the brand page in HTML with real SVG marks and swatches.
