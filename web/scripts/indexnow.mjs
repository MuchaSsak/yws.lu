#!/usr/bin/env node
/**
 * IndexNow (wiki: site/seo.md § Verification and IndexNow): tells Bing and the other participants which URLs changed.
 * An owner step after a production deploy (site/seo.md § Launch 9); never run against a preview.
 *
 *   node scripts/indexnow.mjs --new-key   once: writes public/<key>.txt (32 hex chars, random, never typed)
 *   node scripts/indexnow.mjs [--all]     POST the built sitemap's URLs that the live sitemap lacks (--all: every URL)
 *   node scripts/indexnow.mjs --dry       print what would be sent
 *
 * Refuses unless the key file answers 200 on the live site. 200/202 pass; anything else fails.
 */
import { randomUUID } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { SITE_URL } from "./launch.mjs";
import { DIST, ROOT } from "./routes.mjs";

const argv = process.argv.slice(2);
const PUBLIC = join(ROOT, "public");
const keyFiles = () => readdirSync(PUBLIC).filter((file) => /^[0-9a-f]{32}\.txt$/.test(file));

if (argv.includes("--new-key")) {
  if (keyFiles().length) throw new Error(`a key already exists: public/${keyFiles()[0]}`);
  const key = randomUUID().replaceAll("-", "");
  writeFileSync(join(PUBLIC, `${key}.txt`), key);
  console.log(`indexnow: wrote public/${key}.txt (commit it; it is public by design)`);
  process.exit(0);
}

const [file] = keyFiles();
if (!file) throw new Error("no key: run `node scripts/indexnow.mjs --new-key` first");
const key = file.replace(/\.txt$/, "");
const keyLocation = `${SITE_URL}/${file}`;

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const built = readdirSync(DIST)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .flatMap((name) => locs(readFileSync(join(DIST, name), "utf8")));

let urls = built;
if (!argv.includes("--all")) {
  const index = await fetch(`${SITE_URL}/sitemap-index.xml`).then((r) => (r.ok ? r.text() : ""));
  const live = new Set();
  for (const map of locs(index)) for (const url of locs(await fetch(map).then((r) => (r.ok ? r.text() : "")))) live.add(url);
  urls = built.filter((url) => !live.has(url));
}
if (!urls.length) {
  console.log("indexnow: nothing new to send (use --all to send every URL)");
  process.exit(0);
}

const body = { host: new URL(SITE_URL).host, key, keyLocation, urlList: urls };
if (argv.includes("--dry")) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}
const check = await fetch(keyLocation, { redirect: "manual" });
if (check.status !== 200 || (await check.text()).trim() !== key) throw new Error(`${keyLocation} must answer 200 with the key`);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
console.log(`indexnow: ${response.status} for ${urls.length} URL(s)`);
if (![200, 202].includes(response.status)) process.exit(1);
