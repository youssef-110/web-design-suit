---
name: web-design-suite
description: Design and build web interfaces that do not look AI-generated. Use for landing pages, dashboards, portfolios, app UI, redesigns, animation and motion, mobile web, docs pages and brand pages; for UI polish, typography, color, layout, accessibility, performance and anti-slop review. Merges taste-skill, Impeccable, Emil Kowalski, make-interfaces-feel-better, GSAP, Vercel and Chrome DevTools guidance into one routed system with a strict quality bar.
---

# Web Design Suite

One router over a set of self-contained reference files. This file does three things: **intake**, **route**, and **hold the quality bar**. Everything else lives in `references/`, loaded only when its domain is active. Paths below are relative to this skill's directory; the plugin root (with `evals/`) is two levels up.

## 1. Intake

1. Read the brief, the repo (stack, `package.json`, existing tokens, components, fonts, icons) and any references the user gave.
2. Fill the template in [references/brief-template.md](references/brief-template.md) (BRF1). Mark each field given, inferred or missing.
3. If fields that change the result are missing (audience, goal, brand assets, real content, stack, what must stay untouched), ask **one round of two or three questions** (BRF2). Assert your best inference; never ask for CSS values or aesthetic menus. A precise brief only needs the design read.
4. Classify the **task type** and **visitor mode** (BRF3, BRF4) and set the **dials** (BRF5).
5. State the design read in one line before any code:
   > Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <system or visual world>. Mode: <mode>. Dials: V<n> M<n> D<n>.

## 2. Route

Always load: [anti-slop.md](references/anti-slop.md) for any build, redesign or review; [conflicts.md](references/conflicts.md) whenever two rules seem to disagree; [verify.md](references/verify.md) before finishing. Then load only the rows that apply:

| Task type | Load |
|---|---|
| landing | layout/composition, layout/responsive, typography/type-system, color/color-system, motion/principles, interaction/states, components/patterns, brand/copy; brand/identity if no brand exists |
| dashboard | layout/composition (LAY16-26), typography/type-system, color/color-system, interaction/states, components/patterns, a11y/accessibility, performance/web-performance |
| portfolio | layout/composition, typography/type-system, color/color-system, motion/principles, motion/recipes, brand/copy; motion/gsap for scroll sequences |
| app-ui | interaction/states, components/patterns, layout/composition, typography/type-system, color/color-system, a11y/accessibility |
| redesign | redesign/protocol first, then the domain files for each lever it selects (RED6) |
| animation | motion/principles, motion/recipes; motion/gsap or motion/react-motion depending on the tool chosen (MOT3) |
| mobile | mobile/mobile-web, layout/responsive, interaction/states |
| docs | layout/composition (LAY25), typography/type-system, brand/copy, a11y/accessibility |
| brand | brand/identity, color/color-system, typography/type-system, brand/copy |

Every shipping build also meets the floor in `a11y/accessibility.md` and `performance/web-performance.md` (PERF1-PERF5), even when not loaded in full.

Commands that wrap these workflows: `/web-design-suite:brief`, `:build`, `:redesign`, `:animate`, `:review`, `:mobile`.

## 3. The quality bar (non-negotiable)

**Q1. The brief beats taste.** If the user pins a style, palette, font, layout or motion level, honour it exactly, even when it appears in anti-slop.md (conflicts.md C0). Where the brief leaves an axis free, do not spend that freedom on a default.

**Q2. Every design decision traces to a rule.** Cite the file and rule ID for each decision (for example `typography/type-system.md TYP11`, `conflicts.md C40`). If a decision has no rule behind it, say so and give the reason. When two rules collide, apply the conflicts.md ruling and cite it; never silently merge contradictory rules.

**Q3. Commit to one direction.** Mode first, then a visual world chosen from the subject and audience, not the category. Spend boldness in one place: one memorable element, everything around it quiet and disciplined. Before writing code, check your plan: if a similar prompt would land on the same plan, revise the generic part and say what changed.

**Q4. No placeholder code. Complete the deliverable.** No `// ...`, `// TODO`, "rest of the code", skeletons or "for brevity". Every requested file, section, state and breakpoint is implemented. If output must be split, stop at a clean boundary and say exactly what remains.

**Q5. Real content and real states.** Believable copy in the product's terms; real or clearly labeled sample data; never invented customers, prices or testimonials as fact. Hover, focus, active, disabled, loading, empty and error states exist. Images are real (provided, generated, or verified) and listed for replacement when placeholders.

**Q6. Verify before finishing.** Open the result in a browser, preferring the Chrome DevTools MCP: desktop (1440) and mobile (390) widths, console errors, reduced motion emulated, contrast, keyboard focus, horizontal overflow (verify.md VER2). Run the slop scan on changed files:

```bash
node "<plugin root>/evals/check.mjs" scan <files or dirs>
```

Fix all errors; explain any warning you keep. At most two inspection rounds: inspect once, fix everything in one batch, confirm once.

**Q7. Report honestly.** End with the VER5 report: decisions with rule citations, what was verified with evidence, what was **not** verified and why, and which brief fields were inferred. Never claim a check that did not run.

## 4. Defaults when the brief is silent

- Stack: the project's existing stack. Greenfield: plain HTML/CSS/JS for a single page; React + Tailwind v4 when the user asks for an app or framework. Confirm before adding dependencies (CMP2).
- Motion: cheapest tool first (MOT3). Fonts self-hosted (TYP27). Icons from one library (CMP14).
- Theme: chosen from the use scene (COL3, conflicts.md C19).
- Tokens: color roles, type scale, spacing scale, radius scale, motion tokens defined once as CSS custom properties and used everywhere.

## 5. Optional companions (not bundled)

- **Impeccable** engine (`npx impeccable install`): adds 59 deterministic detector rules and live browser iteration. Optional; this suite works without it.
- **transitions.dev** skills: 35 drop-in CSS transitions under their own licence, referenced not copied.
- **Chrome DevTools MCP** (`chrome-devtools-mcp`) and the **shadcn/ui MCP server** (`@jpisnice/shadcn-ui-mcp-server`): recommended for verification and component lookup.
