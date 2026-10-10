# Eval briefs

Ten briefs across the task types. Run each in a fresh project folder with the plugin installed (for example `/web-design-suite:build <brief text>`), then grade the output against its expected properties. Every brief also has the **common properties** below.

Mechanical part of the grade:

```bash
node evals/check.mjs scan <output dir>          # must report 0 errors
node evals/check.mjs self-test                  # validates the suite itself
```

## Common properties (every brief)

1. The reply opens with the filled brief or the one-line design read, mode and dials (SKILL.md section 1).
2. If a material field was missing, exactly one question round of at most three questions was asked; otherwise none.
3. Every major decision cites a reference file and rule ID; uncited decisions say "no rule" with a reason.
4. Slop scan: 0 errors; every kept warning is justified.
5. No placeholder code; every requested section and state exists.
6. Browser verification ran at 1440 and 390 (or the report says plainly that no browser tool was available); console has 0 errors; no horizontal scroll at 390; reduced motion emulated with nothing moving spatially; contrast of the lowest text pair reported and at least 4.5:1 for body text.
7. The final report follows VER5, including a "Not verified" section.

## B1. Slackwater (landing)

- Task type: landing. Mode: Persuade.
- Brief: "Landing page for Slackwater, an app that tells sea kayakers when tide, current and wind make a launch safe. Audience: intermediate paddlers in New England. Goal: start planning a trip. No brand yet. Plain HTML/CSS."
- Expected: the hero shows the mechanism (a tide/slack-window visual or working planner), not text plus a gradient; primary action "Plan a trip" (or similar, three words or fewer) visible at 1280 x 800; no purple gradient, no cream-and-serif, no three equal feature cards; sample data labeled as sample; one authored motion moment at most; `100svh` not `100vh`.
- Reference result: `evals/fixtures/clean.html` (passes); `evals/fixtures/slop.html` is what to avoid (fails).

## B2. Hollis Ironworks (landing, premium consumer)

- Task type: landing. Mode: Persuade.
- Brief: "Site for Hollis Ironworks, a small foundry selling one 10-inch cast-iron skillet for $145. Audience: home cooks who buy once and keep it. Goal: buy. Use React + Tailwind v4."
- Expected: palette is not the beige/brass/oxblood/espresso family and not cream with serif (COL4, conflicts.md C18) unless justified in writing; no invented reviews or customer counts (CPY7); product imagery real or listed as placeholders for replacement; spec details grouped, not a 10-row hairline table (LAY21); add-to-cart works as the hero action (LAY9); `package.json` checked before imports.

## B3. Pager (dashboard)

- Task type: dashboard. Mode: Operate.
- Brief: "On-call dashboard for a 12-person SRE team: open incidents, service health for 30 services, who is on call, last 24h alert volume. Dark and light themes. React."
- Expected: standard controls and a recognisable shell (LAY24); tabular numbers on all metrics (TYP22); state colors paired with icons or labels (COL14); semantic tokens with both themes composed, not inverted (COL7, COL17); no hero-metric template or decorative sparklines (anti-slop.md SL2); filters reflected in the URL (INT23); 30-service list handles long names and an empty state (INT6).

## B4. Mira Okafor (portfolio)

- Task type: portfolio. Mode: Experience.
- Brief: "Portfolio for Mira Okafor, a motion designer. Six case studies with video. She wants it to feel kinetic but not gimmicky. MOTION 7."
- Expected: the work leads in the first viewport; one authored focal motion sequence, not a fade-up on every section (MOT12, conflicts.md C24); any scroll-linked sequence is scrubbed 1:1 and pinned correctly (GSP15) with a reduced-motion path; videos `muted playsinline` with posters and pause controls if they autoplay over 5s (A11Y15); no custom cursor, no auto-scrolling marquee.

## B5. Settings (app UI)

- Task type: app-ui. Mode: Operate.
- Brief: "Account settings for a B2B invoicing tool: profile, team members (invite, change role, remove), billing plan, delete workspace. Use the existing shadcn/ui setup."
- Expected: shadcn components customized to the project's tokens, not default look (CMP4); every field labeled with correct `type`/`autocomplete` (INT11, INT12); invite shows loading and success states (INT5, INT8); removing a member offers undo; deleting the workspace requires a confirmation naming the workspace (INT22, conflicts.md C43); errors say how to recover (CPY11).

## B6. Slackwater overhaul (redesign)

- Task type: redesign. Mode: Persuade.
- Brief: "Here is our current site: evals/fixtures/slop.html. Overhaul the look. Keep the product facts and keep the /signup URL."
- Expected: mode stated as overhaul (RED1); audit table with file:line findings before edits (RED5); `/signup` preserved (RED8); buzzword copy rewritten with the changes listed (RED9); before/after screenshots at the same viewports (RED13); output passes the slop scan while the input fails it.

## B7. Pricing motion (animation)

- Task type: animation. Mode: Persuade.
- Brief: "In our React pricing page, animate the monthly/yearly toggle, the price change, a 'Copied' state on the coupon button, and the plan-details drawer. Also the command palette opens too slowly."
- Expected: the command palette animation is removed, not tuned (MOT1); toggle and price use interruptible transitions with tabular numbers (MOT8, REC17); coupon button morphs its label in place (INT32); drawer uses the drawer recipe with ease-drawer and safe-area padding (REC6); every animation ships with a reduced-motion variant (MOT10); durations within MOT6; no `transition: all`.

## B8. Tidy booking (mobile)

- Task type: mobile. Mode: Operate.
- Brief: "Our appointment-booking web app feels like a website on phones: inputs zoom, the date sheet is janky, the bottom button hides behind the browser bar."
- Expected: inputs at 16px with zoom left enabled (MOB4); bottom-pinned UI in a `100dvh` shell with safe-area padding (MOB3, MOB7); sheet with drag, velocity dismissal and `overscroll-behavior: contain` (MOB16, REC13); hover gated (MOB1); a list of what still needs a real phone (verify note in mobile-web.md).

## B9. ripgrep-lite docs (docs)

- Task type: docs. Mode: Read.
- Brief: "Docs home for a small open-source CLI: install, quick start, flags reference, changelog. Static HTML."
- Expected: calm reading column at 60 to 75 characters (LAY25, TYP11); sentence-case headings (CPY16); code blocks with language tags and copy buttons; contents and next/previous navigation (LAY23); no marketing hero, no eyebrows; mono only for code and flags (TYP17).

## B10. Spoke & Mend (brand, pinned style)

- Task type: brand. Mode: Experience.
- Brief: "Brand page for Spoke & Mend, a community bike-repair co-op. Our printed zines use Fraunces for headings and our green is #1F7A4D; keep both. Logo is a wrench crossed with a spoke."
- Expected: Fraunces and #1F7A4D used as pinned, without arguing against them (conflicts.md C0, Q1), even though Fraunces is on the reflex list; the rest of the system still avoids defaults (no cream ground by reflex, no gradient text); logo built with one method from BRD5 as clean SVG; board or page follows BRD13 with sparse text (BRD15).
