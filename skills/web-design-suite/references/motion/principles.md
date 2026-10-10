# Motion principles

When to animate, with what, and how it should feel. Recipes live in `motion/recipes.md`, GSAP in `motion/gsap.md`, Motion and View Transitions in `motion/react-motion.md`. Cite as `motion/principles.md MOT#`.

## The decision sequence (run in order)

- **MOT1. Should it animate at all? Frequency decides.**

  | How often the user sees it | Decision |
  |---|---|
  | 100+ times a day, or keyboard-initiated (shortcuts, command palette, focus jumps) | No animation. Ever. |
  | Tens of times a day (hover, list navigation, frequent toggles) | Near-imperceptible: 150ms or less, opacity or color only |
  | Occasionally (modals, drawers, toasts, menus) | Standard animation |
  | Rarely (first run, success, empty state, celebration) | The delight budget lives here |

  "This should not animate" is a valid, complete answer.

- **MOT2. Name the purpose in one word**: feedback, spatial consistency, state indication, preventing a jarring change, explanation (marketing and onboarding only), or delight (rare tier only). Cannot name it: do not build it. Data the user is reading or acting on does not move for style.

- **MOT3. Pick the cheapest tool that works** (conflicts.md C36):

  | Need | Tool |
  |---|---|
  | Hover, press, color, a class-driven state toggle | CSS transition |
  | Entry on mount without JS state | `@starting-style` |
  | Predetermined motion that must stay smooth while the page loads | CSS animation (off the main thread) |
  | Programmatic control, no library | WAAPI `element.animate()` |
  | React springs, layout, exit or gesture-driven values | Motion (`motion/react`) |
  | Timelines, scroll scrub and pin, SVG morph and draw, text splitting | GSAP |

  Never Motion and GSAP in the same component tree. Never add a dependency for a fade. Toasts, drawers, menus and dropdowns are components first: use a headless library (Radix, Base UI, Vaul, Sonner) rather than hand-rolling focus management.

- **MOT4. Properties**: transform and opacity by default. clip-path, mask and small blur (8px or less in motion, never over 20px) on small isolated elements when verified smooth. Never width, height, top, left, margin or padding; accordion height is the one tolerated exception (conflicts.md C27). Never `transition: all`; name properties.

- **MOT5. Easing** (conflicts.md C28). Tokens, reused across the project:
  ```css
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entering, exiting, most UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* moving or morphing on screen */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* sheets and drawers */
  ```
  Entering or exiting: ease-out. Moving on screen: ease-in-out. Hover and color: `ease`. Constant motion and progress fills: linear. Never ease-in on UI; it delays the moment the user is watching. No bounce or elastic curves (conflicts.md C32). Extend existing project tokens instead of adding a parallel set.

- **MOT6. Duration** (conflicts.md C29):

  | Element | Duration |
  |---|---|
  | Press feedback | 100 to 160ms |
  | Tooltip, small popover | 125 to 200ms |
  | Dropdown, select, menu | 150 to 250ms |
  | Modal, drawer, sheet | 200 to 500ms |
  | One authored marketing focal sequence | 500 to 800ms |

  UI stays under 300ms. Exits are faster than entrances (about 20 to 40 percent). Longer travel earns slightly longer duration. If motion feels late, shorten it before adding delay. Never delay a close.

- **MOT7. Springs** for drag with momentum, gesture-interruptible motion and things that should feel alive. Default `{ type: "spring", duration: 0.4, bounce: 0 }`; bounce 0.1 to 0.2 only after a gesture that carried momentum (conflicts.md C31).

- **MOT8. Interruption.** Anything a user can trigger twice in a second (toasts, toggles, open/close) uses transitions or springs, which retarget from the current value; keyframes restart from zero and are for one-shot sequences. Never lock input during a transition. Exit along the same path as the entrance.

- **MOT9. Origin and physicality.** Popovers, menus and tooltips scale from their trigger (`transform-origin` at the trigger; Base UI exposes `var(--transform-origin)`); modals stay centered. Never enter from `scale(0)`: start at 0.95 to 0.97 with opacity 0. Bigger surfaces start from further away (modal about 0.96), small hints barely scale (0.98).

- **MOT10. Reduced motion ships with the animation** (conflicts.md C26). Under `prefers-reduced-motion: reduce`: remove movement, parallax, loops, autoplay and scroll-linked effects; keep short opacity and color transitions that communicate state. Content is fully visible either way.

- **MOT11. Hover motion is gated**: `@media (hover: hover) and (pointer: fine)`. Touch fires false hovers that stick.

## Choreography

- **MOT12. One authored moment per page** beats scattered effects. Name it before building: the focal sequence (from this product, not a generic fade-and-rise), the continuity transitions, the feedback, and the budget. A page-wide identical entrance on every section is out (anti-slop.md SL32; conflicts.md C24).
- **MOT13. Content is visible by default.** Animation enhances an already-visible page; a failed script must never leave content at `opacity: 0`.
- **MOT14. Stagger** only for a one-off entrance of a real list or semantic chunks: 40 to 80ms per item, total at most 400ms, never blocking interaction (conflicts.md C33). Never re-stagger on every scroll-by.
- **MOT15. Scroll-linked motion** only when the scroll relationship carries meaning (a real sequence, a process, a product reveal) and MOTION is 7 or higher; scrubbed 1:1, never altering scroll speed or direction. Scroll reveals fire once. No smooth-scroll inertia libraries (conflicts.md C25).
- **MOT16. No ambient loops by default** (conflicts.md C34, C35): no pulsing dots, typewriter headlines, blinking cursors or auto-scrolling marquees unless they show genuinely live state or the brief asks; loops pause offscreen and when the tab is hidden, and stop under reduced motion. Autoplay over 5 seconds next to other content needs a pause control.
- **MOT17. Match the motion to the personality.** A dashboard is crisp and fast; a consumer moment can be softer; motion is never the only feedback channel (pair it with a static cue: color, icon, label).
- **MOT18. Asymmetric timing where the user decides**: slow on the deliberate phase (hold-to-confirm, 2s linear), snappy on the system's response (release, 200ms ease-out).
- **MOT19. Skip enter animations on first paint** for elements that start in their default state (`AnimatePresence initial={false}`, or CSS transitions that only run on change).

## Performance

- **MOT20. Never animate from scroll listeners or React state per frame.** Use IntersectionObserver, ScrollTrigger, CSS scroll-driven animation, or motion values.
- **MOT21. Update the transform of the moving element directly**; changing a CSS variable on a parent recalculates styles for every child.
- **MOT22. `will-change` only on observed first-frame stutter**, only for transform, opacity or filter, removed afterwards (conflicts.md C39). Animate an SVG's wrapper `<div>`, not the `<svg>` itself; for SVG children set `transform-box: fill-box`.
- **MOT23. Bound expensive effects** (blur, filter, shadow, canvas, shaders) to small isolated regions and measure on a mid-range phone, not only a desktop.

## Verify

Play every animation at 10 percent speed (DevTools Animations panel) and check origin, sync between properties, and whether two states overlap visibly (mask a stubborn crossfade with 2px blur). Trigger each interaction twice quickly to test interruption. Emulate reduced motion and confirm nothing moves spatially and nothing is hidden. Review again with fresh eyes. For gestures, test on a real device or say it was not tested.
