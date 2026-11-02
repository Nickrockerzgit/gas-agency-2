import { renderToString } from "react-dom/server";
import App from "./App";
import { company } from "./data/company";
import { localBusinessJsonLd } from "./lib/jsonld";
import { routes, setServerPath } from "./lib/router";
import { setBuiltOn } from "./lib/today";

export { routes };

const pageMeta: Record<(typeof routes)[number], { title: string; description: string } | null> = {
  "/": null,
  "/about": {
    title: `About Us | ${company.legalName}`,
    description: `${company.legalName} is a commercial LPG distributor supplying cylinders to restaurants, hotels, caterers and commercial kitchens.`,
  },
};

export function render(builtOn: string, path: string): string {
  setBuiltOn(builtOn);
  setServerPath(path);
  return renderToString(<App />);
}

/** Replaces the default <title> and description in the shell for routes that have their own. */
export function applyPageMeta(html: string, path: (typeof routes)[number]): string {
  const meta = pageMeta[path];
  if (!meta) return html;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${meta.description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${meta.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${meta.description}$2`);
}

export function headTags(siteUrl: string | null, path: (typeof routes)[number]): string {
  const site = siteUrl ?? company.siteUrl;
  const tags: string[] = [];
  if (site) {
    const url = `${site}${path === "/" ? "/" : path}`;
    tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`);
  }
  const json = JSON.stringify(localBusinessJsonLd(site)).replace(/</g, "\u003c");
  tags.push(`<script type="application/ld+json">${json}</script>`);
  return tags.join("\n    ");
}
