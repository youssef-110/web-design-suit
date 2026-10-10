---
description: Redesign an existing page or app. Audit first, pick refine or overhaul, fix by lever, never change URLs, labels or analytics silently.
argument-hint: <path, route or URL to redesign> [refine|overhaul]
---

Use the **web-design-suite** skill. Redesign: $ARGUMENTS

1. **Mode.** Load `references/redesign/protocol.md`. Decide refine, overhaul or greenfield (RED1). If the argument does not say and it is unclear, ask once.
2. **Audit before editing** (RED3-RED5). Read the code and open the current page in a browser (Chrome DevTools MCP preferred). Capture "before" screenshots at 1440 and 390. Record brand tokens, IA, content that works, signature patterns, current dials, SEO basics and accessibility wins. Run the slop scan on the current files:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/evals/check.mjs" scan <project source dir>
   ```
3. **Present the diagnosis** as a short table (finding, file:line, rule, planned fix) grouped by lever (RED6), plus the list of things that will not change (RED8). For an overhaul, also state the new direction in one paragraph (visual world, palette strategy, type, first viewport) and the design read line.
4. **Fix in lever order** (RED6), loading each lever's domain file as you reach it. Stay in the existing stack (RED7). Never change URLs, nav labels, form field names, section IDs, analytics events, logo or legal copy without asking (RED8). Keep the copy voice in a refine (RED9).
5. **Stress** key components with worst-case data behind a dev-only toggle (RED11, RED12).
6. **Verify** with `verify.md` VER2 and the slop scan on changed files. Capture "after" screenshots at the same viewports.
7. **Report**: before/after pairs per section (RED13), changes by lever with rule citations, what was deliberately left alone, verification evidence, and not-verified checks.
