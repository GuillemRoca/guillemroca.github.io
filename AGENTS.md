# AGENTS.md

## Project Overview
This is the personal website of Guillem Roca, hosted at [guillem.dev](https://guillem.dev). The project is a static site built with [Astro](https://astro.build) using the [Zaggonaut](https://github.com/RATIU5/zaggonaut) template and deployed to GitHub Pages.

## Tech Stack
- **Framework**: Astro 6
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Language**: TypeScript, HTML
- **Content**: Content Collections with TOML (configuration) and Markdown (blog/projects)
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions

## Key Files & Directories
- `astro.config.mjs`: Main Astro configuration (includes Tailwind CSS plugin and `site` URL).
- `src/content.config.ts`: Content collection schemas (configuration, blog, project).
- `content/configuration.toml`: Site-wide configuration (metadata, hero, personal info, menu, skills).
- `content/projects/`: Markdown files for each project.
- `content/blogs/`: Markdown files for blog posts.
- `src/pages/`: Page routes (index, 404, blog/, projects/).
- `src/layouts/`: Layout components (Layout, BlogLayout, ProjectLayout).
- `src/components/`: Reusable UI components (Header, Footer, ThemeToggle, etc.).
- `src/components/home/`: Homepage-specific components (Hero, Skills, FeaturedProjects, FeaturedArticles).
- `src/components/common/`: Shared primitives (Anchor, Section).
- `src/lib/`: Utility functions and types.
- `src/styles/global.css`: Tailwind imports, theme variables, and custom utility classes.
- `biome.json`: Biome linter/formatter configuration.
- `public/`: Static assets (favicon.ico, CNAME, robots.txt).
- `.github/workflows/deploy.yml`: GitHub Actions workflow for automatic deployment.

## Development Commands
- **Install Dependencies**: `pnpm install`
- **Start Dev Server**: `pnpm dev` (Runs on `http://localhost:4321`)
- **Build for Production**: `pnpm build` (Outputs to `dist/`)
- **Preview Production Build**: `pnpm preview`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`

## Deployment
The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.
- **Workflow**: `.github/workflows/deploy.yml` utilizes `withastro/action` (with `pnpm@10.6.0`) and `actions/deploy-pages`.
- **Configuration**: `site` is set in `astro.config.mjs`.

## Code Style & Conventions
- Use strictly typed TypeScript where possible.
- Prefer Astro components (`.astro`) for UI structure.
- Keep components small and focused.
- Ensure semantic HTML usage.
- Use Biome for consistent formatting (space indent, double quotes) and linting.
- Content is managed via Astro Content Collections — add new projects/blog posts as Markdown files.
