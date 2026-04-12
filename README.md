# Guillem Roca's Personal Website

This is the source code for my personal website, hosted at [guillem.dev](https://guillem.dev). Built with [Astro](https://astro.build) using the [Zaggonaut](https://github.com/RATIU5/zaggonaut) template.

## Tech Stack

- **Framework**: Astro 6
- **Styling**: Tailwind CSS 4
- **Content**: Content Collections (TOML config + Markdown)
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```text
/
├── content/
│   ├── configuration.toml    # Site-wide config (meta, hero, socials, skills)
│   ├── projects/             # Project markdown files
│   └── blogs/                # Blog post markdown files
├── public/
│   ├── favicon.ico
│   ├── CNAME
│   └── robots.txt
├── src/
│   ├── components/           # Reusable UI components
│   ├── layouts/              # Page layouts
│   ├── lib/                  # Utilities and types
│   ├── pages/                # Routes (index, blog, projects, 404)
│   ├── styles/               # Global CSS with Tailwind
│   └── content.config.ts     # Content collection schemas
├── astro.config.mjs
├── biome.json
├── tsconfig.json
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                       |
| :--------------- | :------------------------------------------- |
| `pnpm install`   | Installs dependencies                        |
| `pnpm dev`       | Starts local dev server at `localhost:4321`   |
| `pnpm build`     | Build your production site to `./dist/`       |
| `pnpm preview`   | Preview your build locally, before deploying  |
| `pnpm lint`      | Lint with Biome                               |
| `pnpm format`    | Format with Biome                             |

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.
