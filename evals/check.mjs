#!/usr/bin/env node
// web-design-suite checks. No dependencies, no network.
//   node evals/check.mjs scan <files|dirs...> [--allow ID,ID] [--json]
//   node evals/check.mjs self-test
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = join(ROOT, "skills", "web-design-suite");
const REFS = join(SKILL, "references");

const MARKUP = new Set([".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".mdx"]);
const STYLE = new Set([".css", ".scss", ".sass", ".less", ...MARKUP]);
const ALL = new Set([...STYLE, ".js", ".mjs", ".cjs", ".ts"]);
const SCOPES = { markup: MARKUP, style: STYLE, all: ALL };
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", ".svelte-kit", "out", "coverage"]);

export function loadPatterns() {
  const md = readFileSync(join(REFS, "anti-slop.md"), "utf8");
  const m = md.match(/<!-- slop-patterns:start -->\s*```json\s*([\s\S]*?)```\s*<!-- slop-patterns:end -->/);
  if (!m) throw new Error("slop-patterns block not found in anti-slop.md");
  return JSON.parse(m[1]).map((p) => ({ ...p, re: new RegExp(p.pattern, p.flags.includes("g") ? p.flags : p.flags + "g") }));
}

function walk(p, out = []) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) if (!SKIP_DIRS.has(name)) walk(join(p, name), out);
  } else if (ALL.has(extname(p).toLowerCase())) out.push(p);
  return out;
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

export function scanText(text, ext, patterns, allow = new Set()) {
  const findings = [];
  // HTML comments are not visible copy; blank them out (keeping line numbers) for markup files.
  const body = /\.html?$/.test(ext) ? text.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " ")) : text;
  for (const p of patterns) {
    if (allow.has(p.id) || !SCOPES[p.scope].has(ext)) continue;
    if (p.unless && new RegExp(p.unless).test(body)) continue;
    const matches = [...body.matchAll(p.re)];
    const max = p.max ?? 0;
    if (matches.length <= max) continue;
    const shown = max > 0 ? [matches[max]] : matches.slice(0, 5);
    for (const m of shown) {
      findings.push({ id: p.id, severity: p.severity, line: lineOf(body, m.index), match: m[0].trim().slice(0, 60),
        message: max > 0 ? `${p.message} (${matches.length} found, max ${max})` : p.message });
    }
    if (max === 0 && matches.length > 5) findings.push({ id: p.id, severity: p.severity, line: lineOf(body, matches[5].index), match: "", message: `${matches.length - 5} more` });
  }
  return findings;
}

function scan(paths, { allow = new Set(), json = false } = {}) {
  const patterns = loadPatterns();
  const files = paths.flatMap((p) => walk(resolve(p)));
  let errors = 0, warnings = 0;
  const report = [];
  for (const f of files) {
    const findings = scanText(readFileSync(f, "utf8"), extname(f).toLowerCase(), patterns, allow);
    for (const x of findings) { x.severity === "error" ? errors++ : warnings++; report.push({ file: relative(process.cwd(), f), ...x }); }
  }
  if (json) console.log(JSON.stringify({ files: files.length, errors, warnings, findings: report }, null, 2));
  else {
    for (const r of report) console.log(`${r.file}:${r.line}  [${r.severity}] ${r.id}  ${r.message}${r.match ? `  "${r.match}"` : ""}`);
    console.log(`\n${files.length} file(s) scanned: ${errors} error(s), ${warnings} warning(s)${allow.size ? `, allowed: ${[...allow].join(", ")}` : ""}`);
  }
  return { errors, warnings, report };
}

