import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { parse as parseToml } from "toml";
import { githubPinnedLoader } from "./lib/github-loader";

/**
 * Loader and schema for the configuration collection.
 */
const configuration = defineCollection({
  loader: file("content/configuration.toml", {
    parser: (text) => JSON.parse(JSON.stringify(parseToml(text))),
  }),
  schema: z.object({
    site: z.object({
      baseUrl: z.url(),
    }),

    globalMeta: z.object({
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      cardImage: z.url().optional(),
      keywords: z.array(z.string()).optional(),
    }),

    notFoundMeta: z.object({
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      cardImage: z.url().optional(),
      keywords: z.array(z.string()).optional(),
    }),

    blogMeta: z.object({
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      cardImage: z.url().optional(),
      keywords: z.array(z.string()).optional(),
    }),

    hero: z.object({
      role: z.string(),
      specialty: z.string().optional(),
      location: z.string().optional(),
      company: z.string().optional(),
      companyUrl: z.url().optional(),
      image: z.string().optional(),
      imageAlt: z.string().default(""),
      shortName: z.string().optional(),
      personalImage: z.string().optional(),
      personalImageAlt: z.string().default(""),
      personalTagline: z.string().optional(),
    }),

    about: z.object({
      lead: z.string(),
      body: z.array(z.string()).default([]),
    }),

    personalSide: z
      .object({
        lead: z.string(),
        body: z.array(z.string()).default([]),
        lately: z
          .array(
            z.object({
              label: z.string(),
              text: z.string(),
              url: z.url().optional(),
            }),
          )
          .default([]),
        sideProjects: z
          .array(
            z.object({
              name: z.string(),
              description: z.string(),
              url: z.url(),
              language: z.string().optional(),
            }),
          )
          .default([]),
      })
      .optional(),

    personal: z.object({
      name: z.string().default("Zaggonaut"),
      githubProfile: z.url().optional(),
      twitterProfile: z.url().optional(),
      linkedinProfile: z.url().optional(),
      blueskyProfile: z.url().optional(),
      contactEmail: z.string().email().optional(),
    }),

    texts: z.object({
      articlesName: z.string().default("Articles"),
      projectsName: z.string().default("Projects"),
      viewAll: z.string().default("View All"),
      noArticles: z.string().default("No articles found."),
      noProjects: z.string().default("No projects found."),
    }),

    menu: z.object({
      home: z.string().default("/"),
      writing: z.string().default("/blog"),
    }),

    skills: z
      .object({
        list: z.array(z.string()).default([]),
      })
      .optional(),
  }),
});

/**
 * Loader and schema for the blog collection.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/blogs" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().optional(),
      description: z.string(),
      longDescription: z.string().optional(),
      cardImage: z.url().optional(),
      tags: z.array(z.string()).optional(),
      readTime: z.number().optional(),
      featured: z.boolean().default(false),
      timestamp: z.date().transform((val) => new Date(val)),
    })
    .transform((data) => {
      const slug =
        data.slug ??
        data.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      return { ...data, slug };
    }),
});

/**
 * Loader and schema for the project collection.
 * Fetches pinned repositories from GitHub at build time.
 */
const project = defineCollection({
  loader: githubPinnedLoader(),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    cardImage: z.url().optional(),
    tags: z.array(z.string()).optional(),
    githubUrl: z.url().optional(),
    liveDemoUrl: z.url().optional(),
    language: z.string().optional(),
    languageColor: z.string().optional(),
    stars: z.number().default(0),
    timestamp: z.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, project, configuration };
