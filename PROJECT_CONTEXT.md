# Belle Beauty - Project Context

> **Purpose**: This document provides AI assistants with comprehensive project context to avoid repetitive analysis. Read this first before exploring the codebase.

## Project Overview

**Belle Beauty** is a modern beauty salon booking website built with Next.js 15, Payload CMS, and deployed on Cloudflare Workers.

| Property | Value |
|----------|-------|
| **Project Type** | Beauty Salon Landing Page / Booking Website |
| **Framework** | Next.js 15.5.9 (App Router) |
| **CMS** | Payload CMS 3.68.5 |
| **Database** | Cloudflare D1 (SQLite) |
| **File Storage** | Cloudflare R2 |
| **Styling** | TailwindCSS 4.x |
| **Language** | TypeScript 5.7 |
| **Package Manager** | bun (with bun.lock) |
| **Deployment** | Cloudflare Workers via OpenNext |

---

## Tech Stack Details

### Frontend
- **React 19.2.3** with Server Components
- **TailwindCSS 4.x** for styling
- **Lucide React** for icons
- **Embla Carousel** for carousels/sliders
- **Radix UI** components (accordion, avatar, popover, tooltip, etc.)
- **tw-animate-css** for animations

### Backend/CMS
- **Payload CMS 3.68.5** - Headless CMS with admin panel
- **Lexical Editor** - Rich text editor
- **SEO Plugin** - Built-in SEO management
- **i18n Support** - English (en) and Turkish (tr)

### Infrastructure
- **Cloudflare Workers** - Edge runtime
- **D1 Database** - SQLite-based serverless database
- **R2 Storage** - Object storage for media files
- **Wrangler** - Cloudflare CLI tool

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/           # Public facing routes
│   │   ├── [[...slug]]/      # Dynamic page routes (catch-all)
│   │   ├── layout.tsx        # Frontend layout
│   │   └── globals.css       # Global styles with TailwindCSS
│   └── (payload)/            # Payload CMS admin panel routes
│
├── components/
│   ├── ui/                   # Reusable UI components (shadcn/ui style)
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── carousel.tsx
│   │   ├── badge.tsx
│   │   └── ... (10 components)
│   ├── action-button.tsx     # CTA action buttons
│   ├── animated.tsx          # Animation wrapper components
│   ├── logo.tsx              # Brand logo component
│   ├── render-blocks.tsx     # Block renderer for CMS content
│   ├── section.tsx           # Section wrapper component
│   └── video-background.tsx  # Video background component
│
├── domains/                  # Domain-driven design structure
│   ├── blocks/               # CMS Block types (page builder)
│   │   ├── video-hero.ts / video-hero.client.tsx
│   │   ├── features.ts / features.client.tsx
│   │   ├── gallery.ts / gallery.client.tsx
│   │   ├── cta.ts / cta.client.tsx
│   │   └── rich-text.ts / rich-text.client.tsx
│   ├── globals/              # Global CMS configurations
│   ├── media/                # Media collection
│   ├── pages/                # Pages collection (CMS managed)
│   ├── services/             # Services collection
│   │   ├── blocks/           # Service-specific blocks
│   │   │   ├── service-header.ts / service-header.client.tsx
│   │   │   └── services-carousel.ts / services-carousel.client.tsx
│   │   └── components/       # Service-related React components
│   └── users/                # Users collection (authentication)
│
├── i18n/                     # Internationalization config
├── migrations/               # D1 database migrations
├── utils/                    # Utility functions
├── middleware.ts             # Next.js middleware
├── payload.config.ts         # Payload CMS configuration
├── payload-types.ts          # Auto-generated TypeScript types
└── seed.ts                   # Database seeding script
```

---

## Key Patterns & Conventions

### 1. Block-Based Page Builder
- Pages are built using **blocks** defined in `src/domains/blocks/`
- Each block has two files:
  - `*.ts` - Payload field definitions (server-side schema)
  - `*.client.tsx` - React component (client-side rendering)
- Blocks are rendered via `src/components/render-blocks.tsx`

### 2. Domain-Driven Structure
- Collections organized by domain in `src/domains/`
- Each domain folder contains Payload collection config + related components

### 3. UI Components
- Located in `src/components/ui/`
- Follow shadcn/ui patterns with Radix UI primitives
- Use `class-variance-authority` for component variants
- Utility functions: `cn()` for class merging (clsx + tailwind-merge)

### 4. Path Aliases
```typescript
"@/*" → "./src/*"
"@payload-config" → "./src/payload.config.ts"
```

---

## Payload CMS Collections

| Collection | Slug | Purpose |
|------------|------|---------|
| **Users** | `users` | Admin users with authentication |
| **Media** | `media` | Image/file uploads (stored in R2) |
| **Services** | `services` | Beauty salon services |
| **Pages** | `pages` | CMS-managed pages with SEO |

### Available Blocks (Page Builder)

**General Blocks** (`src/domains/blocks/`):
- `video-hero` - Hero sections with video/image backgrounds
- `features` - Feature highlights grid
- `gallery` - Image gallery/carousel
- `cta` - Call-to-action sections
- `rich-text` - Rich text content (Lexical)

**Service Blocks** (`src/domains/services/blocks/`):
- `service-header` - Service detail page header
- `services-carousel` - Services carousel/slider (with server component)

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun deploy` | Deploy to Cloudflare Workers |
| `bun payload migrate:create` | Create new DB migration |
| `bun test` | Run all tests (integration + e2e) |
| `bun test:int` | Run integration tests (Vitest) |
| `bun test:e2e` | Run E2E tests (Playwright) |
| `bun lint` | Run ESLint |
| `bun generate:types` | Generate TypeScript types |

---

## Environment Variables

Required environment variables (see `.env.example`):
- `PAYLOAD_SECRET` - Secret key for Payload CMS
- `CLOUDFLARE_ENV` - Cloudflare environment (optional)

Cloudflare bindings (auto-configured via Wrangler):
- `D1` - Database binding
- `R2` - Storage bucket binding

---

## Important Files

| File | Purpose |
|------|---------|
| `src/payload.config.ts` | Main Payload CMS configuration |
| `src/payload-types.ts` | Auto-generated types (DO NOT EDIT) |
| `wrangler.jsonc` | Cloudflare Workers configuration |
| `next.config.ts` | Next.js configuration |
| `components.json` | shadcn/ui configuration |
| `src/seed.ts` | Database seeding logic |

---

## Testing Stack

- **Vitest** - Unit/Integration testing
- **Playwright** - E2E testing
- **@testing-library/react** - Component testing utilities

---

## Notes for AI Assistants

1. **Type Generation**: After modifying Payload collections, run `pnpm generate:types:payload`
2. **Migrations**: After schema changes, run `pnpm payload migrate:create`
3. **Block Development**: Always create both `.ts` (schema) and `.client.tsx` (component) files. For data-fetching blocks, use `.server.tsx` pattern (see `services-carousel`)
4. **Styling**: Use TailwindCSS 4.x syntax, component variants via CVA
5. **Language**: Project supports TR (Turkish) as primary with EN fallback
6. **Deployment**: Uses OpenNext for Cloudflare Workers compatibility
