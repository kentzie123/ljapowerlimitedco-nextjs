import ProductDetailsPage from "@/components/pages/ProductDetailsPage";
import { generators } from "@/constants";

// 1. GENERATE METADATA (Dynamic SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params; // await params in Next.js 15+
  const product = generators.find((g) => g.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The generator you are looking for does not exist.",
    };
  }

  const images =
    product.images?.map((img) => `https://ljapowerlimitedco.com${img}`) || [];

  return {
    title: product.name,
    description:
      product.description ||
      `Buy ${product.name} generator. Reliable power solutions from LJA Power Limited Co.`,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://ljapowerlimitedco.com/products/${slug}`,
      images: images,
    },
  };
}

// 2. SERVER COMPONENT
export default async function Page({ params }) {
  const { slug } = await params;
  const product = generators.find((g) => g.slug === slug);

  // If no product found, the Client Component will handle the 404 UI
  if (!product) {
    return <ProductDetailsPage />;
  }

  // 3. PRODUCT SCHEMA (JSON-LD)
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => `https://ljapowerlimitedco.com${img}`),
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "LJA Power Limited Co" },
    sku: product.slug,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      url: `https://ljapowerlimitedco.com/products/${product.slug}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "PHP",
      price: "0",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailsPage />
    </>
  );
}
