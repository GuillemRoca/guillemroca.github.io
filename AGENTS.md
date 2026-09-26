# AGENTS.md

## Project Overview
This is the personal website of Guillem Roca, hosted at [guillem.dev](https://guillem.dev). The project is a static site built with [Astro](https://astro.build) with a custom "Ivory Serif" design (originally scaffolded from the [Zaggonaut](https://github.com/RATIU5/zaggonaut) template) and deployed to GitHub Pages.

## Tech Stack
- **Framework**: Astro 6
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Language**: TypeScript, HTML
- **Content**: Content Collections with TOML (configuration) and Markdown (blog)
- **Projects**: Dynamically fetched from GitHub pinned repositories at build time via GraphQL API
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions (daily scheduled rebuild at 6:00 UTC)
- **Theme**: Ivory Serif — Cormorant Garamond + Source Serif 4. The homepage Professional / Personal toggle drives the palette via `<html data-mode>`: Professional = night navy + gold (default), Personal = warm ivory + sage. The mode comes from `?mode=`, else the last choice in `localStorage`, set by an inline script in `Layout.astro` before paint.

## Key Files & Directories
- `astro.config.mjs`: Main Astro configuration (includes Tailwind CSS plugin and `site` URL).
- `src/content.config.ts`: Content collection schemas (configuration, blog, project).
- `src/lib/github-loader.ts`: Custom Astro content loader that fetches pinned repos from GitHub GraphQL API.
- `content/configuration.toml`: Site-wide configuration (metadata, hero, about, personal side of the Professional/Personal toggle, links, menu, skills).
- `content/blogs/`: Markdown files for blog posts. The Writing section and nav item appear automatically once at least one post exists.
- `src/pages/`: Page routes (index, 404, blog/). Projects live on the homepage; `/projects` redirects to `/` (see `redirects` in `astro.config.mjs`).
- `src/layouts/`: Layout components (Layout, BlogLayout).
- `src/components/`: Reusable UI components (Header, Footer, ProjectList, ArticleList, Stack, Elsewhere, PageHeading, Prose).
- `src/components/home/`: Homepage-specific components (Hero with the Professional/Personal toggle and the flipping photo/sketch portrait).
- `src/components/common/`: Shared primitives (Section = label-left row, Ornament, Arrow).
- `src/lib/`: Utility functions, types, and the GitHub loader.
- `src/styles/global.css`: Tailwind imports, Ivory light/dark CSS variables, and component classes.
- `biome.json`: Biome linter/formatter configuration.
- `public/`: Static assets (favicon.ico, avatar-photo.webp / avatar-sketch.webp portraits, avatar.jpg social card, CNAME, robots.txt).
- `.github/workflows/deploy.yml`: GitHub Actions workflow for automatic deployment (push + daily cron).

## Development Commands
- **Install Dependencies**: `pnpm install`
- **Start Dev Server**: `GITHUB_TOKEN=$(gh auth token) pnpm dev` (Runs on `http://localhost:4321`)
- **Build for Production**: `GITHUB_TOKEN=$(gh auth token) pnpm build` (Outputs to `dist/`)
- **Preview Production Build**: `pnpm preview`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`

> **Note**: `GITHUB_TOKEN` is required to fetch pinned repositories. In CI it is provided automatically via `secrets.GITHUB_TOKEN`. Locally, use `gh auth token` as shown above.

## Deployment
The site is automatically deployed to GitHub Pages:
- **On push** to the `main` branch.
- **Daily at 6:00 UTC** via a scheduled cron job (keeps pinned repos in sync).
- **Manually** via the "Run workflow" button in the Actions tab.
- **Workflow**: `.github/workflows/deploy.yml` utilizes `withastro/action` (with `pnpm@10.6.0`) and `actions/deploy-pages`.
- **Configuration**: `site` is set in `astro.config.mjs`.

## Code Style & Conventions
- Use strictly typed TypeScript where possible.
- Prefer Astro components (`.astro`) for UI structure.
- Keep components small and focused.
- Ensure semantic HTML usage.
- Use Biome for consistent formatting (space indent, double quotes) and linting.
- Blog content is managed via Markdown files in `content/blogs/`.
- Projects are sourced dynamically from GitHub pinned repositories — no project files to maintain.
