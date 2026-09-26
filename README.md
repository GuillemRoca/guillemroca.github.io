# Guillem Roca's Personal Website

This is the source code for my personal website, hosted at [guillem.dev](https://guillem.dev). Built with [Astro](https://astro.build) and a custom "Ivory Serif" design (originally scaffolded from the [Zaggonaut](https://github.com/RATIU5/zaggonaut) template).

## Features

- **Professional / Personal toggle**: the homepage switches between two sides, and the palette follows:
  - Professional: night navy + gold (default)
  - Personal: warm ivory + sage
  - The mode comes from `?mode=professional|personal`, otherwise from the last choice (saved in `localStorage`), and is applied before first paint.
- **Flipping portrait**: a photo on the Professional side and an ink-and-wash sketch on the Personal side, inside slowly rotating rings. Clicking the portrait also switches sides.
- **Projects from GitHub**: pinned repositories (with stars and language colours) are fetched at build time and listed on the Professional side. Side projects are listed on the Personal side. There is no separate projects page, and `/projects` redirects to the homepage.
- **Blog-ready**: the Writing section and nav item appear automatically once `content/blogs/` has at least one post.

## Tech Stack

- **Framework**: Astro 6
- **Styling**: Tailwind CSS 4 + CSS variables (Cormorant Garamond and Source Serif 4 via Google Fonts)
- **Content**: Content Collections (TOML config + Markdown for blog)
- **Projects**: Dynamically fetched from [GitHub pinned repos](https://github.com/GuillemRoca) at build time
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions (daily scheduled rebuild)

## Project Structure

```text
/
├── content/
│   ├── configuration.toml    # Site config: meta, hero, about, personal side, links, menu, skills
│   └── blogs/                # Blog posts (Writing appears once there is one)
├── public/
│   ├── avatar-photo.webp     # Professional portrait
│   ├── avatar-sketch.webp    # Personal portrait (sketch)
│   ├── avatar.jpg            # Social card image
│   ├── favicon.ico
│   ├── CNAME
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── home/Hero.astro   # Toggle, flipping portrait and name
│   │   ├── common/           # Section (label-left row), Ornament, Arrow
│   │   └── ...               # Header, Footer, ProjectList, ArticleList, Stack, Elsewhere, PageHeading, Prose
│   ├── layouts/              # Layout (sets the mode before paint), BlogLayout
│   ├── lib/
│   │   ├── github-loader.ts  # Custom loader: fetches pinned repos from the GitHub GraphQL API
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── pages/                # Routes (index, blog, 404)
│   ├── styles/global.css     # Tailwind, Professional/Personal palettes, component classes
│   └── content.config.ts     # Content collection schemas
├── astro.config.mjs
├── biome.json
├── tsconfig.json
└── package.json
```

## Editing content

Almost everything on the homepage lives in `content/configuration.toml`:

- `[_.hero]`: role, company, portraits, and the short name and tagline for the Personal side
- `[_.about]`: the Professional "About" text
- `[_.personalSide]`: the Personal "About", `lately` entries and `sideProjects`
- `[_.personal]`: name and social links (used in "Elsewhere")
- `[_.skills]`: the "Stack" list

Projects come from the repositories pinned on the GitHub profile. Change the pins there, and the next build picks them up.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                                     | Action                                       |
| :------------------------------------------ | :------------------------------------------- |
| `pnpm install`                              | Installs dependencies                        |
| `GITHUB_TOKEN=$(gh auth token) pnpm dev`    | Starts local dev server at `localhost:4321`  |
| `GITHUB_TOKEN=$(gh auth token) pnpm build`  | Builds the production site to `./dist/`      |
| `pnpm preview`                              | Previews the build locally, before deploying |
| `pnpm lint`                                 | Lints with Biome                             |
| `pnpm format`                               | Formats with Biome                           |

> **Note**: `GITHUB_TOKEN` is required to fetch pinned repositories from GitHub. In CI it is provided automatically. Locally, `gh auth token` uses your GitHub CLI session.

## Deployment

The site is automatically deployed to GitHub Pages:
- **On push** to the `main` branch
- **Daily at 6:00 UTC** via scheduled cron (keeps pinned repos in sync)
- **Manually** via the "Run workflow" button in the Actions tab
