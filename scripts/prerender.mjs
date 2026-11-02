// Runs after the client + SSR builds: injects server-rendered HTML into dist/index.html
// so essential content is readable without JavaScript, then writes robots/sitemap.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-server");
const { render, headTags, applyPageMeta, routes } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const builtOn = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "") || null;

const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// One static HTML file per route: dist/index.html for "/", dist/about/index.html for "/about".
for (const route of routes) {
  const html = applyPageMeta(shell, route)
    .replace('<html lang="en">', `<html lang="en" data-built="${builtOn}">`)
    .replace("<!--head-tags-->", headTags(siteUrl, route))
    .replace("<!--app-html-->", render(builtOn, route));
  const out = route === "/" ? dist : path.join(dist, route.slice(1));
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "index.html"), html);
}

const robots = ["User-agent: *", "Allow: /"];
if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
fs.writeFileSync(path.join(dist, "robots.txt"), robots.join("\n") + "\n");

if (siteUrl) {
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${builtOn}</lastmod></url>`).join("\n")}\n</urlset>\n`,
  );
} else {
  console.warn("SITE_URL not set: canonical URL and sitemap.xml skipped. Set it for production builds.");
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages (built ${builtOn})`);
