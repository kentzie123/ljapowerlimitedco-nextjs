import OurWorksPage from "@/components/pages/OurWorksPage";
import { works } from "@/constants";

export const metadata = {
  title: "Our Works | LJA Power Limited Co",
  description:
    "Browse our recent generator installations, deliveries, preventive maintenance work, and client success stories across the Philippines.",
    alternates: {
    canonical: "https://ljapowerlimitedco.com/our-works",
  },
  // ⛔️ THIS BLOCKS GOOGLE
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Field Operations Gallery | LJA Power Limited Co",
    description:
      "Browse our recent generator installations, deliveries, preventive maintenance work, and client success stories across the Philippines.",
    url: "https://ljapowerlimitedco.com/our-works",
    images: ["https://ljapowerlimitedco.com/images/ServicesPageHeroImg.webp"],
  },
};

export default function Page() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Field Operations Log | LJA Power Limited Co",
    description:
      "A documented log of our successful field operations including installations, maintenance, and deliveries.",
    url: "https://ljapowerlimitedco.com/our-works",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (works || []).slice(0, 10).map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://ljapowerlimitedco.com/our-works/${work.slug}`,
        name: work.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <OurWorksPage />
    </>
  );
}
