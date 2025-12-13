import { generators, contacts } from "@/constants";
// 1. Removed 'works' from import because those pages are noindex (blocked)

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://ljapowerlimitedco.com";

  // 1. Define your static pages
  const staticPages = [
    "",
    "/about",
    "/products",
    "/services",
    "/contacts",
    // Removed "/our-works" because we set it to robot: noindex
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
    // REMOVED: lastModified (Better to have no date than a fake date)
  }));

  // 2. Generate URLs for all Products
  const productUrls = generators.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. REMOVED: "Our Works" logic
  // (Don't put blocked pages in a sitemap)

  // 4. Generate URLs for Branch Location pages
  const branchUrls = contacts.map((contact) => ({
    url: `${baseUrl}/branches/${contact.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // 5. Combine everything
  return [...staticPages, ...productUrls, ...branchUrls];
}
