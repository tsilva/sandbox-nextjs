<div align="center">
  <img src="logo.png" alt="sandbox-nextjs" width="256"/>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  **🧪 A playground for experimenting with Next.js 15, React 19, and modern web technologies**

  [Demo Routes](#available-routes) · [Quick Start](#quick-start) · [Stack](#tech-stack)
</div>

## Overview

sandbox-nextjs is a minimal experimental project for testing Next.js 15 App Router features, React 19 capabilities, and shadcn/ui components. Use it as a starting point for prototyping or learning the latest React ecosystem.

## Features

- **Next.js 15 App Router** - Server Components, dynamic routes, and API routes
- **React 19** - Latest React features and improvements
- **shadcn/ui Components** - Pre-built accessible components (Accordion, Button, Card, Carousel)
- **Tailwind CSS** - Utility-first styling with animations
- **TypeScript** - Full type safety throughout
- **Turbopack** - Fast development builds

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

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
| Next.js | 15.1.6 | React framework with App Router |
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
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
