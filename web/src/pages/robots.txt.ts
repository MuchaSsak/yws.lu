import type { APIRoute } from "astro";

/**
 * robots.txt (wiki: site/seo.md § Crawl): everything allowed, the sitemap on this build's origin. Review builds serve
 * the same file: blocking them would hide their `noindex` from crawlers. No AI-crawler rules until Q34.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site).href}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
