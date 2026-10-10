<p align="center">
  <img src="https://raw.githubusercontent.com/tsilva/sandbox-nextjs/main/logo.png" alt="sandbox-nextjs" width="512"/>
  <br />
  <!-- repo-tagline:start -->
  <strong>⚛️ Next.js 16 sandbox with App Router, React 19, and shadcn/ui 🎨</strong>
  <!-- repo-tagline:end -->
</p>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  [Demo Routes](#available-routes) · [Quick Start](#quick-start) · [Stack](#tech-stack)

## Overview

sandbox-nextjs is a minimal experimental project for testing Next.js 16 App Router features, React 19 capabilities, and shadcn/ui components. Use it as a starting point for prototyping or learning the latest React ecosystem.

## Features

- **Next.js 16 App Router** - Server Components, dynamic routes, and API routes
- **React 19** - Latest React features and improvements
- **shadcn/ui Components** - Pre-built accessible components (Accordion, Button, Card, Carousel)
- **Tailwind CSS** - Utility-first styling with animations
- **TypeScript** - Full type safety throughout
- **Turbopack** - Fast development builds

## Quick Start

```bash
pnpm install --frozen-lockfile
pnpm dev --port auto
```

Open the random local URL printed by the development server.

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with Accordion demo |
| `/carousel` | Carousel component showcase |
| `/test/[id]` | Dynamic route displaying todo item from JSONPlaceholder |
| `/api/test/[id]` | API route returning test data with timestamp |

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.12 | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.1 | Styling |
| shadcn/ui | latest | Component library |
| Radix UI | latest | Accessible primitives |
| Vercel Speed Insights | 1.1.0 | Performance monitoring |

## Project Structure

```
sandbox-nextjs/
├── app/                    # App Router pages and API routes
│   ├── api/test/[id]/     # Dynamic API route
│   ├── carousel/          # Carousel demo page
│   ├── test/[id]/         # Dynamic page route
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── src/
│   ├── components/ui/     # shadcn/ui components
│   └── lib/               # Utility functions
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev --port auto` | Start the dev server on a random available port |
| `pnpm build` | Build for production |
| `pnpm start --port auto` | Start the production server on a random available port |
| `pnpm lint` | Run ESLint |

## License

MIT

Dependency maintenance keeps Next.js and its lint configuration aligned, pins patched transitive versions, and substitutes the Next lint directory glob with the registry-hosted tinyglobby implementation. Tailwind 4 uses its separate PostCSS plugin and explicitly loads the existing theme and animation configuration, removing the unpatched Tailwind 3 glob dependency graph. The seven-day release hold and disabled dependency lifecycle scripts remain enabled. Run `pnpm test` for dependency, lint-root, and generated-style regression checks.

Tailwind 4 targets Safari 16.4+, Chrome 111+, and Firefox 128+. Utility renames preserve card shadows and accessible focus outlines; custom colors, dark mode, and accordion animations retain the existing configuration.

Vercel’s source analyzers use a consistent ts-morph 28 to avoid its legacy fast-glob/braces dependency path; deployment commands retain the existing Vercel CLI version.
