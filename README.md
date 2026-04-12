# Guillem Roca's Personal Website

This is the source code for my personal website, hosted at [guillem.dev](https://guillem.dev). Built with [Astro](https://astro.build) using the [Zaggonaut](https://github.com/RATIU5/zaggonaut) template.

## Tech Stack

- **Framework**: Astro 6
- **Styling**: Tailwind CSS 4
- **Content**: Content Collections (TOML config + Markdown for blog)
- **Projects**: Dynamically fetched from [GitHub pinned repos](https://github.com/GuillemRoca) at build time
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions (daily scheduled rebuild)

## Project Structure

```text
/
├── content/
│   ├── configuration.toml    # Site-wide config (meta, hero, socials, skills)
│   └── blogs/                # Blog post markdown files
├── public/
│   ├── favicon.ico
│   ├── CNAME
│   └── robots.txt
├── src/
│   ├── components/           # Reusable UI components
│   ├── layouts/              # Page layouts
│   ├── lib/
│   │   ├── github-loader.ts  # Custom loader: fetches pinned repos from GitHub GraphQL API
│   │   ├── types.ts
│   │   └── utils.ts
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
| `GITHUB_TOKEN=$(gh auth token) pnpm dev`  | Starts local dev server at `localhost:4321` |
| `GITHUB_TOKEN=$(gh auth token) pnpm build` | Build your production site to `./dist/`    |
| `pnpm preview`   | Preview your build locally, before deploying  |
| `pnpm lint`      | Lint with Biome                               |
| `pnpm format`    | Format with Biome                             |

> **Note**: `GITHUB_TOKEN` is required to fetch pinned repositories from GitHub. In CI it is provided automatically. Locally, `gh auth token` uses your GitHub CLI session.

## Deployment

The site is automatically deployed to GitHub Pages:
- **On push** to the `main` branch
- **Daily at 6:00 UTC** via scheduled cron (keeps pinned repos in sync)
- **Manually** via the "Run workflow" button in the Actions tab
