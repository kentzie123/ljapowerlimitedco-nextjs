import ProductsPage from "@/components/pages/ProductsPage";
import { generators } from "@/constants";

// Helper to calculate min/max power for SEO description
const getPowerRange = () => {
  const getPowerValue = (str) => {
    if (!str) return 0;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  return generators.reduce(
    (range, generator) => {
      const power = getPowerValue(generator.standbyPower);
      if (power < range.min) range.min = power;
      if (power > range.max) range.max = power;
      return range;
    },
    { min: Infinity, max: -Infinity }
  );
};

const { min, max } = getPowerRange();

export const metadata = {
  title: "Diesel Generators Catalogue | LJA Power Limited Co",
  description: `Browse ${generators.length} diesel generators (${min}-${max}kVA) from top brands like FAW, Cummins & Isuzu. Philippines Supplier.`,
  openGraph: {
    title: "Diesel Generators Catalogue | LJA Power Limited Co",
    description: `Browse ${generators.length} diesel generators (${min}-${max}kVA) from top brands like FAW, Cummins & Isuzu. Philippines Supplier.`,
    url: "https://ljapowerlimitedco.com/products",
    images: ["https://ljapowerlimitedco.com/images/abt1.webp"],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Diesel Generators Collection | LJA Power Limited Co",
  description: `${generators.length} diesel generators available. ${min}kVA to ${max}kVA range.`,
  url: "https://ljapowerlimitedco.com/products",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: generators.length,
    itemListElement: generators.map((gen, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://ljapowerlimitedco.com/products/${gen.slug}`,
      name: gen.name,
    })),
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ProductsPage />
    </>
  );
}
