/**
 * Serves `dist/` the way Vercel will (wiki: tech/usage/visual-qa.md § Local server): vercel.json redirects (with
 * header conditions), headers, `trailingSlash: true`, brotli/gzip for text, `404.html` with status 404. Lighthouse,
 * shots and e2e run against it, so local numbers include compression and the real redirect chains.
 *
 *   node scripts/serve.mjs [--port 4322] [--dir dist]
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

import { pathToRegexp } from "path-to-regexp";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const root = resolve(opt("dir", "dist"));
const port = Number(opt("port", "4322"));
const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".pdf": "application/pdf",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
};
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".mjs", ".json", ".txt", ".xml", ".svg", ".webmanifest"]);

const compile = (source) => {
  const keys = [];
  const regexp = pathToRegexp(source, keys);
  return { regexp, keys };
};
const redirects = (config.redirects ?? []).map((rule) => ({ ...rule, ...compile(rule.source) }));
const headerRules = (config.headers ?? []).map((rule) => ({ ...rule, ...compile(rule.source) }));

const hasMatches = (conditions, request) =>
  (conditions ?? []).every((condition) => {
    if (condition.type !== "header") return false;
    const value = request.headers[condition.key.toLowerCase()];
    if (value === undefined) return false;
    if (condition.value === undefined) return true;
    const flags = condition.value.startsWith("(?i)") ? "i" : "";
    return new RegExp(condition.value.replace(/^\(\?i\)/, ""), flags).test(String(value));
  });

const fill = (destination, keys, match) =>
  keys.reduce((out, key, index) => out.replaceAll(`:${key.name}`, match[index + 1] ?? ""), destination);

const cache = new Map();
function body(file, encoding) {
  const key = `${file}|${encoding}`;
  if (!cache.has(key)) {
    const raw = readFileSync(file);
    const data =
      encoding === "br"
        ? brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
        : encoding === "gzip"
          ? gzipSync(raw, { level: 9 })
          : raw;
    cache.set(key, data);
  }
  return cache.get(key);
}

function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const target = join(root, safe);
  if (!target.startsWith(root)) return null;
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, "index.html");
  if (existsSync(index)) return index;
  return null;
}

function send(request, response, file, status) {
  const type = TYPES[extname(file).toLowerCase()] ?? "application/octet-stream";
  const accept = String(request.headers["accept-encoding"] ?? "");
  const compressible = COMPRESSIBLE.has(extname(file).toLowerCase());
  const encoding = compressible ? (/\bbr\b/.test(accept) ? "br" : /\bgzip\b/.test(accept) ? "gzip" : null) : null;
  const data = body(file, encoding);
  response.statusCode = status;
  response.setHeader("Content-Type", type);
  response.setHeader("Content-Length", data.length);
  if (encoding) response.setHeader("Content-Encoding", encoding);
  if (compressible) response.setHeader("Vary", "Accept-Encoding");
  response.end(request.method === "HEAD" ? undefined : data);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${port}`);
  const { pathname } = url;

  for (const rule of headerRules) {
    if (!rule.regexp.test(pathname)) continue;
    for (const header of rule.headers) response.setHeader(header.key, header.value);
  }

  for (const rule of redirects) {
    const match = rule.regexp.exec(pathname);
    if (!match || !hasMatches(rule.has, request)) continue;
    response.statusCode = rule.permanent ? 308 : 307;
    response.setHeader("Location", fill(rule.destination, rule.keys, match) + url.search);
    return response.end();
  }

  const file = resolveFile(pathname);
  // trailingSlash: true → a page URL without the slash redirects to it (files keep their names).
  if (config.trailingSlash && file?.endsWith("index.html") && !pathname.endsWith("/")) {
    response.statusCode = 308;
    response.setHeader("Location", `${pathname}/${url.search}`);
    return response.end();
  }
  if (file) return send(request, response, file, 200);
  const notFound = join(root, "404.html");
  if (existsSync(notFound)) return send(request, response, notFound, 404);
  response.statusCode = 404;
  response.end("Not found");
});

server.listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
