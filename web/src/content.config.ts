import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Long-form texts, one Markdown file per locale (wiki: site/i18n.md § Project texts). `projects`: the We Spark texts,
 * copied word for word from the 2025 dictionary by scripts/import-projects.mjs; the id is `<locale>/<slug>`. `lang` is
 * the language the text is written in, which can differ from the page's (Q35). `legal`: the privacy policy and the
 * legal notice (wiki: legal/compliance-and-data.md), id `<locale>/<privacy|legal>`, `updated` = the version date;
 * legal.test.ts keeps both locales in step and their contact facts equal to organisation.ts.
 */
const projects = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(),
    lang: z.enum(["en", "fr"]),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { projects, legal };
