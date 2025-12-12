"use client";

// Hooks
import { useState, useRef } from "react";

// Styling
import "@/assets/css/ContactsPage.css"

// UI
import ContactCard from "../ui/ContactCard";

// Component
import ContactForm from "../layout/ContactForm";
import PageNavigationHeader from "../layout/PageNavigationHeader";

// Icons
import { Phone, Mail, MapPin } from "lucide-react";

// Data
import { contacts } from "@/constants";

const ContactsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(contacts?.[0] || {});

  // Use a Ref for the scrolling (React best practice)
  const mapSectionRef = useRef(null);

  const setLocation = (contact) => {
    setSelectedLocation(contact);
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
    <div className="bg-(--bg-dark) text-white">
      
      {/* Hero Section */}
      <PageNavigationHeader
        h1="Contact"
        h1Yellow="Us"
        p="Get in touch with our team for expert guidance on your power generation needs."
        id="contact-page-hero"
        src="/images/contacts-hero-page.webp" // Use public path
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contacts" }]}
      />

      {/* Main Content */}
      <div className="section-container px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form Side */}
          {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
          <div className="bg-(--card-blue) md:p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-(--accent-yellow)/5 rounded-full blur-3xl group-hover:bg-(--accent-yellow)/10 transition-colors duration-500 pointer-events-none" />
            <ContactForm />
          </div>

          {/* Text & Info Side */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-12">
              <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none mb-6">
                Get in{" "}
                {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                <span className="text-(--accent-yellow)">Touch</span>
              </h2>
              {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
              <p className="text-(--muted-gray) text-lg leading-relaxed">
                Reach us through any of the options below — we’d love to hear
                from you. Our team is ready to provide expert assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Phone */}
              <a
                href="tel:+639157495102"
                // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
                // Fixed: hover:border-[var(--accent-yellow)] -> hover:border-(--accent-yellow)
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300"
                aria-label="Call LJA Power Limited Co"
              >
                {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
                <div className="mb-4 bg-(--accent-yellow)/10 p-4 rounded-full group-hover:bg-(--accent-yellow) transition-colors duration-300">
                  {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                  <Phone className="size-6 text-(--accent-yellow) group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Phone
                </span>
                {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
                <span className="text-(--muted-gray) text-xs text-center">
                  (+63) 915-749-5102
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:lja.ljapowerlimitedco@gmail.com"
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300"
                aria-label="Email LJA Power Limited Co"
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

              {/* Locations (Scroll Button) */}
              <button
                onClick={scrollToMap}
                className="group flex flex-col items-center p-6 bg-(--bg-dark)/50 rounded-lg border border-white/5 hover:border-(--accent-yellow) hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 bg-(--accent-yellow)/10 p-4 rounded-full group-hover:bg-(--accent-yellow) transition-colors duration-300">
                  <MapPin className="size-6 text-(--accent-yellow) group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Visit Us
                </span>
                <span className="text-(--accent-yellow) text-xs underline decoration-dotted">
                  View Map Below
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
            Our <span className="text-(--accent-yellow)">Locations</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List (ContactCard handles display) */}
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

            {/* Map */}
            {/* Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow) */}
            {/* Fixed: bg-[var(--bg-surface)] -> bg-(--bg-surface) */}
            <div className="lg:col-span-8 h-[500px] rounded-xl overflow-hidden shadow-2xl border border-(--accent-yellow)/20 relative group bg-(--bg-surface)">
              {/* Only render iframe if we have a valid map URL */}
              {selectedLocation.map ? (
                <iframe
                  title={`Map of ${selectedLocation.name}`}
                  src={selectedLocation.map}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    // Desaturate map slightly to fit dark theme, full color on hover
                    filter: "grayscale(20%) contrast(1.1) brightness(0.9)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-500 group-hover:filter-none w-full h-full"
                ></iframe>
              ) : (
                // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
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

export default ContactsPage;