---
description: Turn a rough request into a confirmed design brief (audience, goal, brand, constraints, references) before any code.
argument-hint: <what you want built or changed>
---

Use the **web-design-suite** skill. Request: $ARGUMENTS

Produce a confirmed brief. Do not write code in this command.

1. Read the request, the current repo (stack, `package.json`, existing tokens, fonts, icons, components, copy) and any linked references or screenshots.
2. Load `references/brief-template.md` from the web-design-suite skill and fill BRF1. Mark every field **given**, **inferred (from what)** or **missing**.
3. Classify task type and visitor mode (BRF3, BRF4) and set dials (BRF5) with a one-line reason each.
4. If any missing field would change the result, ask **one round of two or three questions** with the structured question tool when available (BRF2). Lead with your best inference so the user can just confirm. Never ask for CSS values or offer aesthetic menus.
5. After answers (or immediately, if nothing material is missing), output:
   - the completed brief block,
   - the one-line design read,
   - the reference files the build will load (SKILL.md section 2),
   - open decisions the builder must not invent (real prices, customer names, claims).
6. Offer to save it as `DESIGN-BRIEF.md` at the project root for multi-session work, and save it if the user agrees.

Stop after the brief. Suggest `/web-design-suite:build` (new surface) or `/web-design-suite:redesign` (existing one) as the next step.