function selfTest() {
  const failures = [];
  const ok = (cond, msg) => { if (!cond) failures.push(msg); };
  const patterns = loadPatterns();
  ok(patterns.length >= 25, `expected >= 25 machine patterns, got ${patterns.length}`);
  ok(new Set(patterns.map((p) => p.id)).size === patterns.length, "duplicate pattern ids");
  for (const p of patterns) ok(SCOPES[p.scope] && ["error", "warn"].includes(p.severity), `bad scope/severity on ${p.id}`);

  // Fixtures: the slop page must trip the core rules; the clean page must pass with zero findings.
  const fx = join(ROOT, "evals", "fixtures");
  const slop = scanText(readFileSync(join(fx, "slop.html"), "utf8"), ".html", patterns);
  const found = new Set(slop.map((f) => f.id));
  const expected = ["SL40-em-dash", "SL15-gradient-text", "SL14-ai-gradient", "SL33-transition-all", "SL33-scale-zero",
    "SL33-bounce", "SL38-buzzword", "SL41-placeholder-names", "SL47-emoji", "SL51-img-alt", "SL51-div-click",
    "SL51-zoom-disabled", "SL51-outline-none", "SL10-scroll-cue", "SL50-placeholder-code", "SL52-h-screen", "SL7-eyebrow"];
  for (const id of expected) ok(found.has(id), `slop.html should trigger ${id}`);
  const clean = scanText(readFileSync(join(fx, "clean.html"), "utf8"), ".html", patterns);
  ok(clean.length === 0, `clean.html should have no findings, got: ${clean.map((f) => `${f.id}@${f.line}`).join(", ")}`);
  ok(scanText("<p>Ranges 2018-2026</p>", ".html", patterns).length === 0, "hyphen ranges must not trip the dash rule");
  ok(scanText("a{outline:none}a:focus-visible{outline:2px solid}", ".css", patterns).length === 0, "outline:none with focus-visible must pass");
  ok(scanText("<p>Hi</p>", ".html", patterns, new Set()).length === 0, "trivial markup must pass");
  ok(scanText("<p>—</p>", ".html", patterns, new Set(["SL40-em-dash"])).length === 0, "--allow must suppress a rule");

  // Structure: size limits from the brief.
  const lines = (f) => readFileSync(f, "utf8").split("\n").length;
  ok(lines(join(SKILL, "SKILL.md")) < 150, `SKILL.md must be under 150 lines (${lines(join(SKILL, "SKILL.md"))})`);
  const cmdDir = join(ROOT, "commands");
  const cmds = readdirSync(cmdDir).filter((f) => f.endsWith(".md"));
  for (const c of ["brief", "build", "redesign", "animate", "review", "mobile"]) ok(cmds.includes(`${c}.md`), `missing command ${c}.md`);
  for (const c of cmds) ok(lines(join(cmdDir, c)) < 60, `commands/${c} must be under 60 lines`);
  const domains = ["layout", "typography", "color", "motion", "interaction", "components", "a11y", "performance", "mobile", "redesign", "brand"];
  for (const d of domains) ok(existsSync(join(REFS, d)) && readdirSync(join(REFS, d)).some((f) => f.endsWith(".md")), `missing references/${d}/*.md`);
  for (const f of ["conflicts.md", "anti-slop.md", "brief-template.md", "verify.md"]) ok(existsSync(join(REFS, f)), `missing references/${f}`);

  // Integrity: every "path.md RULE" citation points at a file that defines that rule.
  const mdFiles = [join(SKILL, "SKILL.md"), ...walkMd(REFS), ...cmds.map((c) => join(cmdDir, c)), join(ROOT, "evals", "briefs.md")];
  const cite = /\b((?:[a-z0-9-]+\/)?[a-z0-9-]+\.md)\s+([A-Z][A-Z0-9]*\d+)\b/g;
  for (const f of mdFiles) {
    for (const [, file, id] of readFileSync(f, "utf8").matchAll(cite)) {
      const target = [join(REFS, file), join(SKILL, file)].find(existsSync);
      if (!target) { failures.push(`${relative(ROOT, f)} cites missing file ${file}`); continue; }
      const t = readFileSync(target, "utf8");
      ok(new RegExp(`(\\*\\*${id}(\\*\\*|[.:\\s])|\\|\\s*${id}\\s*\\||^##+\\s*${id}[.:\\s]|\\(${id}\\))`, "m").test(t), `${relative(ROOT, f)} cites ${file} ${id}, not defined there`);
    }
    // Markdown links to local files resolve.
    for (const [, href] of readFileSync(f, "utf8").matchAll(/\]\(((?!https?:|#)[^)\s#]+)/g)) {
      ok(existsSync(join(dirname(f), href)), `${relative(ROOT, f)} links to missing ${href}`);
    }
  }
  // Briefs: ten briefs covering every task type.
  const briefs = readFileSync(join(ROOT, "evals", "briefs.md"), "utf8");
  const ids = [...briefs.matchAll(/^## (B\d+)/gm)].map((m) => m[1]);
  ok(ids.length === 10, `evals/briefs.md must hold 10 briefs, found ${ids.length}`);
  for (const t of ["landing", "dashboard", "portfolio", "app-ui", "redesign", "animation", "mobile"]) ok(new RegExp(`Task type: ${t}\\b`).test(briefs), `briefs.md missing task type ${t}`);

  if (failures.length) { console.error(`self-test FAILED (${failures.length}):\n- ` + failures.join("\n- ")); process.exit(1); }
  console.log(`self-test passed: ${patterns.length} patterns, ${expected.length} slop rules caught, clean fixture clean, ${mdFiles.length} docs cross-checked, ${ids.length} briefs.`);
}

function walkMd(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walkMd(p) : p.endsWith(".md") ? [p] : []; });
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "scan") {
  const allowIdx = rest.indexOf("--allow");
  const allow = new Set(allowIdx >= 0 ? rest[allowIdx + 1].split(",") : []);
  const paths = rest.filter((a, i) => !a.startsWith("--") && !(allowIdx >= 0 && i === allowIdx + 1));
  if (!paths.length) { console.error("usage: check.mjs scan <files|dirs...> [--allow ID,ID] [--json]"); process.exit(2); }
  const { errors } = scan(paths, { allow, json: rest.includes("--json") });
  process.exit(errors ? 1 : 0);
} else if (cmd === "self-test") selfTest();
else { console.error("usage: check.mjs scan <files|dirs...> [--allow ID,ID] [--json] | self-test"); process.exit(2); }
