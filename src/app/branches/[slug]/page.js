import BranchContactPage from "@/components/pages/BranchContactPage";
import { contacts } from "@/constants";


export async function generateStaticParams() {
  return contacts.map((contact) => ({
    slug: contact.slug,
  }));
}

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { branchSlug } = await params;
  const branchData = contacts.find((c) => c.slug === branchSlug);

  if (!branchData) {
    return {
      title: "Branch Not Found | LJA Power Limited Co",
      description: "The requested branch location could not be found.",
    };
  }

  return {
    title: `${branchData.office} | Contact LJA Power`,
    description: `Contact LJA Power Limited Co in ${branchData.office}. Call ${branchData.number} for generator sales, installation, and maintenance.`,
    openGraph: {
      title: `${branchData.office} | Contact LJA Power`,
      description: `Contact LJA Power Limited Co in ${branchData.office}. Call ${branchData.number}.`,
      url: `https://ljapowerlimitedco.com/branches/${branchData.slug}`,
      images: ["https://ljapowerlimitedco.com/images/contacts-hero-page.webp"],
    },
  };
}

// 2. SERVER COMPONENT
export default async function Page({ params }) {
  const { branchSlug } = await params;
  const branchData = contacts.find((c) => c.slug === branchSlug) || contacts[0];

  // 3. SCHEMA (JSON-LD)
  const branchContactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `LJA Power Limited Co - ${branchData.office}`,
    image: "https://ljapowerlimitedco.com/images/contacts-hero-page.webp",
    telephone: branchData.number,
    address: {
      "@type": "PostalAddress",
      streetAddress: branchData.address,
      addressCountry: "PH",
    },
    hasMap: branchData.map,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    url: `https://ljapowerlimitedco.com/branches/${branchData.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(branchContactSchema),
        }}
      />
      <BranchContactPage />
    </>
  );
}
