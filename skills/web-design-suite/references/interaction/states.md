# Interaction, states and forms

Every control in every state, forms, feedback, destructive actions and gestures. Cite as `interaction/states.md INT#`.

## States

- **INT1. Every interactive element has all its states**: default, hover (gated, `motion/principles.md` MOT11), focus-visible, active/pressed, disabled, loading, and where relevant selected, error and success. Static "happy path only" is unfinished.
- **INT2. Press feedback on pointer-down**, not on release: `:active` styles (`motion/recipes.md` REC1) or `pointerdown` handlers. Touch-action `manipulation` on controls removes tap delay.
- **INT3. Focus is always visible.** `:focus-visible` ring with at least 3:1 contrast and an offset; never `outline: none` without a replacement. Use `:focus-within` for compound controls. Sticky headers and overlays must not cover the focused element (`scroll-margin-top`, `scroll-padding-top`).
- **INT4. Disabled** controls reduce emphasis, drop press feedback and pointer events, and explain why when it is not obvious (tooltip or helper text). Prefer leaving submit enabled and validating on submit.
- **INT5. Loading** keeps the control's width stable (reserve space, swap label for spinner in place), disables repeat submission, and names the real operation ("Saving…"). Skeletons match the final layout; avoid generic centered spinners for content areas. Never fake progress.
- **INT6. Empty states** distinguish first use, no results, filtered out, no permission and failure, and always offer the next useful action.
- **INT7. Error states** say what failed, why when known, and how to recover, next to the cause. Never `window.alert()`, never a bare "Something went wrong", never a joke about lost work or money.
- **INT8. Success** confirms the completed outcome briefly; routine saves feel certain, not celebrated. The action keeps one name through the flow: a "Publish" button produces a "Published" toast.
- **INT9. Interactive states increase contrast** relative to rest; hover is never the only way to discover an action.
- **INT10. Async updates are announced**: `aria-live="polite"` for toasts and inline validation results.

## Forms

- **INT11. Visible label above every input**; placeholders are examples, never labels. Helper text under the label or input, error text below the input, associated with `aria-describedby`.
- **INT12. Correct `type`, `inputmode`, `autocomplete` and `name`** on every field (`email`, `tel`, `url`, `one-time-code`, `current-password`). `spellcheck="false"` and `autocapitalize="none"` on emails, codes and usernames. `enterkeyhint` names the return key.
- **INT13. Never block paste.** Never disable zoom to stop input zoom; set input font-size to 16px instead.
- **INT14. Validate inline on blur and again on submit**; on submit errors, move focus to the first invalid field and keep everything the user typed.
- **INT15. Submit stays enabled until the request starts**, then shows progress and prevents double submission.
- **INT16. Checkbox and radio labels share one hit target** with the control (no dead zones between them).
- **INT17. Warn before leaving with unsaved changes.** Prefill what you already know.
- **INT18. Input decorations** (icons, clear buttons, units) sit inside the field with padding, and clicking them focuses the input.
- **INT19. Autofocus** only on desktop and only for a single obvious primary input (for example a search modal); never on touch devices.

## Actions and wording on controls

- **INT20. Buttons for actions, links for navigation.** Never `<div onClick>`. Links are real `<a>` elements so Cmd/Ctrl-click and middle-click work.
- **INT21. Labels name the outcome**: "Save changes", "Delete project", "Send invite", not "Submit", "OK", "Continue". Primary CTAs one to three words and never wrapping at desktop. One label per intent across the page (no "Get started" plus "Start free").
- **INT22. Destructive actions** (conflicts.md C43): undo when recoverable (with a visible undo window); otherwise a confirmation that names the action and object on both the message and the button. A hold-to-confirm (`motion/recipes.md` REC12) suits frequent, high-risk actions.
- **INT23. URL reflects state**: filters, tabs, pagination and open panels live in query params so they deep-link and survive refresh.

## Hit areas and pointer

- **INT24. Hit areas** at least 44 x 44px on touch, 48 for primary mobile actions, 40 in dense pointer-only UI (conflicts.md C41). Extend small controls with a pseudo-element; never let two hit areas overlap.
- **INT25. Hover enhances, never enables.** Anything reachable on hover is reachable by tap and keyboard.
- **INT26. Tooltips** delay before the first one, then open instantly while moving between neighbours; never hold essential information only in a tooltip; dismiss on `Escape`.

## Gestures and drag

- **INT27. Gestures have alternatives**: every drag, swipe or pinch action also has a button and a keyboard path, unless the gesture is the content (drawing).
- **INT28. Direct manipulation**: track 1:1 with the pointer respecting the grab offset, capture the pointer, ignore extra touch points, apply resistance past boundaries, decide commit from velocity as well as distance, and clear state on cancel, lost capture and blur (`motion/recipes.md` REC13).
- **INT29. During drag** disable text selection and mark dragged items `inert` or `aria-grabbed` equivalents where appropriate.

## Keyboard and feedback channels

- **INT30. Keyboard-triggered actions get no animation** (`motion/principles.md` MOT1) and respond instantly.
- **INT31. Feedback has four kinds**: status (ongoing), completion, warning (before a problem), error. Motion is never the only channel; pair it with text, color or an icon.
- **INT32. Copy-to-clipboard, toggles and similar micro-actions** confirm in place (label morph "Copy" to "Copied", icon swap) rather than opening a toast.
