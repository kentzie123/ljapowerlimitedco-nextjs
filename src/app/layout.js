import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/layout/SmoothScrolling";

// TOAST CONTAINER
import { ToastContainer } from "react-toastify";

// 1. VIEWPORT & THEME COLOR
// In Next.js, these are exported separately from metadata
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c2430",
};

// 2. METADATA (Replaces <title>, <meta>, and <link rel="icon">)
// src/app/layout.js

export const metadata = {
  // 1. Base Title (template allows child pages to auto-append the brand name)
  title: {
    default: "LJA Power Limited Co",
  },
  description:
    "Supplier of diesel generators and provider of complete power generation services across the Philippines.",

  // 2. Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ljapowerlimitedco.com/",
    title: "LJA Power Limited Co",
    description:
      "Supplier of diesel generators and provider of complete power generation services across the Philippines.",
    siteName: "LJA Power Limited Co", // ✅ SITE NAME DECLARED HERE
    images: [
      {
        url: "https://ljapowerlimitedco.com/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "LJA Power Limited Co",
      },
    ],
  },

  // 3. Geo Tags
  other: {
    "geo.region": "PH",
    "geo.placename": "Philippines",
  },

  // 4. Icons
  manifest: "/images/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  // 3. YOUR GLOBAL SCHEMA (JSON-LD)
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ljapowerlimitedco.com/#website",
        url: "https://ljapowerlimitedco.com/",
        name: "LJA Power Limited Co",
        description:
          "Supplier of diesel generators and provider of complete power generation services across the Philippines.",
        publisher: {
          "@id": "https://ljapowerlimitedco.com/#organization",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://ljapowerlimitedco.com/#organization",
        name: "LJA Power Limited Co",
        url: "https://ljapowerlimitedco.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://ljapowerlimitedco.com/images/lja-logo.webp",
          width: 911,
          height: 911,
        },
        image: "https://ljapowerlimitedco.com/images/lja-logo.webp",
        description:
          "Supplier of diesel generators and provider of complete power generation services across the Philippines.",
        priceRange: "$$$",
        areaServed: {
          "@type": "Country",
          name: "Philippines",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Misamis Oriental",
          addressRegion: "Cagayan De Oro",
          addressCountry: "PH",
        },
        sameAs: ["https://www.facebook.com/profile.php?id=61572436091637"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+63-915-749-5102",
          contactType: "sales",
          areaServed: "PH",
          availableLanguage: ["en", "fil"],
        },
      },
    ],
  };

  return (
    // 4. HTML TAG ATTRIBUTES
    <html lang="en">
      <head>
        {/* 5. MANUAL PRELOAD LINKS (If not using next/font) */}
        <link
          rel="preload"
          href="/fonts/font-heading.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* 6. INJECT JSON-LD SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>

      <body className="antialiased bg-base-100 text-base-content">
        <ToastContainer />
        <SmoothScrolling>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
