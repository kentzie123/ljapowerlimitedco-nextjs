import BranchContactPage from "@/components/pages/BranchContactPage";
import { contacts } from "@/constants";
import { notFound } from "next/navigation";

// 1. FIXED: The key 'slug' MUST match the folder name [slug]
export async function generateStaticParams() {
  return contacts.map((contact) => ({
    slug: contact.slug,
  }));
}

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  // Update: Destructure 'slug' (not branchSlug)
  const { slug } = await params;
  const branchData = contacts.find((c) => c.slug === slug);

  if (!branchData) {
    return {
      title: "Branch Not Found | LJA Power Limited Co",
      description: "The requested branch location could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title =
    branchData.seo?.title || `${branchData.office} | Contact LJA Power`;
  const desc =
    branchData.seo?.description || `Contact LJA Power in ${branchData.office}.`;

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: `https://ljapowerlimitedco.com/branches/${branchData.slug}`,
    },
    openGraph: {
      title: title,
      description: desc,
      url: `https://ljapowerlimitedco.com/branches/${branchData.slug}`,
      images: ["https://ljapowerlimitedco.com/images/contacts-hero-page.webp"],
    },
  };
}

// 3. SERVER COMPONENT
export default async function Page({ params }) {
  // Update: Destructure 'slug' (not branchSlug)
  const { slug } = await params;
  const branchData = contacts.find((c) => c.slug === slug);

  if (!branchData) {
    notFound();
  }

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
      {/* Pass data to Client Component */}
      <BranchContactPage initialBranchData={branchData} />
    </>
  );
}
