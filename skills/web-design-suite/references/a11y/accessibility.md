# Accessibility

The floor every surface ships on, plus a Chrome DevTools audit workflow. Target WCAG 2.2 AA. Cite as `a11y/accessibility.md A11Y#`.

## Structure and semantics

- **A11Y1. Semantic HTML before ARIA**: `<header> <nav> <main> <section> <article> <aside> <footer>`, `<button>` for actions, `<a href>` for navigation, `<label>`, `<table>` for tabular data, `<dialog>` or a headless dialog for modals.
- **A11Y2. `lang` on `<html>`, a unique `<title>` per page**, a skip link to `<main>` as the first focusable element.
- **A11Y3. One `<h1>`, headings in order** with no skipped levels; headings describe content. `scroll-margin-top` on anchored headings below a sticky header.
- **A11Y4. DOM order matches visual order.** CSS reordering (grid placement, `order`, absolute positioning) must not scramble reading or tab order.

## Names and alternatives

- **A11Y5. Every control has an accessible name** that matches its visible label. Icon-only buttons get `aria-label`; decorative icons and images are hidden (`aria-hidden="true"`, `alt=""`).
- **A11Y6. Alt text conveys the image's information**, not "image of". Complex graphics get a text alternative nearby. Meaningful video gets captions; audio gets a transcript.
- **A11Y7. Form inputs have associated labels**; errors and hints are linked with `aria-describedby`; required fields are marked in text, not only by color or an asterisk.
- **A11Y8. Dynamic changes are announced**: `aria-live="polite"` for toasts and validation, `role="alert"` only for urgent errors. Expanded state on disclosures (`aria-expanded`), current page in nav (`aria-current="page"`).

## Keyboard and focus

- **A11Y9. Everything works by keyboard**: Tab order is logical, no traps, `Escape` closes overlays, arrow keys inside composite widgets (tabs, menus, listboxes) per ARIA patterns.
- **A11Y10. Visible focus** on every focusable element (`interaction/states.md` INT3).
- **A11Y11. Modals move focus in, trap it, and return it** to the trigger on close; background content is `inert`.

## Perception

- **A11Y12. Contrast** (`color/color-system.md` COL13): 4.5:1 body, 3:1 large text and UI components, in every state and theme. Color never carries meaning alone.
- **A11Y13. Text resizes to 200 percent** without loss; zoom is never disabled; sizes in `rem`.
- **A11Y14. Targets**: 44 x 44px on touch (conflicts.md C41) with spacing so neighbours are not hit by accident.
- **A11Y15. Motion**: `prefers-reduced-motion` honored (conflicts.md C26); no flashing above three per second; autoplaying motion over 5 seconds has pause/stop; loops stop offscreen. Respect `prefers-reduced-transparency` and `prefers-contrast` for translucent and low-contrast surfaces.
- **A11Y16. Time limits** can be extended or turned off; toasts with actions stay until dismissed or long enough to reach.
- **A11Y17. `translate="no"`** on brand names, code tokens and identifiers so auto-translation does not garble them.

## Audit workflow with Chrome DevTools MCP

1. **Baseline**: `lighthouse_audit` (accessibility, mode `navigation`, save to a temp dir). Filter failing audits instead of reading the whole report:
   ```bash
   node -e "const r=require('./report.json');Object.values(r.audits).filter(a=>a.score!==null&&a.score<1).forEach(a=>console.log(a.id,'-',a.title))"
   ```
2. **Native issues**: `list_console_messages` with `types: ["issue"]` and `includePreservedMessages: true` (missing labels, invalid ARIA, low contrast).
3. **Structure**: `take_snapshot` to read the accessibility tree: heading levels, landmarks, names. Compare with a screenshot to catch reordering.
4. **Keyboard**: `press_key` Tab and Shift+Tab, `take_snapshot` after each to confirm what is focused; open each modal and confirm focus moves in and returns.
5. **Snippets** with `evaluate_script`:
   ```js
   // Orphaned inputs (no label)
   () => [...document.querySelectorAll('input,select,textarea')].filter(i =>
     !(i.id && document.querySelector(`label[for="${i.id}"]`)) && !i.getAttribute('aria-label') &&
     !i.getAttribute('aria-labelledby') && !i.closest('label')).map(i => ({ tag: i.tagName, name: i.name, id: i.id }))
   ```
   ```js
   // Tap target size (pass an element uid from the snapshot)
   el => { const r = el.getBoundingClientRect(); return { width: r.width, height: r.height }; }
   ```
   ```js
   // Contrast of one element. Works with oklch()/color() values by rasterizing each color to one canvas pixel.
   // Approximate: ignores alpha blending, gradients and background images.
   el => { const cv = document.createElement('canvas'); cv.width = cv.height = 1;
     const c = cv.getContext('2d', { willReadFrequently: true });
     const rgb = s => { c.clearRect(0, 0, 1, 1); c.fillStyle = s; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data].slice(0, 3); };
     const L = ([r,g,b]) => [r,g,b].map(v => (v/=255) <= .03928 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((a,v,i) => a + v*[.2126,.7152,.0722][i], 0);
     let n = el, bg = 'rgb(255,255,255)';
     while (n) { const b = getComputedStyle(n).backgroundColor; if (b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent' && !/\/ 0\)$/.test(b)) { bg = b; break; } n = n.parentElement; }
     const [a, b] = [L(rgb(getComputedStyle(el).color)), L(rgb(bg))];
     return { color: getComputedStyle(el).color, bg, ratio: +((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2) }; }
   ```
   ```js
   // Page-level checks
   () => ({ lang: document.documentElement.lang || 'MISSING', title: document.title || 'MISSING',
     viewport: document.querySelector('meta[name=viewport]')?.content || 'MISSING',
     h1: document.querySelectorAll('h1').length })
   ```
6. **Text over images or gradients**: automated contrast cannot measure it; screenshot and judge, and add a scrim if in doubt.

To read a web.dev guideline in full, append `.md.txt` to its URL.

## Verify

Lighthouse accessibility 100 or every remaining failure explained; zero orphaned inputs; one h1 and no skipped levels; keyboard pass recorded; lowest contrast pair recorded.
