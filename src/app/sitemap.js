import { generators, works, contacts } from "@/constants";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://ljapowerlimitedco.com";

  // 1. Define your static pages
  const staticPages = [
    "",
    "/about",
    "/products",
    "/services",
    "/our-works",
    "/contacts",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Generate URLs for all Products
  const productUrls = generators.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Generate URLs for all "Our Works" projects
  const workUrls = works.map((work) => ({
    url: `${baseUrl}/our-works/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 4. Generate URLs for Branch Location pages
  const branchUrls = contacts.map((contact) => ({
    url: `${baseUrl}/branches/${contact.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // 5. Combine everything
  return [...staticPages, ...productUrls, ...workUrls, ...branchUrls];
}
