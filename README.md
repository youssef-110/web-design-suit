# web-design-suite

One Claude Code plugin that replaces a pile of separate design skills. It merges the best rules from taste-skill, Impeccable, Emil Kowalski's skills, make-interfaces-feel-better, the official GSAP skills, Vercel's guidelines and the Chrome DevTools skills into a single routed system: one short router, eleven domain reference sets, one anti-slop checklist, and an explicit table that rules on every place the sources disagree.

## What it does

- **Intake first.** Reads your brief, fills a template (audience, goal, brand, content, constraints, references), and asks one short round of questions only for what is missing, instead of guessing.
- **Routes by task.** Landing page, dashboard, portfolio, app UI, redesign, animation, mobile, docs or brand: each loads only the reference files it needs.
- **Holds a quality bar.** The brief beats taste; every decision cites a rule; no placeholder code; real content and states; verification in a real browser (desktop and mobile widths, console, reduced motion, contrast, keyboard) with an honest report of what was and was not checked.
- **Catches AI slop mechanically.** `evals/check.mjs` scans output for 30 banned patterns (gradient text, `transition: all`, `scale(0)`, em dashes in copy, buzzwords, emoji icons, missing alt, disabled zoom, and more).

## Install

```text
/plugin marketplace add youssef-110/web-design-suite
/plugin install web-design-suite@web-design-suite
```

Then restart or reload Claude Code. The skill triggers automatically on UI work; the commands are available under `/web-design-suite:`.

Recommended companions (optional, not bundled):

- Chrome DevTools MCP for verification: `claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`
- shadcn/ui MCP for component lookup: `claude mcp add shadcn -- npx @jpisnice/shadcn-ui-mcp-server`
- Impeccable's detector engine: `npx impeccable install` (downloads its own binary; this plugin never does)
- transitions.dev skills for 35 drop-in transitions (separate licence, so not included here)

## Commands

| Command | What it does |
|---|---|
| `/web-design-suite:brief <request>` | Turns a rough request into a confirmed brief and design read. No code. |
| `/web-design-suite:build <what or DESIGN-BRIEF.md>` | Plans, builds the full deliverable, verifies in a browser, reports with rule citations. |
| `/web-design-suite:redesign <path or URL> [refine\|overhaul]` | Audits first, fixes by lever, never silently changes URLs, labels, form fields or analytics. |
| `/web-design-suite:animate <target> [audit]` | Gates each animation on frequency and purpose, then builds it with the right tool and a reduced-motion path. |
| `/web-design-suite:review <files, route or URL> [quick\|full]` | Read-only review: mechanical scan, rendered checks, judgment, Block / Needs changes / Approve. |
| `/web-design-suite:mobile <target> [audit]` | Applies the mobile-web baseline and fixes touch, viewport, input and safe-area issues. |

## Before and after

Same brief (eval B1): *"Landing page for Slackwater, an app that tells sea kayakers when tide, current and wind make a launch safe."*

**Before**: what an unguided model typically produces ([evals/fixtures/slop.html](evals/fixtures/slop.html)):

```html
<section class="h-screen ... bg-gradient-to-r from-purple-600 to-blue-500">
  <span class="uppercase tracking-widest ...">✨ Now in beta</span>
  <h1 class="... bg-clip-text text-transparent">Elevate your paddling — seamlessly</h1>
  <p>Unleash the power of next-gen tide intelligence...</p>
  <button>Get Started →</button> <button>Start Free Trial →</button>
  <p class="animate-bounce">Scroll to explore</p>
```
```text
$ node evals/check.mjs scan evals/fixtures/slop.html
1 file(s) scanned: 27 error(s), 10 warning(s)
```

**After**: built with the suite ([evals/fixtures/clean.html](evals/fixtures/clean.html)). The visual world is a nautical chart (water tints, sounding blue, chart magenta for hazards); the hero shows the mechanism itself, a tide curve with the calm windows shaded, instead of a gradient; one primary action; sample data labeled as sample; one authored motion moment (the curve draws once, off under reduced motion).

```html
<h1>Paddle the slack, not the rip.</h1>
<p class="lede">Slackwater reads the nearest tide station, current and wind for your launch,
  then marks the calm windows on one chart.</p>
<a class="btn btn-primary" href="/plan">Plan a trip</a>
<figure class="chart"> <!-- tide curve SVG with shaded slack windows, hazard flagged --> </figure>
```
```text
$ node evals/check.mjs scan evals/fixtures/clean.html
1 file(s) scanned: 0 error(s), 0 warning(s)
```
Verified at 1280 and 390 wide: headline on two lines, no horizontal scroll, every target at least 44px, lowest text contrast 5.18:1, no console errors.

## How it is organised

```text
.claude-plugin/          plugin.json, marketplace.json
skills/web-design-suite/
  SKILL.md               router: intake, route, quality bar (under 150 lines)
  references/
    brief-template.md    intake template, task types, modes, dials
    anti-slop.md         one deduplicated checklist + machine patterns
    conflicts.md         precedence table: winning rule and reason for each disagreement
    verify.md            browser verification protocol and report format
    layout/ typography/ color/ motion/ interaction/ components/
    a11y/ performance/ mobile/ redesign/ brand/
commands/                brief, build, redesign, animate, review, mobile (each under 60 lines)
evals/
  briefs.md              10 test briefs with expected properties
  check.mjs              slop scanner + self-test (no dependencies, no network)
  fixtures/              slop.html (must fail), clean.html (must pass)
```

Every rule has an ID (`TYP11`, `MOT5`, `C40`), so outputs can cite exactly which rule drove a decision, and `check.mjs self-test` verifies that every citation in the docs points at a rule that exists.

## Evals

```bash
node evals/check.mjs self-test               # suite integrity: patterns, fixtures, size limits, citations, briefs
node evals/check.mjs scan <dir or files>     # scan generated output; exits 1 on errors
node evals/check.mjs scan site/ --allow SL47-emoji   # allow a pattern the brief explicitly asked for
```

Run the ten briefs in [evals/briefs.md](evals/briefs.md) against a fresh project and grade each against its expected properties.

## Licence

MIT for original work; adapted portions keep their source licences (MIT or Apache-2.0). See [NOTICE.md](NOTICE.md) for every source, its licence, and whether it was included or only referenced.
