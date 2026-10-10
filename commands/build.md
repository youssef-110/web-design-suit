---
description: Build a new page, screen or component end to end with the web-design-suite quality bar, then verify it in a browser.
argument-hint: <what to build, or path to DESIGN-BRIEF.md>
---

Use the **web-design-suite** skill. Build: $ARGUMENTS

1. **Intake.** If `DESIGN-BRIEF.md` exists or the argument is a brief, use it. Otherwise run the intake from SKILL.md section 1 (one question round at most). State the design read line.
2. **Route.** Load the reference rows for the task type (SKILL.md section 2) plus `anti-slop.md`. Load `conflicts.md` when two rules disagree.
3. **Plan before code** (keep it short, in your reply):
   - Palette: color strategy (COL1) and 4 to 6 named role tokens with values.
   - Type: faces, roles and scale (TYP1, TYP7-TYP13), with the reason for each face.
   - Layout: the spatial thesis (LAY1), the first viewport (LAY4-LAY9), section families in order (LAY11), mobile collapse (RSP3).
   - Motion: the one authored moment, continuity and feedback (MOT12), tool choice (MOT3), or "static" with the reason.
   - The memorable element (Q3). Then review the plan: if a similar prompt would produce the same plan, revise that part and say what changed.
4. **Build** the complete deliverable: tokens as CSS custom properties, every section, every state (INT1-INT8), responsive behavior, reduced-motion paths, real or clearly labeled content. No placeholders (Q4). Check `package.json` before importing anything (CMP2).
5. **Verify** with the batched round in `verify.md` VER2 (Chrome DevTools MCP preferred): 1440 and 390 widths, console, reduced motion, contrast, keyboard, overflow. Then run:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/evals/check.mjs" scan <changed files>
   ```
   Fix everything in one batch; confirm with at most one more round.
6. **Report** in the VER5 format: decisions with rule citations, verified checks with evidence, not-verified checks with reasons, inferred brief fields to confirm, and any placeholder images that need replacing.
