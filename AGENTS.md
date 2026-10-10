# Repository Instructions

This file provides guidance for agents working in this repository.

## Development Commands

- `pnpm dev --port auto` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture Overview

This is a Next.js 16 App Router project with TypeScript, React 19, and Tailwind CSS.

### Key Technologies

- **Next.js 16**: Using App Router (not Pages Router)
- **React Server Components**: Default for all components in `app/` directory
- **shadcn/ui**: Component library configured with path aliases
- **Vercel Speed Insights**: Integrated in root layout

### Project Structure

- `app/` - App Router pages and API routes (Next.js 16 convention)
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utility functions (e.g., `cn()` for className merging)
- `app/api/` - API routes following App Router conventions

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/*` resolves to `./src/*`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/components/ui` → `src/components/ui`

### Next.js 16 App Router Patterns

1. **Dynamic Routes**: Use `[param]/page.tsx` with async params
   ```typescript
   export default async function Page({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }
   ```

2. **API Routes**: Export HTTP method functions in `route.ts`
   ```typescript
   export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
     return Response.json({ data });
   }
   ```

3. **Server-Side Data Fetching**: Async components can fetch directly
   ```typescript
   const response = await fetch(url);
   const data = await response.json();
   ```

### shadcn/ui Integration

- Components are installed in `src/components/ui/`
- Uses Radix UI primitives with Tailwind styling
- `cn()` utility from `@/lib/utils` for conditional classes
- Icon library: lucide-react

### Styling

- Tailwind CSS 4 through `@tailwindcss/postcss`, with the explicit legacy theme configuration and `tailwindcss-animate`
- CSS variables defined for theming
- Custom fonts: Geist Sans and Geist Mono

## Important Notes

- README.md must be kept up to date with any significant project changes
- This is a sandbox/experimental project for testing Next.js features
- Uses strict TypeScript configuration

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
