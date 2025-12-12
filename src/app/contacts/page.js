import ContactsPage from "@/components/pages/ContactsPage";
import { contacts } from "@/constants";

export const metadata = {
  title: "Contact Us | LJA Power Limited Co",
  description:
    "Get in touch with LJA Power Limited Co Call +63-915-749-5102 or visit our branches in the Philippines for your generator needs.",
  openGraph: {
    title: "Contact Us | LJA Power Limited Co",
    description:
      "Get in touch with LJA Power Limited Co Call +63-915-749-5102 or visit our branches in the Philippines for your generator needs.",
    url: "https://ljapowerlimitedco.com/contacts",
    images: ["https://ljapowerlimitedco.com/images/contacts-hero-page.webp"],
  },
};

export default function Page() {
  // Dynamic Schema: Automatically adds all your branches from the 'contacts' file
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact LJA Power Limited Co",
    description:
      "Contact details for LJA Power locations across the Philippines.",
    url: "https://ljapowerlimitedco.com/contacts",
    mainEntity: {
      "@type": "Organization",
      name: "LJA Power Limited Co",
      contactPoint: contacts.map((contact) => ({
        "@type": "ContactPoint",
        telephone: contact.phone || "+639157495102",
        contactType: "sales",
        areaServed: "PH",
        availableLanguage: ["en", "fil"],
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactsPage />
    </>
  );
}
