# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 App Router project with TypeScript, React 19, and Tailwind CSS.

### Key Technologies

- **Next.js 15**: Using App Router (not Pages Router)
- **React Server Components**: Default for all components in `app/` directory
- **shadcn/ui**: Component library configured with path aliases
- **Vercel Speed Insights**: Integrated in root layout

### Project Structure

- `app/` - App Router pages and API routes (Next.js 15 convention)
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utility functions (e.g., `cn()` for className merging)
- `app/api/` - API routes following App Router conventions

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/*` resolves to `./src/*`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/components/ui` → `src/components/ui`

### Next.js 15 App Router Patterns

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

- Tailwind CSS with `tailwindcss-animate`
- CSS variables defined for theming
- Custom fonts: Geist Sans and Geist Mono

## Important Notes

- README.md must be kept up to date with any significant project changes
- This is a sandbox/experimental project for testing Next.js features
- Uses strict TypeScript configuration
