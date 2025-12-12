import OurWorkDetailsPage from "@/components/pages/OurWorkDetailsPage";
import { works } from "@/constants";

export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = works.find((w) => w.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | LJA Power Limited Co",
      description: "The project you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${project.title} | LJA Power Limited Co`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://ljapowerlimitedco.com/our-works/${slug}`,
      images: [
        {
          url: project.image
            ? `https://ljapowerlimitedco.com${project.image}`
            : "/images/default-project.webp",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// 2. SERVER COMPONENT
export default async function Page({ params }) {
  const { slug } = await params;
  const project = works.find((w) => w.slug === slug);

  // If no project found, the Client Component handles the UI fallback
  if (!project) {
    return <OurWorkDetailsPage />;
  }

  // 3. SCHEMA (JSON-LD)
  const workDetailsSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description,
    image: project.image
      ? `https://ljapowerlimitedco.com${project.image}`
      : "https://ljapowerlimitedco.com/images/default-project.webp",
    author: { "@type": "Organization", name: "LJA Power Limited Co" },
    publisher: {
      "@type": "Organization",
      name: "LJA Power Limited Co",
      logo: {
        "@type": "ImageObject",
        url: "https://ljapowerlimitedco.com/images/lja-logo.webp",
      },
    },
    datePublished: project.details?.completedDate || "",
    articleSection: project.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workDetailsSchema) }}
      />
      <OurWorkDetailsPage />
    </>
  );
}
