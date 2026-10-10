---
description: Add, fix or audit motion. Gates every animation on frequency and purpose, then builds it with the right tool, tokens and reduced-motion path.
argument-hint: <element, component or page to animate> [audit]
---

Use the **web-design-suite** skill. Motion target: $ARGUMENTS

Load `references/motion/principles.md` and `references/motion/recipes.md`. Load `motion/gsap.md` or `motion/react-motion.md` only if MOT3 picks that tool.

**If the argument includes `audit`** (or the request is "what should animate" / "improve the animations"): do not edit. Recon the stack, motion libraries, existing easing and duration tokens, and a frequency map of animated elements. Report two tables:
- Fixes: `# | Severity | Location | Before | After | Rule` (High: wrong easing on UI, motion on keyboard or 100+/day actions, `scale(0)`, layout-property animation; Medium: wrong origin, non-interruptible UI, missing reduced motion; Low: polish).
- Opportunities (at most 5 to 7): `Location | Today | Purpose | Frequency | Suggested motion with exact values`.
Then list 2 to 5 rejected candidates with the gate question that killed each, and stop.

**Otherwise, build:**
1. Run the gate for each requested animation (MOT1 frequency, MOT2 purpose). If it fails, say so in one line, offer the non-motion alternative, and do not build it.
2. Pick the tool (MOT3), properties (MOT4), easing token (MOT5), duration (MOT6) or spring (MOT7). Reuse the project's motion tokens if they exist; otherwise add the MOT5 tokens once.
3. Start from the matching recipe (REC1-REC18). Ship reduced motion and hover gating in the same change (MOT10, MOT11). Make it interruptible (MOT8) and keep content visible by default (MOT13).
4. Verify: play at 10 percent speed, trigger twice quickly, emulate reduced motion, check the console (`verify.md` VER2). Run `node "${CLAUDE_PLUGIN_ROOT}/evals/check.mjs" scan <changed files>`.
5. Report in at most a few lines per animation: gate result, ingredients (tool, properties, curve, duration), what was verified, and what still needs a feel-check on a real device.
