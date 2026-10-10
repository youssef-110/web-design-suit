---
description: Make a web page or app feel native on phones. Applies the mobile baseline, fixes touch, viewport, input and safe-area issues, and checks the narrow layout.
argument-hint: <page, route or component> [audit]
---

Use the **web-design-suite** skill. Mobile target: $ARGUMENTS

Load `references/mobile/mobile-web.md`, `references/layout/responsive.md` and `references/interaction/states.md`.

1. **Recon.** Find the viewport meta, `theme-color`, global CSS, hover rules, input styles, full-height sections, fixed and bottom-pinned elements, sheets, carousels and custom gestures.
2. **Match symptoms** to MOB1-MOB12. For each finding record file:line, the symptom, and the one-line reason. If the argument includes `audit`, report that table and stop.
3. **Apply the baseline** (meta tags and global CSS block at the top of `mobile-web.md`), adjusted to the themes the page actually ships. Never disable zoom (MOB4).
4. **Fix** each finding with the smallest change: hover gating, tap highlight, `svh`/`dvh`, 16px inputs, `touch-action`, overscroll per surface type, safe-area padding, control-only `user-select`, carousel axes, keyboard types (`inputmode`, `enterkeyhint`).
5. **Layout pass** at 390 and 360 wide: single-column collapse where intended (RSP3), no horizontal scroll (RSP7), targets 44px and primary actions 48px (MOB14), primary actions within thumb reach (MOB13), sheets with drag, resistance and safe-area padding (MOB16).
6. **Verify** in a browser at 390 x 844 with touch emulation (Chrome DevTools MCP `emulate`): screenshots, console, overflow check, reduced motion. Run:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/evals/check.mjs" scan <changed files>
   ```
7. **Report**: what was wrong (symptom and why), what changed (file and declaration), and a clear list of what needs a real phone to confirm (sticky hover, tap highlight, URL-bar height, input zoom, overscroll, safe areas, keyboard), with steps to test over LAN.
