# AGENTS.md

## Quick start

```bash
pnpm dev              # dev server, usually on http://localhost:3000
pnpm build            # production build
pnpm preview          # local preview of production build
pnpm typecheck        # TypeScript check (nuxt typecheck / vue-tsc)
pnpm lint             # oxlint (what CI runs; NOT eslint)
pnpm lint:fix         # oxlint --fix
pnpm fmt              # oxfmt formatter
pnpm fmt:check        # oxfmt --check
```

**Always use pnpm.** `packageManager` is pinned to `pnpm@10.33.3`.

## Architecture

Single-page personal intro site, Nuxt 4 + Nuxt UI v4 + Tailwind v4.

| Dir/File                  | Purpose                                                                   |
| ------------------------- | ------------------------------------------------------------------------- |
| `app/`                    | Nuxt 4 source root (NOT `src/` or root-level `pages/`)                    |
| `app/app.vue`             | Root layout: UApp → UHeader + UMain + UFooter                             |
| `app/pages/index.vue`     | The only page; 4 sections: Hero, Skills, Projects, Capabilities             |
| `app/config/site.ts`      | Site copy, `navItems`, URLs (`siteUrl`, email, GitHub) — single edit surface |
| `app/assets/css/main.css` | Tailwind v4 entry + custom `@theme` + `.hero-gradient`                    |
| `app/app.config.ts`       | Nuxt UI theme: `primary: 'green'`, `neutral: 'slate'`                       |
| `design/design.pen`       | Visual design source (PEN format); 4 screens: desktop/mobile × light/dark |
| `Resume.md`               | Content reference for the page                                            |

## Framework quirks

### Tailwind v4 — CSS-first config

- **No `tailwind.config.ts`.** All config in `main.css` via `@theme static { ... }`.
- Dark mode: `@variant dark (&:where(.dark, .dark *))` — class-based, managed by Nuxt UI's color mode system.
- Custom green palette is defined in `@theme static`; matches `app.config.ts`'s `primary: 'green'`.
- `Public Sans` is the font, not `Archivo` (the design file uses Archivo but the site uses Public Sans).

### Motion

- **GSAP + ScrollTrigger** drive hero line reveals and scroll-linked animation on `index.vue`. Loaded via dynamic `import()` on the client only; clean up with `gsap.context` + `revert()` in `onBeforeUnmount`.

### Nuxt UI v4

- `UApp` is the mandatory root wrapper (v4 changed from v3's `AppLayout`).
- `UColorModeSelect` handles light/dark/system in the header — do NOT implement manual color mode toggling.
- Icons use `i-lucide-{name}` prefix (Iconify). Already auto-bundled by `@nuxt/icon`.
- Section separators: use `<USeparator />` between sections, not custom `<hr>`.

### Nuxt 4 directory conventions

- Source lives in `app/`, not project root.
- Auto-imports: `useHead`, `useSeoMeta`, `defineAppConfig`, Nuxt UI components are all available without imports.
- Path aliases: `~/` or `@/` → `app/`.

### Color mode

- Managed entirely by Nuxt UI v4's `@nuxtjs/color-mode`. The `UColorModeSelect` component in the header provides light/dark/system.
- The hero section uses hardcoded dark gradient (`.hero-gradient`) that stays dark in BOTH light and dark modes. Dark variant uses `.dark .hero-gradient`.

### Hero gradient

```css
.hero-gradient {
  background: linear-gradient(0deg, #0a1f14 0%, #0a0a0a 100%);
}
.dark .hero-gradient {
  background: linear-gradient(0deg, #031008 0%, #09090b 100%);
}
```

The gradient colors are NOT tokenized — they're intentional hardcoded dark values because the hero is always dark regardless of theme.

## Lint & format

- **CI runs `oxlint`, not `eslint`.** ESLint config exists but is not in CI pipeline.
- Formatter is `oxfmt`, not Prettier.
- Config conventions (`.oxfmtrc.json`):
  - `semi: false` — no semicolons
  - `singleQuote: true` — single quotes
  - `sortTailwindcss: true` — Tailwind classes auto-sorted
  - `sortImports: true` — imports auto-sorted
- `.oxlintrc.json` is a large, explicit rule set (~550+ lines); correctness rules are tuned per category (e.g. category-level `correctness: off` where configured).

## TypeScript

- Version 6.0.3 (very new; strict mode enabled).
- `vue-tsc` for typechecking, not `tsc`.
- Typecheck command: `nuxt typecheck` (wraps `vue-tsc` with Nuxt-generated tsconfigs).

## CI

- `.github/workflows/ci.yml`: installs deps, runs `pnpm lint`, then `pnpm typecheck`.
- No build step in CI (build happens at deploy time on Vercel).
- Node 22, ubuntu-latest.

## Gotchas

- **`@nuxt/eslint` module was removed from `nuxt.config.ts`** because it's not installed as a package. Only `@nuxt/eslint-plugin` exists (in devDependencies, used by ESLint config but not by CI).
- **Legacy components** `TemplateMenu.vue` and `AppLogo.vue` are unused — leftover from the starter template. Safe to delete.
- **Route rules are empty** — no prerendering, no SSG. The site is hybrid-rendered (Nuxt default).
- **`pnpm-workspace.yaml`** exists only for `ignoredBuiltDependencies`, not for a real monorepo.
- Network may be restricted (Google Fonts metadata API is unreachable) — Nuxt Icon fallback uses local bundles.
