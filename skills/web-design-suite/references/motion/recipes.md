# Motion recipes

Ready implementations for the common cases, using the tokens from `motion/principles.md` MOT5. Start from a recipe rather than a blank file. Cite as `motion/recipes.md REC#`.

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

## REC1. Button press

```css
.button { transition: transform 160ms var(--ease-out); }
.button:active:not(:disabled) { transform: scale(0.97); }
```
`scale()` scales the label and icon too, which is what reads as a press. Offer a `static` variant for buttons where motion distracts (conflicts.md C30).

## REC2. Hover lift (gated)

```css
.card { box-shadow: var(--shadow-border); transition: box-shadow 150ms var(--ease-out); }
@media (hover: hover) and (pointer: fine) {
  .card:hover { box-shadow: var(--shadow-border-hover); }
}
```

## REC3. Dropdown, popover, menu

```css
.popover {
  transform-origin: var(--transform-origin, top left);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.popover[data-starting-style], .popover[data-ending-style] { opacity: 0; transform: scale(0.97); }
```
Close faster than open (about 150ms). Without a library, use `@starting-style` (REC8) and set `transform-origin` from the trigger's position.

## REC4. Tooltip

```css
.tooltip { transform-origin: var(--transform-origin); transition: transform 125ms var(--ease-out), opacity 125ms var(--ease-out); }
.tooltip[data-starting-style], .tooltip[data-ending-style] { opacity: 0; transform: scale(0.98); }
.tooltip[data-instant] { transition-duration: 0ms; }
```
Delay the first tooltip (about 400 to 600ms) to avoid accidental triggers; once one is open, neighbours open instantly with no animation.

## REC5. Modal

```css
.modal { transform-origin: center; transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out); }
.modal[data-starting-style], .modal[data-ending-style] { opacity: 0; transform: scale(0.96); }
.backdrop { transition: opacity 250ms var(--ease-out); }
```
Use `<dialog>` or a headless dialog for focus trapping and `Escape`. Content inside uses `overscroll-behavior: contain`.

## REC6. Drawer or bottom sheet

```css
.drawer { transform: translateY(0); transition: transform 450ms var(--ease-drawer); }
.drawer[data-closed] { transform: translateY(100%); }
```
Percent translate moves by the element's own height whatever its content. Add drag via REC13. Pad the bottom with `env(safe-area-inset-bottom)`.

## REC7. Toast

```css
.toast {
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```
Toasts tolerate slightly slower, softer motion than UI controls. Exit through the same edge. In React prefer Sonner (`components/patterns.md` CMP7). Announce with `aria-live="polite"`. Pause timers while the tab is hidden.

## REC8. Enter on mount without JS

```css
.panel {
  opacity: 1; transform: translateY(0);
  transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out), display 250ms allow-discrete;
  @starting-style { opacity: 0; transform: translateY(8px); }
}
.panel[hidden] { display: none; opacity: 0; transform: translateY(8px); }
```
Fallback where `@starting-style` is unsupported: render, then set `data-mounted` on the next frame.

## REC9. Accordion

```css
.accordion-content { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 220ms var(--ease-out); }
.accordion[data-open] .accordion-content { grid-template-rows: 1fr; }
.accordion-content > div { overflow: hidden; }
```
The grid-rows technique avoids measuring height. Rotate the chevron with transform. Use `<details>`/`<summary>` or a headless accordion for semantics.

## REC10. Staggered entrance (one-off)

```css
.item { opacity: 0; transform: translateY(8px); animation: rise 300ms var(--ease-out) forwards; animation-delay: calc(var(--i) * 60ms); }
@keyframes rise { to { opacity: 1; transform: translateY(0); } }
```
Set `--i` per item, cap the total (about 400ms), never block interaction. Under reduced motion set `animation: fade 150ms ease forwards` without the translate.

## REC11. Icon swap

Keep both icons in the DOM, one absolutely positioned, and cross-fade:
```css
.icon { transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1), scale 250ms cubic-bezier(0.2, 0, 0, 1), filter 250ms cubic-bezier(0.2, 0, 0, 1); }
.icon[data-hidden] { opacity: 0; scale: 0.25; filter: blur(4px); }
```
With Motion: `initial/exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}`, `transition={{ type: "spring", duration: 0.3, bounce: 0 }}`, inside `AnimatePresence mode="popLayout" initial={false}`.

## REC12. Hold to confirm (destructive)

```css
.hold .fill { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); }
.hold:active .fill { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
.hold:active { transform: scale(0.97); }
```
Commit on `animationend`/timer, not on release. Provide a keyboard path (hold Enter or a confirm step).

## REC13. Drag to dismiss

- Pointer Events with `setPointerCapture`; track position 1:1 respecting the grab offset; ignore extra pointers once dragging (`if (dragging) return`).
- Set `element.style.transform` directly, not a CSS variable on the parent.
- Dismiss when distance passes the threshold **or** velocity exceeds about 0.11 px/ms (`Math.abs(distance) / elapsedMs`).
- Past a boundary apply resistance: `(overshoot * dimension * 0.55) / (dimension + 0.55 * Math.abs(overshoot))`.
- Release into a spring carrying the pointer's velocity; choose the snap point from projected momentum: `current + (velocity / 1000) * 0.998 / (1 - 0.998)`.
- Clear drag state on `pointercancel`, `lostpointercapture` and window `blur`. Offer a button or keyboard alternative.

## REC14. Tab indicator

Animate a single indicator element's `transform` (translate and scaleX from the active tab's measured box) with 250ms `var(--ease-in-out)`. For perfect text color changes, duplicate the tab list as an "active" layer and animate its `clip-path: inset(...)` to the active tab.

## REC15. Scroll reveal (marketing only, once)

```css
.reveal { clip-path: inset(0 0 100% 0); transition: clip-path 600ms var(--ease-in-out); }
.reveal[data-visible] { clip-path: inset(0 0 0 0); }
@media (prefers-reduced-motion: reduce) { .reveal { clip-path: none; transition: none; } }
```
Set `data-visible` from an IntersectionObserver (`rootMargin: "0px 0px -10% 0px"`, unobserve after firing). Use for the one or two moments that earn it, not every section (conflicts.md C24). Ensure the content is visible if JS fails (add the hidden state only after JS runs, e.g. a `js` class on `<html>`).

## REC16. Masking a crossfade

When two states visibly overlap mid-transition, add `filter: blur(2px)` and slightly reduced opacity during the swap (200ms ease). Keep blur small.

## REC17. Number change

`font-variant-numeric: tabular-nums` always. For a highlighted change, swap the old and new value with a 4 to 8px translate and opacity (150 to 250ms ease-out). Never animate digits on a value the user is actively editing.

## REC18. Reduced-motion block

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; }
  .motion-move { transform: none !important; animation: none !important; }
}
```
Prefer per-component reduced variants (keeping short opacity fades) over a global kill switch that erases feedback (conflicts.md C26).
