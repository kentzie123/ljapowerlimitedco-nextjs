import ServicesPage from "@/components/pages/ServicesPage";

export const metadata = {
  title:
    "Generator Services | Maintenance & Installation | LJA Power Limited Co",
  description:
    "Professional generator services: preventive maintenance, ATS installation, troubleshooting & repairs. 24/7 support across Philippines. LJA Power Limited Co",
  alternates: {
    canonical: "https://ljapowerlimitedco.com/services",
  },
  openGraph: {
    title: "Generator Services | Maintenance & Installation",
    description:
      "Professional generator services: preventive maintenance, ATS installation, troubleshooting & repairs. 24/7 support across Philippines.",
    url: "https://ljapowerlimitedco.com/services",
    images: ["https://ljapowerlimitedco.com/images/ServicesPageHeroImg.webp"],
  },
};

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Generator Services",
    description:
      "Comprehensive power generation solutions including Maintenance, Installation, and Repair.",
    provider: {
      "@id": "https://ljapowerlimitedco.com/#organization",
    },
    areaServed: { "@type": "Country", name: "Philippines" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Generator Services",
      // Note: You can manually duplicate the list from your component here
      // OR just keep this high-level summary if you don't want to duplicate data across files
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Preventive Maintenance" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "ATS Installation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Troubleshooting" },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesPage />
    </>
  );
}
