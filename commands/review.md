---
description: Review a UI (files, route or URL) against the anti-slop checklist and every domain reference. Read-only report with a Block / Needs changes / Approve verdict.
argument-hint: <files, route or URL> [quick|full]
---

Use the **web-design-suite** skill. Review target: $ARGUMENTS

Read-only: do not edit source files in this command.

1. **Scope.** Identify framework, styling system and the surface's visitor mode (BRF3). `quick` covers the primary path and reports High and Medium only (cap 5 findings); `full` (default) covers everything (cap 15, systemic issues consolidated into one row).
2. **Mechanical pass.**
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/evals/check.mjs" scan <target files or dirs>
   ```
3. **Rendered pass.** Open the target in a browser (Chrome DevTools MCP preferred) and run the `verify.md` VER2 checks: 1440 and 390 screenshots, console, reduced motion, contrast, keyboard, overflow. Run the accessibility snippets in `a11y/accessibility.md` and, for slow pages, the LCP workflow in `performance/web-performance.md`.
4. **Judgment pass.** Load `anti-slop.md` and the domain files for this task type (SKILL.md section 2). Apply the cover-the-logo test. Check composition (LAY), type (TYP), color and surfaces (COL), motion (MOT), states and forms (INT), copy (CPY), mobile (MOB).
5. **Report** in the `verify.md` VER6 format:
   - Scope table: category, evidence inspected, result (findings count, Clear, or Not reviewed with reason).
   - Findings tables per category: `Severity | Location | Before | After | Rule`, worst first, file:line locations.
   - Where the mechanical scan and your judgment disagree (false positives, things the scan missed).
   - Considered but rejected: 2 to 5 candidates with reasons.
   - Verdict: **Block** (any High), **Needs changes** (Medium or Low only), **Approve** (none), with unverified checks listed beside it.
6. End by offering `/web-design-suite:redesign` or `/web-design-suite:animate` for the fixes.
