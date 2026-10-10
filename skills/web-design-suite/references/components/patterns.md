# Components, systems and assets

Choosing a foundation, using shadcn/ui and Sonner well, React composition, icons and imagery. Cite as `components/patterns.md CMP#`.

## Foundation

- **CMP1. Use the real design system when the brief is one.** Do not hand-recreate an official system's CSS.

  | Brief reads as | Use |
  |---|---|
  | Microsoft-style enterprise app | `@fluentui/react-components` |
  | Material product | `@material/web` + Material 3 tokens |
  | IBM-style analytics | `@carbon/react` |
  | Shopify admin app | Polaris web components |
  | Atlassian-style tool | `@atlaskit/*` + `@atlaskit/tokens` |
  | GitHub-style devtool or community | `@primer/react` / `@primer/react-brand` |
  | UK public service | `govuk-frontend` |
  | US public service | `uswds` |
  | Accessible React foundation, light theming | `@radix-ui/themes` |
  | Product where you own the components | shadcn/ui (never in its default state) |
  | Utility-first marketing or app | Tailwind v4 |

  One system per project. Aesthetic directions (glass, bento, brutalist, editorial) have no official package: build them with native CSS and say honestly what is approximated (for example, any web "Liquid Glass" is an approximation of an Apple-platform material).
- **CMP2. Check `package.json` before importing anything**; if a package is missing, give the install command first. Never import a library that is not installed.
- **CMP3. Tailwind v4**: `@tailwindcss/postcss` or the Vite plugin, not the old `tailwindcss` PostCSS plugin. Style against semantic tokens (`bg-surface`, `text-muted`) defined with `@theme`; flip tokens for dark mode in one place (conflicts.md C20). Prefer scale values over arbitrary `[...]`; `size-*` for squares; `gap` over margins; avoid `@apply` for components; merge classes with `cn()` (clsx + tailwind-merge) and variants with `tailwind-variants` or `cva`, incoming `className` last.

## shadcn/ui

- **CMP4. Customize before shipping**: radius scale, color tokens, shadows and type to match the project's world. A default shadcn look is a tell.
- **CMP5. With the shadcn MCP server** (`@jpisnice/shadcn-ui-mcp-server`, optional): `list_components` and `list_blocks` to discover, `get_component` / `get_component_demo` / `get_component_metadata` for the real source and usage, `get_block` for full blocks, `get_install_script_for_component` for the CLI command, `get_themes` for theme tokens. Pass `--framework react|vue|svelte|react-native` and `--ui-library radix|base`. Prefer the CLI (`npx shadcn@latest add <component>`) to install, then edit the owned file.
- **CMP6. Without MCP**: `npx shadcn@latest init`, then `add` components; read the generated file before using it.

## Toasts (Sonner)

- **CMP7. One `<Toaster />` at the root** (Next.js `layout.tsx`), never per page or conditionally; `toast()` only from client code.
- **CMP8. Pick the call**: `toast.success/error`, `toast.promise(p, { loading, success, error })`, update by `id` (`toast.loading` then `toast.success(..., { id })`), `{ action: { label, onClick } }`, `toast.custom()` for a fully owned design.
- **CMP9. Theme and style**: `theme="system"` (default is light), `richColors` if wanted; style through `toastOptions.classNames` (needs `!important` for Tailwind) or go headless with `toast.custom()` for a design-system toast. Toaster outside any transformed or `overflow` ancestor so it is not clipped or trapped behind a modal. Mobile edge spacing via `mobileOffset`.

## React composition

- **CMP10. No boolean-prop proliferation.** Use compound components with shared context (`<Composer.Root> <Composer.Input/> <Composer.Submit/>`) and explicit variant components instead of `isCompact`, `isThread`, `showX` flags.
- **CMP11. Children over render props**; lift state into a provider so siblings can read it; the provider is the only place that knows how state is stored.
- **CMP12. React 19**: no `forwardRef` (ref is a prop); `use(Context)` instead of `useContext`.
- **CMP13. Never define components inside components**; derive state during render instead of syncing with effects; put interaction logic in event handlers.

## Icons

- **CMP14. One real icon library per project** (conflicts.md C44); keep the one the project uses; Phosphor for greenfield. No emoji or unicode glyphs as icons; no hand-drawn icon paths.
- **CMP15. Stroke matches adjacent text weight**: 1.5px next to regular text, 2px next to medium or semibold, 2.5px next to bold. Size icons at 1 to 1.25em and on the set's native grid (16, 20, 24).
- **CMP16. One SVG with `currentColor`**; states via CSS color and opacity. Outline by default, fill for the active state.
- **CMP17. Accessibility**: icon-only buttons get `aria-label`; decorative icons `aria-hidden="true"`. Flip directional icons in RTL (`[dir="rtl"] .icon-dir { scale: -1 1; }`), never logos, checkmarks or media controls.
- **CMP18. Avoid cliché metaphors** (rocket for launch, shield for security, lightbulb for idea) unless the brand uses them.
- **CMP19. Import icons per module** or enable `optimizePackageImports` in Next.js; barrel imports from icon libraries cost hundreds of milliseconds.

## Imagery and logos

- **CMP20. Real imagery at real visibility** (conflicts.md C46): provided assets first, then generated images when an image tool exists in the session, then verified stock URLs. `picsum.photos/seed/<descriptive-seed>/<w>/<h>` only as a labeled placeholder in prototypes, listed in the final report for replacement.
- **CMP21. No div-built fake screenshots** (anti-slop.md SL4). Show the product with a real screenshot, a generated image, or a small working component.
- **CMP22. Logo walls**: real SVG logos (Simple Icons for known brands, `https://cdn.simpleicons.org/<slug>`), logo only, readable in the page's theme, below the hero. For invented brands, a simple authored monogram, not a text wordmark row.
- **CMP23. Images**: explicit `width`/`height` or `aspect-ratio`, meaningful `alt` (empty for decoration), `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image, modern formats (AVIF, WebP), `object-fit: cover` inside fixed frames, an `onError` fallback for user avatars.
- **CMP24. Mark synthetic demo content** (sample data, generated people, placeholder metrics) where a visitor could mistake it for real; never invent prices, customers, benchmarks or testimonials as fact.
