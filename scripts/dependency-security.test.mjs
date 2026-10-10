import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { ESLint } from "eslint";

const lockfile = readFileSync("pnpm-lock.yaml", "utf8");
const packages = lockfile.slice(lockfile.indexOf("\npackages:"));

test("the retired Tailwind 3 glob graph and unpatched braces are excluded", () => {
  assert.equal(/^  ['"]?(?:braces|micromatch|chokidar@3)@?/m.test(packages), false);
  const manifest = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(manifest.dependencies.next, manifest.devDependencies["eslint-config-next"]);
});

test("Next lint root discovery retains wildcard, brace, and Windows path behavior", async () => {
  const directory = mkdtempSync(join(tmpdir(), "next-lint-roots-"));
  const require = createRequire(import.meta.url);
  const configRequire = createRequire(require.resolve("eslint-config-next"));
  const plugin = configRequire.resolve("@next/eslint-plugin-next");
  const { getRootDirs } = require(join(dirname(plugin), "utils/get-root-dirs.js"));
  try {
    for (const name of ["alpha", "beta"]) mkdirSync(join(directory, name));
    writeFileSync(join(directory, "alpha.txt"), "Not a directory");
    const roots = (rootDir) => getRootDirs({ cwd: directory, settings: { next: { rootDir } } })
      .map((path) => resolve(path)).sort();
    assert.deepEqual(getRootDirs({ cwd: directory, settings: {} }), [directory]);
    assert.deepEqual(roots(join(directory, "*")), [join(directory, "alpha"), join(directory, "beta")]);
    assert.deepEqual(roots(join(directory, "{alpha,beta}")), [join(directory, "alpha"), join(directory, "beta")]);
    assert.deepEqual(roots(join(directory, "alpha").replaceAll("/", "\\")), [join(directory, "alpha")]);
    mkdirSync(join(directory, "alpha", "pages"));
    writeFileSync(join(directory, "alpha", "pages", "about.js"), "export default function About() {}");
    const eslint = new ESLint({ overrideConfig: { settings: { next: { rootDir: join(directory, "*") } } } });
    const [result] = await eslint.lintText('export default function Fixture() { return <a href="/about">About</a>; }', { filePath: "components/DependencySecurityFixture.tsx" });
    assert.ok(result.messages.some((message) => message.ruleId === "@next/next/no-html-link-for-pages"));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("Tailwind PostCSS still expands content classes and variants", async () => {
  const require = createRequire(import.meta.url);
  const postcss = require("postcss");
  const tailwindcss = require("@tailwindcss/postcss");
  const output = await postcss([tailwindcss()]).process('@import "tailwindcss"; @config "./tailwind.config.ts"; @source inline("p-4 hover:bg-red-500 md:flex bg-card dark:bg-card text-card-foreground animate-accordion-down focus-visible:outline-hidden");', { from: join(process.cwd(), "dependency-security-fixture.css") });
  assert.match(output.css, /\.p-4/);
  assert.match(output.css, /padding:/);
  assert.match(output.css, /hsl\(var\(--card\)\)/);
  assert.match(output.css, /accordion-down/);
  assert.match(output.css, /\.dark/);
  assert.match(output.css, /outline-hidden/);
  assert.match(output.css, /background-color:/);
  assert.match(output.css, /@media/);
  assert.match(output.css, /display: flex/);
});

test("Vercel backend configuration extraction retains literals and nested values", () => {
  const directory = mkdtempSync(join(tmpdir(), "vercel-config-"));
  const require = createRequire(import.meta.url);
  const vercelRequire = createRequire(require.resolve("vercel/package.json"));
  const backendRequire = createRequire(vercelRequire.resolve("@vercel/backends/package.json"));
  const { Project } = backendRequire("ts-morph");
  const { getConfig } = backendRequire("@vercel/static-config");
  try {
    const source = join(directory, "entry.ts");
    writeFileSync(source, 'export const config = { runtime: "edge", maxDuration: 30, regions: ["iad1", "sfo1"] };');
    assert.deepEqual(getConfig(new Project(), source), { runtime: "edge", maxDuration: 30, regions: ["iad1", "sfo1"] });
    const absent = join(directory, "unconfigured.ts");
    writeFileSync(absent, 'export default function handler() {}');
    assert.equal(getConfig(new Project(), absent), null);
    const project = new Project();
    const discovered = project.addSourceFilesAtPaths(join(directory, "*.{ts,tsx}"));
    assert.deepEqual(discovered.map(file => file.getBaseName()).sort(), ["entry.ts", "unconfigured.ts"]);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("the complete dependency graph has no known vulnerabilities", () => {
  const audit = JSON.parse(execFileSync("pnpm", ["audit", "--json"], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
  assert.deepEqual(audit.metadata.vulnerabilities, { info: 0, low: 0, moderate: 0, high: 0, critical: 0 });
  const npmrc = readFileSync(".npmrc", "utf8");
  assert.match(npmrc, /^minimum-release-age=10080$/m);
  assert.match(npmrc, /^block-exotic-subdeps=true$/m);
});
