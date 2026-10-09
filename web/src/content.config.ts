import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Long-form texts, one Markdown file per locale (wiki: site/i18n.md § Project texts). `projects`: the We Spark texts,
 * copied word for word from the 2025 dictionary by scripts/import-projects.mjs; the id is `<locale>/<slug>`. `lang` is
 * the language the text is written in, which can differ from the page's (Q35).
 */
const projects = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(),
    lang: z.enum(["en", "fr"]),
  }),
});

export const collections = { projects };
