# Brief intake

Use this before designing anything. The goal is to ask for what is missing instead of guessing, in one short round. Cite as `brief-template.md BRF#`.

## BRF1. The template

Fill every field from the user's message, the repo and any references first. Mark each field **given**, **inferred** (say from what) or **missing**.

```markdown
## Brief
- Task type: landing | dashboard | portfolio | app-ui | redesign | animation | mobile | docs | brand
- Visitor mode: Persuade | Operate | Read | Experience
- Audience: who arrives, in what situation, knowing what
- Goal: the one thing they must understand or do; what success looks like
- Brand: name, existing logo/colors/type/voice, anything pinned by the user
- Content and proof: real copy, data, images, customers, numbers on hand (and what must not be invented)
- Constraints: stack, framework, design system, deadline, accessibility standard, browsers, performance budget, i18n
- References: links, screenshots, products to sit alongside, things it must not look like
- Must stay untouched: (redesigns) URLs, nav labels, form fields, legal copy, analytics IDs
- Dials: VARIANCE _/10, MOTION _/10, DENSITY _/10 (with one-line reason)
- Design read: "Reading this as <page kind> for <audience>, with a <vibe> language, leaning toward <system or world>."
```

## BRF2. When to ask

- Ask only for fields marked **missing** that would change the result: audience, goal, brand assets, real content, stack, what must stay untouched.
- One round, two or three questions, using the structured question tool when available. Assert your best inference and invite correction rather than presenting a blank form.
- Never ask for CSS values, hex codes, or a choice between canned aesthetic lanes. Never ask what the user already said.
- A precise brief needs only the one-line design read as confirmation. If no one can answer (unattended run), proceed on labeled inferences and list them in the final report.

## BRF3. Classify the task

| Task type | Typical signals | Visitor mode |
|---|---|---|
| landing | marketing site, product page, launch, pricing, waitlist | Persuade |
| dashboard | metrics, tables, filters, admin, analytics | Operate |
| portfolio | personal site, case studies, gallery, studio | Experience |
| app-ui | settings, forms, onboarding, editor, CRUD screens | Operate |
| redesign | "make this better", existing URL or codebase | the mode of the surface being redesigned |
| animation | "animate", "add motion", "feels static", transitions | the mode of the host surface |
| mobile | phone-first, PWA, "feels wrong on my phone" | the mode of the surface |
| docs | documentation, guide, changelog, blog post | Read |
| brand | identity, logo, brand board, style guide page | Experience |

The mode comes from the surface, not the product: a dev tool's landing page is Persuade, a fashion brand's docs are Read.

## BRF4. Mode meanings

- **Persuade**: the visitor decides and acts. The opening makes the offer clear and desirable, exposes a working primary action, and shows something only this product can prove. Design may carry the voice.
- **Operate**: the visitor completes a task. Scanability, consistency and native expectations beat expression. The visual world lends type, palette, density and one signature move; never the layout model or the controls.
- **Read**: the visitor understands something. The world owns the frame (masthead, rail, openers); the reading column stays calm at 60 to 75 characters.
- **Experience**: the visitor is inside the work. Let the artifact lead from the first viewport; the interface recedes.

## BRF5. Dial presets

| Use case | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| SaaS landing | 7 | 5 | 4 |
| Agency or creative landing | 9 | 7 | 3 |
| Premium consumer landing | 7 | 5 | 3 |
| Designer portfolio | 8 | 6 | 3 |
| Developer portfolio | 6 | 4 | 4 |
| Editorial, blog, docs | 5 | 3 | 4 |
| Dashboard, admin | 3 | 2 | 7 |
| App UI, forms, settings | 3 | 3 | 5 |
| Public sector, regulated, accessibility-first | 3 | 2 | 5 |
| Redesign, preserve | match existing | +1 | match |
| Redesign, overhaul | +2 | +2 | match |

Vibe words shift them: "minimal, calm, Linear-like" lowers VARIANCE and MOTION; "playful, Awwwards, experimental" raises both; "trust-first, kids, regulated" caps VARIANCE at 4 and MOTION at 3. Quiet constraints (accessibility needs, public sector, regulated industries) override taste.

Dial meanings: VARIANCE 1-3 symmetric grids, 4-7 offsets and mixed aspect ratios, 8-10 asymmetric, broken grids. MOTION 1-3 hover and press only, 4-6 state transitions plus one authored moment, 7-10 scroll-linked sequences allowed (conflicts.md C24). DENSITY 1-3 gallery-airy, 4-6 standard, 7-10 cockpit (no card boxes, tabular numbers).

## BRF6. Recording the decision

Write the filled brief and the design read at the top of your first reply (or into `DESIGN-BRIEF.md` for multi-session work). Every later decision cites a rule from the reference files; when a decision has no rule behind it, say so and give the reason.
