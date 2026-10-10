# Motion (React) and View Transitions

For React UI state, layout, exit and gesture animation (Motion) and navigation continuity (React `<ViewTransition>`). Cite as `motion/react-motion.md RMO#`.

## Motion (`motion/react`)

- **RMO1. Import from `motion/react`** when the `motion` package is installed; use `framer-motion` only where the project already depends on it. Check `package.json` before importing; never mix both.
- **RMO2. Isolate motion in client leaf components** (`"use client"` in Next.js). Server components render static structure.
- **RMO3. Never drive continuous values through React state** (pointer position, scroll progress, magnetic hover). Use `useMotionValue`, `useTransform`, `useSpring`, `useScroll`; they update outside the render cycle.
- **RMO4. Under load, use the full transform string**: `animate={{ transform: "translateY(0px)" }}` rather than `y`, for motion that runs during page load or route change (conflicts.md C38).
- **RMO5. Springs**: `transition={{ type: "spring", duration: 0.4, bounce: 0 }}` by default; bounce up to 0.2 only after momentum (conflicts.md C31).
- **RMO6. Exits** need `AnimatePresence` with stable `key`s. Use `initial={false}` to skip entrance on first render for elements that start in their default state; not on a deliberate page-load sequence.
- **RMO7. Layout animation** (`layout`, `layoutId`) only for real reorder, expand or shared-element moments; do not sprinkle `layout` on static content (it measures every render).
- **RMO8. Reduced motion**: `const reduce = useReducedMotion();` then drop movement (`y`, `x`, `scale`) and keep opacity: `initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}`. Or wrap the app in `<MotionConfig reducedMotion="user">`.
- **RMO9. In-view reveals**: `whileInView` with `viewport={{ once: true, amount: 0.3 }}`; marketing surfaces only, within conflicts.md C24.
- **RMO10. Stagger** via parent `variants` with `staggerChildren` (parent and children in the same client tree), within conflicts.md C33.
- **RMO11. Gestures**: `drag` with `dragConstraints`, `dragElastic` around 0.1 to 0.2 for rubber-banding, `onDragEnd` reading `info.velocity` to decide dismissal; `whileTap={{ scale: 0.97 }}` for press.

## View Transitions (React `<ViewTransition>`)

- **RMO12. Availability**: in Next.js App Router it works without installing canary React. Elsewhere it needs `react@canary`. Browsers without support skip the animation gracefully.
- **RMO13. Every boundary communicates something.** Implement in this order where the app has a use: shared element (same thing, going deeper), Suspense reveal (data loaded), list identity (same items, new order), enter/exit (appeared, disappeared), route change (new place).
- **RMO14. Only `startTransition`, `useDeferredValue` and Suspense trigger them**; plain `setState` does not. Never call `document.startViewTransition` yourself under React.
- **RMO15. Placement**: `<ViewTransition>` must come before any DOM node for enter/exit to fire; a wrapping `<div>` suppresses them.
- **RMO16. Shared elements**: the same unique `name` (`photo-${id}`) on the outgoing and incoming element; only one mounted at a time. `share` wins over enter/exit. Never fade-out the old page when a shared morph is in play; use a directional slide.
- **RMO17. Directional slides only for hierarchy or ordered sequences**, keyed with `addTransitionType("nav-forward" | "nav-back")`; lateral moves (tabs) cross-fade or use `default="none"`; background revalidation uses `default="none"`. Browser back carries no type, so typed slides fall back to `default`.
- **RMO18. Lists**: a keyed `<ViewTransition>` per item, no wrapper `<div>` between list and boundary; nest a named boundary inside for a shared element.
- **RMO19. Style with the pseudo-elements** (`::view-transition-old(.cls)`, `::view-transition-new(.cls)`, `::view-transition-group(.cls)`) using the motion tokens, and disable movement under `prefers-reduced-motion`.

## Plain-CSS view transitions (non-React or MPA)

- **RMO20.** Same-document: `document.startViewTransition(() => updateDOM())`. Cross-document: `@view-transition { navigation: auto; }` in both pages. Give persistent elements a `view-transition-name`. Keep durations within `motion/principles.md` MOT6 and provide a reduced-motion override.
