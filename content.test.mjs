import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  ROUTES,
  SITE,
  PROJECTS,
  PROFESSIONAL_PROJECTS,
  EXPERIENCE,
  EDUCATION,
  SOCIALS,
} from "./content.js";

const routes = new Map(ROUTES.map((route) => [route.path, route]));
test("route identifiers are unique, canonical and titled", () => {
  assert.equal(routes.size, ROUTES.length);
  for (const route of ROUTES) {
    assert.ok(route.title.trim(), route.path);
    assert.equal(
      new URL(route.path, "https://portfolio.test").pathname,
      route.path,
    );
    assert.ok(route.path === "/" || !route.path.endsWith("/"));
  }
});
test("all folder, image, related and parent links resolve", () => {
  for (const route of ROUTES) {
    const links = [
      ...(route.items || []),
      ...(route.photos || []),
      ...(route.related || []),
    ].map((item) => item.to);
    if (route.parent) links.push(route.parent);
    if (route.section) links.push(route.section);
    for (const link of links) {
      if (link.startsWith("https://"))
        assert.equal(new URL(link).protocol, "https:");
      else assert.ok(routes.has(link), `${route.path} links to ${link}`);
    }
  }
});
test("parent chains terminate without cycles", () => {
  for (const route of ROUTES) {
    const visited = new Set();
    let page = route;
    while (page?.parent) {
      assert.ok(
        !visited.has(page.path),
        `${route.path} contains a parent cycle`,
      );
      visited.add(page.path);
      page = routes.get(page.parent);
    }
  }
});
test("all twelve personal projects retain their real images and demos", () => {
  assert.equal(PROJECTS.length, 12);
  for (const project of PROJECTS) {
    const route = routes.get(`/projects/${project.id}`);
    assert.equal(route.href, project.href);
    assert.equal(route.image, project.image);
    assert.ok(fs.existsSync(`public/images/${project.image}`));
  }
  assert.equal(routes.get(SITE.gallery).photos.length, 12);
  assert.equal(routes.get("/archive/websites").items.length, 5);
  assert.equal(routes.get("/archive/web-apps").items.length, 7);
});
test("professional, resume and contact data preserve owner-approved counts", () => {
  assert.equal(PROFESSIONAL_PROJECTS.length, 4);
  assert.equal(EXPERIENCE.length, 3);
  assert.equal(EDUCATION.length, 2);
  assert.equal(SOCIALS.length, 3);
  assert.equal(routes.get("/work").items.length, 4);
  assert.ok(
    routes.get("/resume/pavan").sections[0].meta.endsWith("2025–Present"),
  );
  const languages = routes.get("/resume/languages").sections;
  assert.equal(
    languages.find((item) => item.title === "English").paragraphs[0],
    "B2",
  );
  const french = languages.find((item) => item.title === "French");
  assert.ok(french && !french.meta && !french.paragraphs);
});
test("runtime content contains no reference-owner media or private contacts", () => {
  const runtime =
    fs.readFileSync("App.jsx", "utf8") + fs.readFileSync("content.js", "utf8");
  assert.doesNotMatch(
    runtime,
    /adamclambert|adam lambert|gravy|narrativesupply|framerusercontent|youtube\.com|\/reference\/|mailto:|tel:|\.pdf/i,
  );
  assert.ok(ROUTES.every((route) => !route.media && !route.audio));
  assert.ok(!fs.existsSync("public/reference"));
  assert.ok(fs.existsSync(`public${SITE.portrait}`));
});
test("public output excludes private resume and audio/video files", () => {
  const files = fs.readdirSync("public", { recursive: true });
  assert.ok(files.every((file) => !/\.(pdf|mp3|mp4|env)$/i.test(file)));
});
test("Vercel routes handle deep links and dotted unknown IDs without rewriting assets", () => {
  const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  const rule = new RegExp(`^${config.rewrites[0].source}$`);
  for (const path of ["/", "/projects/music", "/resume/pavan", "/unknown.file"])
    assert.ok(rule.test(path), path);
  for (const path of [
    "/assets/app.js",
    "/images/portrait.jpg",
    "/retro/ms-sans.woff2",
    "/favicon.svg",
  ])
    assert.ok(!rule.test(path), path);
  assert.match(fs.readFileSync("vite.config.js", "utf8"), /base:\s*"\/"/);
});
