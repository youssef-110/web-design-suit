# Performance

Core Web Vitals, loading strategy, React rendering rules, and DevTools debugging workflows. Measure before and after; fix the biggest bottleneck first. Cite as `performance/web-performance.md PERF#`.

## Targets

- **PERF1. LCP under 2.5s, INP under 200ms, CLS under 0.1**, measured on a throttled mobile profile (Fast 3G, 4x CPU), not only a fast desktop.

## Loading

- **PERF2. The LCP element loads immediately**: a real `<img src>` in the initial HTML (not CSS background, not JS-inserted, never `loading="lazy"`), `fetchpriority="high"`, preloaded if not discoverable early, served as AVIF or WebP at the displayed size.
- **PERF3. Everything below the fold is lazy**: images `loading="lazy"`, heavy components via dynamic import (`next/dynamic`, `React.lazy`), analytics and chat widgets after hydration or on interaction.
- **PERF4. Fonts**: self-hosted `woff2`, subset, only used weights, `font-display: swap`, preload the first-viewport face (`typography/type-system.md` TYP27).
- **PERF5. No layout shift**: dimensions or `aspect-ratio` on every image, video and embed; reserve space for late content; never inject content above what the user is reading; skeletons sized like the content.
- **PERF6. Scripts** `defer` or `async`; `preconnect` to required asset origins; inline only critical CSS.
- **PERF7. Animated media**: `<video autoplay muted loop playsinline>` with a poster instead of GIFs; respect reduced motion with a still.
- **PERF8. Bundles**: import directly instead of through barrel files (or `optimizePackageImports`); statically analyzable import paths; load a feature's module only when it is activated; preload on hover or focus for likely next steps.

## Rendering (React and Next.js)

- **PERF9. Eliminate waterfalls first**: start independent requests together (`Promise.all`), await only where the value is used, stream with Suspense boundaries, parallelize server fetches by component structure.
- **PERF10. Server components and props**: pass the minimum serialized data to client components; dedupe per request with `React.cache()`; hoist static I/O to module level; never keep request state in module scope; authenticate server actions like API routes.
- **PERF11. Re-renders**: derive state during render instead of syncing with effects; primitive effect dependencies; functional `setState`; lazy `useState(() => init)`; `startTransition` and `useDeferredValue` for non-urgent updates; refs for transient high-frequency values; never define components inside components; memoize only expensive work.
- **PERF12. Conditionals**: `cond ? <X/> : null`, not `cond && <X/>` when `cond` can be `0`.
- **PERF13. Long lists** (over about 50 items) virtualize, or use `content-visibility: auto` with `contain-intrinsic-size`.
- **PERF14. Hydration**: theme or locale read from storage is applied by an inline script before hydration (no flash); date and time rendering guarded against server/client mismatch; `suppressHydrationWarning` only where truly needed.
- **PERF15. DOM and layout**: no layout reads in render; batch reads before writes; passive scroll and touch listeners; deduplicate global listeners; `requestIdleCallback` for non-critical work.

## Motion and runtime

- **PERF16.** Animate compositor-friendly properties (`motion/principles.md` MOT4); bound blur and filters; pause offscreen loops; use `gsap.quickTo` or motion values for pointer-driven effects.

## LCP debugging workflow (Chrome DevTools MCP)

1. `navigate_page`, then `performance_start_trace` with `reload: true, autoStop: true`.
2. `performance_analyze_insight` for `LCPBreakdown`, `LCPDiscovery`, `RenderBlocking`, `DocumentLatency`.
3. Identify the LCP element with `evaluate_script`:
   ```js
   () => new Promise(res => new PerformanceObserver(l => { const e = l.getEntries().at(-1);
     res({ tag: e.element?.tagName, url: e.url, start: e.startTime, size: e.size }); })
     .observe({ type: 'largest-contentful-paint', buffered: true }))
   ```
4. `list_network_requests` filtered to images and fonts: compare the LCP resource's start against the document.
5. Read the four subparts. Ideal shares: TTFB about 40 percent, resource load delay under 10, resource load duration about 40, element render delay under 10. Fix the biggest delay first: load delay means discoverability (PERF2); render delay means blocking CSS/JS or client-only rendering; load duration means file size or CDN; TTFB means server, redirects, edge caching.
6. Re-trace with `emulate` (`networkConditions: "Fast 3G"`, `cpuThrottlingRate: 4`) and compare.

## Memory leak workflow (Chrome DevTools MCP)

Repeat the suspected interaction about 10 times, `take_heapsnapshot` at baseline, after, and after reverting; `compare_heapsnapshots`; inspect growing classes with retainers and dominators. Usual causes: listeners not removed, timers not cleared, unreverted GSAP contexts or ScrollTriggers, detached DOM held by closures, unbounded caches. Ask before nulling detached nodes that may be intentional caches. The memory tools need the server started with `--memoryDebugging`.
