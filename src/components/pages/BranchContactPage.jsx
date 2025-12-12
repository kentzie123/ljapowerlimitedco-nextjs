"use client";

// Styling
import "@/assets/css/ContactsPage.css";

// Hooks
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// Components
import ContactCard from "../ui/ContactCard";
import ContactForm from "../layout/ContactForm";
import PageNavigationHeader from "../layout/PageNavigationHeader";

// Icons
import { Phone, Mail, MapPin } from "lucide-react";

// Data
import { contacts } from "@/constants";

const BranchContactPage = () => {
  const params = useParams();
  const branchSlug = params?.branchSlug;

  // Safety check: Find branch, fallback to first contact, or empty object if data missing
  const branchData =
    contacts.find((c) => c.slug === branchSlug) || contacts?.[0] || {};

  const [selectedLocation, setSelectedLocation] = useState(branchData);
  const mapSectionRef = useRef(null); // 1. Use Ref for scrolling

  // Update selected location if the URL slug changes
  useEffect(() => {
    if (branchData && branchData.slug) {
      setSelectedLocation(branchData);
    }
  }, [branchSlug, branchData]);

  const setLocation = (contact) => {
    setSelectedLocation(contact);
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-(--bg-dark) text-white">
      {/* Hero Section */}
      <PageNavigationHeader
        h1="Contact"
        h1Yellow={branchData.office}
        p="Get in touch with our local team for expert guidance on your power generation needs."
        id="branch-contact-hero"
        src="/images/contacts-hero-page.webp"
        backgroundAlt={branchData.office}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Contacts", to: "/contacts" },
          { label: branchData.office },
        ]}
      />

      {/* Main Content */}
      <div className="section-container px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="bg-(--card-blue) p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-(--accent-yellow)/5 rounded-full blur-3xl group-hover:bg-(--accent-yellow)/10 transition-colors duration-500 pointer-events-none" />
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-12">
              <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none mb-6">
                Get in <span className="text-(--accent-yellow)">Touch</span>
              </h2>
              <p className="text-(--muted-gray) text-lg leading-relaxed">
                Reach our <strong>{branchData.office}</strong> team directly
                through the options below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Phone */}
              <a
                href={`tel:${branchData.number}`}
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 bg-(--accent-yellow)/10 p-4 rounded-full group-hover:bg-(--accent-yellow) transition-colors duration-300">
                  <Phone className="size-6 text-(--accent-yellow) group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Phone
                </span>
                <span className="text-(--muted-gray) text-xs text-center">
                  {branchData.number}
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:lja.ljapowerlimitedco@gmail.com"
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 bg-(--accent-yellow)/10 p-4 rounded-full group-hover:bg-(--accent-yellow) transition-colors duration-300">
                  <Mail className="size-6 text-(--accent-yellow) group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Email
                </span>
                <span className="text-(--muted-gray) text-xs text-center truncate w-full px-2">
                  lja.ljapowerlimitedco@gmail.com
                </span>
              </a>

              {/* Locations Scroll */}
              <button
                onClick={scrollToMap}
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 bg-(--accent-yellow)/10 p-4 rounded-full group-hover:bg-(--accent-yellow) transition-colors duration-300">
                  <MapPin className="size-6 text-(--accent-yellow) group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Map
                </span>
                <span className="text-(--accent-yellow) text-xs underline decoration-dotted">
                  View Location
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div
          ref={mapSectionRef}
          id="contact-locations"
          className="mt-24 pt-12 border-t border-white/10"
        >
          <h3 className="text-center md:text-left text-3xl font-heading font-bold uppercase tracking-wide text-white mb-8">
            <span className="text-(--accent-yellow)">
              {selectedLocation.office}
            </span>{" "}
            Location
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List */}
            <div className="lg:col-span-4 h-[500px] overflow-y-scroll pr-2 custom-scrollbar">
              <div className="space-y-4">
                {contacts.map((contact, i) => (
                  <ContactCard
                    key={i}
                    contact={contact}
                    setLocation={setLocation}
                    selectedContact={selectedLocation}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 h-[500px] rounded-xl overflow-hidden shadow-2xl border border-(--accent-yellow)/20 relative group bg-(--bg-surface)">
              {selectedLocation.map ? (
                <iframe
                  title={`${selectedLocation.office} Location Map`}
                  src={selectedLocation.map}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(20%) contrast(1.1) brightness(0.9)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-500 group-hover:filter-none w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-(--muted-gray)">
                  Map unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchContactPage;
