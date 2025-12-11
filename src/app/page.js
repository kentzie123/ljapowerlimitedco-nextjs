import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import WhyChooseLJA from "@/components/layout/WhyChooseLJA";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import ServicesHomePage from "@/components/layout/ServicesHomePage";
import HomeCallToAction from "@/components/layout/HomeCallToAction";

// 1. SEO METADATA (Replaces React Helmet)
export const metadata = {
  title: "Diesel Generators & ATS Services | LJA Power Limited Co",
  description:
    "LJA Power Limited Co: Your trusted diesel generator supplier in Philippines. Expert ATS installation, preventive maintenance & complete power solutions. 24/7 service.",
  alternates: {
    canonical: "https://ljapowerlimitedco.com/",
  },
  openGraph: {
    title: "Diesel Generators & ATS Services | LJA Power Limited Co",
    description:
      "LJA Power Limited Co: Your trusted diesel generator supplier in Philippines. Expert ATS installation, preventive maintenance & complete power solutions. 24/7 service.",
    url: "https://ljapowerlimitedco.com/",
    siteName: "LJA Power Limited Co",
    images: [
      {
        url: "https://ljapowerlimitedco.com/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "LJA Power Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  // 2. SCHEMA (JSON-LD)
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://ljapowerlimitedco.com/#webpage",
        url: "https://ljapowerlimitedco.com/",
        name: "Diesel Generators & ATS Services | LJA Power Limited Co",
        description:
          "LJA Power Limited Co: Your trusted diesel generator supplier in Philippines. Expert ATS installation, preventive maintenance & complete power solutions. 24/7 service.",
        isPartOf: {
          "@id": "https://ljapowerlimitedco.com/#website",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://ljapowerlimitedco.com/images/hero1.webp",
          width: 1200,
          height: 630,
        },
        about: {
          "@id": "https://ljapowerlimitedco.com/#organization",
        },
      },
    ],
  };

  return (
    <>
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <div className="flex flex-col">
        <Hero />
        <About />
        <WhyChooseLJA />
        <FeaturedProducts />
        <ServicesHomePage />
        <HomeCallToAction />
      </div>
    </>
  );
}
