import ProductDetailsPage from "@/components/pages/ProductDetailsPage";
import { generators } from "@/constants";

export async function generateStaticParams() {
  return generators.map((product) => ({
    slug: product.slug,
  }));
}

// ✅ HELPER: Generate the SEO-optimized title
// Logic: Extract ONLY the brand name from the engine string
// Example: "FAWDE 4DW91-38D" -> becomes -> "FAWDE"
const getSeoTitle = (product) => {
  // Get the first word of the engine (The Brand)
  const engineBrand = product.engine ? product.engine.split(" ")[0] : "";

  // Result: "15 Kva FAWDE Diesel Generator Price Philippines"
  return `${product.standbyPower} ${engineBrand} Diesel Generator Price Philippines`;
};

// 1. GENERATE METADATA (Dynamic SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = generators.find((g) => g.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The generator you are looking for does not exist.",
    };
  }

  const images =
    product.images?.map((img) => `https://ljapowerlimitedco.com${img}`) || [];

  // Generate the clean title
  const seoTitle = getSeoTitle(product);

  return {
    title: seoTitle,
    description:
      product.description ||
      `Buy ${product.name} generator. Reliable power solutions from LJA Power Limited Co.`,
    alternates: {
      canonical: `https://ljapowerlimitedco.com/products/${slug}`,
    },
    openGraph: {
      title: seoTitle,
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

  // Calculate a dynamic date 1 year from now for "priceValidUntil"
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split("T")[0];

  // Use the same clean title for Schema
  const seoTitle = getSeoTitle(product);

  // 3. PRODUCT SCHEMA (JSON-LD)
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: seoTitle,
    image: product.images?.map((img) => `https://ljapowerlimitedco.com${img}`),
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "LJA Power Limited Co" },
    sku: product.slug,
    itemCondition: "https://schema.org/NewCondition",

    // NOTE: Uncomment ONLY if you have real reviews.
    /*
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1"
    },
    */

    offers: {
      "@type": "Offer",
      url: `https://ljapowerlimitedco.com/products/${product.slug}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "PHP",
      price: "0",

      priceValidUntil: priceValidUntil,

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "PH",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
      },

      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "PHP",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PH",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
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
