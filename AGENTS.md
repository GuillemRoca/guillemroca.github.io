# AGENTS.md

## Project Overview
This is the personal website of Guillem Roca, hosted at [guillem.dev](https://guillem.dev). The project is a static site built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Tech Stack
- **Framework**: Astro
- **Language**: TypeScript, HTML, CSS (standard)
- **Asset Management**: `src/assets` for images (optimized), `public` for static files
- **Deployment**: GitHub Pages via GitHub Actions
- **Package Manager**: npm

## Key Files & Directories
- `astro.config.mjs`: Main Astro configuration.
- `src/pages/`: Contains the site's pages. Files here become routes.
- `src/layouts/`: Shared layout components (e.g., `Layout.astro`).
- `src/components/`: Reusable UI components.
- `src/assets/`: Images to be optimized by Astro.
- `public/`: Static assets (fonts, `CNAME`, etc.) served at the root.
- `.github/workflows/deploy.yml`: GitHub Actions workflow for automatic deployment.

## Development Commands
- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev` (Runs on `http://localhost:4321`)
- **Build for Production**: `npm run build` (Outputs to `dist/`)
- **Preview Production Build**: `npm run preview`

## Deployment
The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.
- **Workflow**: `.github/workflows/deploy.yml` utilizes `withastro/action` and `actions/deploy-pages`.
- **Configuration**: `site` is set in `astro.config.mjs`.

## Code Style & Conventions
- Use strictly typed TypeScript where possible.
- Prefer Astro components (`.astro`) for UI structure.
- Keep components small and focused.
- Ensure semantic HTML usage.
