# GSAP

Use GSAP for timelines, scroll-scrubbed or pinned sequences, SVG and text splitting (conflicts.md C36). Condensed from the official GSAP skills. Cite as `motion/gsap.md GSP#`.

## Setup

- **GSP1. Install from npm**: `npm install gsap` (and `@gsap/react` for React). Every plugin, including SplitText, ScrollSmoother, MorphSVG, DrawSVG, Flip, is in the public `gsap` package. Never add a private registry, `.npmrc` token, or a "Club GSAP" step.
- **GSP2. Register plugins once** at app level before use: `gsap.registerPlugin(ScrollTrigger, useGSAP)`. Not inside a component body that re-renders.
- **GSP3. Client only.** Never run gsap or ScrollTrigger during SSR.

## Tweens

- **GSP4.** `gsap.to` (to a state), `gsap.from` (from a state, good for entrances), `gsap.fromTo` (explicit both), `gsap.set` (instant). camelCase properties.
- **GSP5. Transform aliases** over raw transform strings: `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `transformOrigin`. They are GPU transforms; Motion's `x`/`y` caveat does not apply to GSAP (conflicts.md C38).
- **GSP6. `autoAlpha` over `opacity`** for fades to and from zero (sets `visibility: hidden` at 0 so invisible elements stop blocking clicks).
- **GSP7. Eases**: `power2.out`/`power3.out` or `expo.out` for entrances, `power2.inOut` for movement, `none` for scrubbed scroll. No `bounce`/`elastic`/`back` by default (conflicts.md C32). For the project's cubic-bezier tokens use CustomEase: `CustomEase.create("ui-out", "0.23,1,0.32,1")`.
- **GSP8. Stagger**: `stagger: 0.06` or `{ each: 0.06, from: "start" }`; keep totals within conflicts.md C33.
- **GSP9. Stacked `from()`/`fromTo()` on the same property**: set `immediateRender: false` on the later tweens.
- **GSP10. `clearProps`** when CSS should take over after the animation.

## Timelines

- **GSP11. Sequence with a timeline**, not chained `delay`s. Position parameter: `"<"` (with previous), `">"` (after), `"-=0.2"`, `"+=0.3"`, labels via `addLabel`. Pass shared `defaults: { duration: 0.6, ease: "power3.out" }`.
- **GSP12. Store the instance** when you need pause, reverse, seek or kill.

## ScrollTrigger

- **GSP13. Put the ScrollTrigger on the timeline or a top-level tween**, never on a tween nested inside a timeline.
- **GSP14. `scrub` or `toggleActions`, never both.** `scrub: true` (or a small number like `1` for smoothing) maps progress 1:1 to scroll; use it for sequences (conflicts.md C24).
- **GSP15. Pinning**: `start: "top top"`, `pin: true`, `end: "+=<distance>"`. Animate children of the pinned element, not the pinned element itself. Keep `pinSpacing` unless layout is handled elsewhere.
- **GSP16. Horizontal pan**: pin a wrapper, tween the inner track's `x` to `-(track.scrollWidth - innerWidth)` with `ease: "none"`, `end: () => "+=" + distance`, `invalidateOnRefresh: true`. Elements reacting to the horizontal movement use `containerAnimation` (no pinning or snapping on those).
- **GSP17. Sticky stack**: each card except the last pins at `top top` until the last card arrives; the previous card scales or dims, driven by the next card's trigger with `scrub`.
- **GSP18. Reveals in bulk**: `ScrollTrigger.batch(".item", { onEnter: els => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.06 }), once: true })`.
- **GSP19. `ScrollTrigger.refresh()`** after layout changes (images, fonts, injected content), debounced; viewport resize is automatic. Create triggers top to bottom or set `refreshPriority`.
- **GSP20. `markers: true` only in development.**

## React

- **GSP21. `useGSAP()` from `@gsap/react`** (conflicts.md C37):
  ```tsx
  "use client";
  import { useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { useGSAP } from "@gsap/react";
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  export function Pinned({ children }: { children: React.ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    useGSAP(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=1200", scrub: 1, pin: true } })
          .from(".step", { autoAlpha: 0, y: 24, stagger: 0.2, ease: "none" });
      });
    }, { scope: root });
    return <section ref={root}>{children}</section>;
  }
  ```
- **GSP22. Always pass `scope`** so selectors stay inside the component. Wrap callbacks created later (event handlers) in `contextSafe`. Cleanup and ScrollTrigger kill are automatic.
- **GSP23. Without `@gsap/react`**: `const ctx = gsap.context(() => {...}, ref); return () => ctx.revert();` inside `useEffect`.
- **GSP24. Vue and Svelte**: create in `onMounted`/`onMount` with `gsap.context(fn, rootEl)`, call `ctx.revert()` on unmount.

## Accessibility and responsive

- **GSP25. `gsap.matchMedia()`** for breakpoints and reduced motion; animations created inside a condition revert automatically when it stops matching. Do not nest `gsap.context()` inside it. Under reduced motion drop movement and scrubbing but keep content visible and short fades (conflicts.md C26), rather than `duration: 0` on everything.

## Text

- **GSP26. SplitText** after `await document.fonts.ready`; split only as deep as needed (`lines` is cheapest, `chars` heaviest); mask lines with an overflow-hidden wrapper; `revert()` the split when done or on unmount; keep the original text accessible (SplitText sets `aria-label`; verify).

## Performance

- **GSP27.** Animate transforms and opacity; `gsap.quickTo()` for values updated on every pointer move; stagger instead of many tweens; pause or kill offscreen work; test pins and scrubs on a mid-range phone. Use Flip (`Flip.getState()`, change DOM, `Flip.from()`) for layout transitions instead of animating width/height. GSDevTools never ships to production.
