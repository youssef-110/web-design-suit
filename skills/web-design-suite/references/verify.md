# Verification and reporting

Nothing ships unverified. Run this before saying a build, redesign or animation is done. Cite as `verify.md VER#`.

## VER1. Tools, in order of preference

1. **Chrome DevTools MCP** (`chrome-devtools-mcp`): `new_page`/`navigate_page`, `resize_page` or `emulate`, `take_screenshot`, `take_snapshot` (accessibility tree), `list_console_messages`, `evaluate_script`, `lighthouse_audit`, `performance_start_trace`.
2. Any other browser automation in the session (Playwright MCP, the host app's built-in browser).
3. No browser at all: say so plainly, run the static checks (VER6) and list every check below as **not run**.

Serve local files over a local server (`npx serve`, the project's dev server); avoid `file://`.

## VER2. The batched inspection round

Do these in one round, fix everything found in one batch, then confirm with at most one more round. Two rounds is the ceiling; open-ended self-QA wastes time and drifts.

Before capturing, let entrance motion settle (or reload with reduced motion emulated) so nothing hidden by animation timing is mistaken for a missing element.

| Check | How | Pass |
|---|---|---|
| Desktop | 1440 x 900 viewport, full-page screenshot from the top | Brief requirements visible; hero fits the first viewport; no overflow |
| Laptop | 1280 x 800 first viewport | Primary action still above the fold |
| Mobile | 390 x 844 (and 360 wide if the layout is tight) | Single column where intended; no horizontal scroll; text 16px+; targets 44px+ |
| Console | `list_console_messages` after load and after one interaction | Zero errors; warnings explained |
| Reduced motion | `emulate` with `prefers-reduced-motion: reduce`, reload | No spatial movement, no loops; all content visible; state changes still legible |
| Contrast | `list_console_messages` types `issue` (Low Contrast), `lighthouse_audit` accessibility, or the contrast snippet in the audit workflow of `a11y/accessibility.md` | Body 4.5:1, large text and UI 3:1 |
| Keyboard | `press_key` Tab through the page, `take_snapshot` to read focus | Visible focus on every control, logical order, no traps, skip link works |
| Horizontal overflow | `evaluate_script`: `document.documentElement.scrollWidth > innerWidth` | `false` at every width |
| Dark/light | Emulate the other color scheme if the page supports both | Composed, not inverted; contrast holds |

Optional when relevant: `lighthouse_audit` performance and the LCP workflow in `performance/web-performance.md`; touch gestures with synthesized touch (say which engine; Chromium is not Safari).

## VER3. Validate the evidence

Open every screenshot once before judging it: no blank regions, no half-loaded state, no wrong section behind a right filename. A bad capture is recaptured, not reasoned about.

## VER4. Static checks

Run the slop scan on the files you changed:

```bash
node "<plugin root>/evals/check.mjs" scan <changed files or dirs>   # plugin root = this skill folder/../..; in commands: ${CLAUDE_PLUGIN_ROOT}
```

Fix every error. Explain or fix every warning. Use `--allow <ID>` only for patterns the brief explicitly asked for (conflicts.md C0), and say so.

## VER5. The report (required format)

End every build, redesign or animation task with:

```markdown
### Decisions
- <decision> (<file> <rule id>)            e.g. "Hero min-height 100svh (conflicts.md C40)"
- <decision> (no rule: <reason>)

### Verified
- Desktop 1440: pass, screenshot <path>
- Mobile 390: pass / fixed <what>
- Console: 0 errors
- Reduced motion: pass
- Contrast: pass (lowest pair 5.1:1, <element>)
- Keyboard: pass
- Slop scan: 0 errors, 1 warning (<id>, kept because <brief reason>)

### Not verified
- <check>: <why> (for example: no browser tool in this session; real-device touch)

### Inferred, please confirm
- <assumptions made in place of missing brief fields>
```

Never write "verified" for a check that was not run. Never claim pixel-perfect, fully accessible, or production-ready without the evidence above.

## VER6. Review output (for `/web-design-suite:review`)

One table per category, findings only, worst first:

| Severity | Location | Before | After | Rule |
|---|---|---|---|---|

Severity: **High** (inaccessible, misleading, broken, unreadable, or a top-tier slop tell), **Medium** (noticeable usability or consistency problem), **Low** (polish). Add "Considered but rejected" (two to five candidates with the reason) and close with a verdict: **Block** if any High remains, **Needs changes** if only Medium or Low, **Approve** if none. List unverified checks next to the verdict.
