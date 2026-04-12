import type { Loader } from "astro/loaders";

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
  pushedAt: string;
  primaryLanguage: { name: string } | null;
}

interface GraphQLResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: PinnedRepo[];
      };
    };
  };
}

const QUERY = `{
  user(login: "GuillemRoca") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
          pushedAt
          primaryLanguage { name }
        }
      }
    }
  }
}`;

export function githubPinnedLoader(): Loader {
  return {
    name: "github-pinned",
    load: async ({ store, logger, parseData }) => {
      const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

      if (!token) {
        logger.warn(
          "GITHUB_TOKEN not set — skipping pinned repos fetch. Set it in .env or as an environment variable.",
        );
        return;
      }

      logger.info("Fetching pinned repositories from GitHub...");

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: QUERY }),
      });

      if (!res.ok) {
        logger.error(`GitHub API returned ${res.status}: ${await res.text()}`);
        return;
      }

      const json = (await res.json()) as GraphQLResponse;
      const repos = json.data.user.pinnedItems.nodes;

      store.clear();

      for (const repo of repos) {
        const slug = repo.name.toLowerCase();
        const tags = repo.repositoryTopics.nodes.map((t) => t.topic.name);
        if (repo.primaryLanguage) {
          tags.unshift(repo.primaryLanguage.name);
        }

        const data = await parseData({
          id: slug,
          data: {
            title: repo.name,
            slug,
            description: repo.description ?? repo.name,
            githubUrl: repo.url,
            liveDemoUrl: repo.homepageUrl || undefined,
            tags,
            timestamp: new Date(repo.pushedAt),
            featured: true,
          },
        });

        store.set({ id: slug, data });
      }

      logger.info(`Loaded ${repos.length} pinned repositories.`);
    },
  };
}
