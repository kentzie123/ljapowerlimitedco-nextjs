import AboutUsPage from "@/components/pages/AboutUsPage";

// 1. METADATA (Server-side)
export const metadata = {
  title: "About Us | LJA Power Limited Co",
  description:
    "Learn about LJA Power Limited Co's mission to deliver reliable power solutions in Philippines. Discover our vision for quality generators & 24/7 support.",
  openGraph: {
    title: "About Us | LJA Power Limited Co",
    description:
      "Learn about LJA Power Limited Co's mission, vision, and values.",
    url: "https://ljapowerlimitedco.com/about",
    images: [
      {
        url: "https://ljapowerlimitedco.com/images/about-main-image.webp",
        width: 1200,
        height: 630,
        alt: "LJA Power Limited Co Team",
      },
    ],
  },
};

// 2. SCHEMA (JSON-LD)
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About LJA Power Limited Co",
  description:
    "Learn about LJA Power Limited Co's mission, vision, and values.",
  url: "https://ljapowerlimitedco.com/about",
  mainEntity: {
    "@id": "https://ljapowerlimitedco.com/#organization",
  },
  publisher: {
    "@id": "https://ljapowerlimitedco.com/#organization",
  },
};

export default function Page() {
  return (
    <>
      {/* Inject Schema here so it renders on the server */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <AboutUsPage />
    </>
  );
}
