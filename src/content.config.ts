import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const recipe = defineCollection({
  loader: glob({
    pattern: "{ingredients,meals,recipes}/**/[^_]*.md",
    base: "./src/data",
  }),
  schema: () =>
    z.object({
      title: z.string(),
      ingredients: z.optional(
        z.union([
          z.array(z.string()),
          z.record(z.string(), z.array(z.string())),
        ])
      ),
    }),
});

export const collections = { blog, recipe };
