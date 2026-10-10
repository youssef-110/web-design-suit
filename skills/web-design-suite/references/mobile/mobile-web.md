# Mobile web

Making a web page or web app feel native on a phone. Layout adaptation is in `layout/responsive.md`; this file is the platform layer. Cite as `mobile/mobile-web.md MOB#`.

## Baseline (ship before the first component)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />
<meta name="theme-color" media="(prefers-color-scheme: light)" content="<top-of-page light color>" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="<top-of-page dark color>" />
<meta name="color-scheme" content="light dark" />
```
```css
html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; }
input, textarea, select { font-size: 16px; }
button, a, [role="button"] { touch-action: manipulation; }
button, [role="button"], .chip, .tab { -webkit-user-select: none; user-select: none; }
@media (hover: hover) and (pointer: fine) { /* every :hover rule lives here */ }
```
Use only the `theme-color` and `color-scheme` lines that match the themes the page actually ships.

## Fixes by symptom

- **MOB1. Hover stuck after tap**: gate all hover styles behind `(hover: hover) and (pointer: fine)`; give touch press feedback through `:active`. (Tailwind v4's `hover:` already compiles to a hover media query.)
- **MOB2. Gray flash on tap**: `-webkit-tap-highlight-color: transparent` once on `html`, then make sure every control has its own `:active` state.
- **MOB3. Wrong height**: `100svh` for heroes, `100dvh` for app shells and bottom-pinned UI, never `100vh` (conflicts.md C40).
- **MOB4. Page zooms into inputs**: inputs at 16px or larger (under `(pointer: coarse)` if desktop needs smaller). Never `user-scalable=no` or `maximum-scale=1`.
- **MOB5. Laggy taps**: `touch-action: manipulation` on controls and feedback on press, not on click.
- **MOB6. Pull-to-refresh or rubber-band fighting the app**: app shells set `overscroll-behavior: none` on the root; documents keep the default; sheets, modals, chat lists and sidebars use `overscroll-behavior: contain` (conflicts.md C42). Never `touchmove` + `preventDefault`.
- **MOB7. Content under the notch**: `viewport-fit=cover` plus `env(safe-area-inset-*)` padding on fixed headers, bottom bars, toasts and sheets (`padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))`). Without the meta tag the env values are 0.
- **MOB8. Long-press selects button text**: `user-select: none` and `-webkit-touch-callout: none` on controls only. Never on `body`; content stays selectable.
- **MOB9. Carousel fights vertical scroll**: prefer native `scroll-snap-type: x mandatory` with `scroll-snap-align: start`; for JS gestures set `touch-action: pan-y` on horizontal surfaces, `none` only on elements that truly own every axis.
- **MOB10. Status bar color mismatched**: `theme-color` per scheme matching the top of the page; update it from JS when the app toggles theme by class.
- **MOB11. Keyboard covers inputs**: `interactive-widget=resizes-content`, bottom-pinned inputs inside a `100dvh` shell, `scrollIntoView({ block: "nearest" })` on focus where needed.
- **MOB12. Wrong keyboard**: `inputmode` (`numeric`, `decimal`, `email`, `tel`, `search`), `type`, `autocomplete`, `autocapitalize="none"`, `autocorrect="off"`, `enterkeyhint` (`send`, `search`, `done`).

## Phone-first patterns

- **MOB13. Thumb reach**: primary actions in the lower half; bottom navigation or a bottom sheet over top dropdowns for frequent actions.
- **MOB14. Targets** 44px minimum, 48px for primary actions, spaced so neighbours are not hit (conflicts.md C41).
- **MOB15. Content priority**: shorter copy, progressive disclosure, no hidden core functionality on mobile; same information architecture as desktop.
- **MOB16. Sheets and drawers** follow `motion/recipes.md` REC6 and REC13: drag with velocity-based dismissal, resistance at edges, safe-area padding, `contain` overscroll.
- **MOB17. Performance on real phones**: test on a mid-range or older device; heavy blur, large shadows and many simultaneous animations drop frames there first.
- **MOB18. PWA**: standalone mode changes viewport, safe areas and status bar; set manifest `theme_color`/`background_color` consistently with the meta tags.

## Verify

Emulation (DevTools device mode, 390 x 844) catches layout only. Sticky hover, tap highlight, URL-bar height changes, input zoom, overscroll, safe areas and the software keyboard need real hardware: run the dev server on `0.0.0.0`, open it by LAN IP, inspect with Safari Web Inspector or `chrome://inspect`. Report which fixes were verified from code or emulation and which need a phone.
