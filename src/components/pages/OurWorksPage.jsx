"use client";

// Next.js
import Link from "next/link";

// Components
import PageNavigationHeader from "../layout/PageNavigationHeader";
import OurWorkCard from "../ui/OurWorkCard";

// Data
import { works } from "@/constants";

// Icons
import { RefreshCcw } from "lucide-react";

// Hooks
import { useState, useMemo, useRef } from "react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OurWorksPage = () => {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Installation",
    "Maintenance",
    "Delivery",
    "Repair",
  ];

  // 2. Data Safety: Fallback to empty array if data is missing
  const filteredWorks = useMemo(() => {
    const currentWorks = works || [];
    if (filter === "All") return currentWorks;

    return currentWorks.filter(
      (work) => work.category?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter]);

  // 3. Scoped Animation: Runs whenever [filter] changes
  useGSAP(
    () => {
      // Kill any active animations on these elements before restarting
      gsap.fromTo(
        ".project-card-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    },
    { dependencies: [filter], scope: containerRef }
  );

  return (
    // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
    <div ref={containerRef} className="bg-(--bg-dark) text-white min-h-screen">
      <PageNavigationHeader
        h1="Our"
        h1Yellow="Works"
        p="A documented log of our successful field operations across the region."
        id="our-works-page-hero"
        src="/images/ServicesPageHeroImg.webp" // Use public path
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Our Works" }]}
      />

      <div className="section-container py-20 lg:py-32">
        {/* --- SECTION 1: FILTERABLE GALLERY --- */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
            Recent{" "}
            {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
            <span className="text-(--accent-yellow)">Field Operations</span>
          </h2>

          {/* Industrial Filter Bar */}
          {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-(--card-blue)/50 rounded-lg border border-white/10 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                // Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow)
                // Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow)
                // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
                className={`
                  px-6 py-2 rounded-md text-sm font-heading font-bold uppercase tracking-wider transition-all border
                  ${
                    filter === cat
                      ? "bg-(--accent-yellow) text-black border-(--accent-yellow) shadow-[0_0_15px_rgba(246,231,42,0.3)]"
                      : "bg-transparent text-(--muted-gray) border-transparent hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <div key={work.slug} className="project-card-anim">
                <OurWorkCard project={work} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
            <div className="flex justify-center mb-4 text-(--muted-gray)">
              <RefreshCcw className="size-10" />
            </div>
            {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
            <p className="text-xl font-heading uppercase text-(--muted-gray)">
              No records found for "{filter}"
            </p>
            {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
            <button
              onClick={() => setFilter("All")}
              className="mt-4 text-(--accent-yellow) underline hover:text-white"
            >
              View All Operations
            </button>
          </div>
        )}
      </div>

      {/* --- CTA --- */}
      {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
      <section className="py-24 px-6 bg-(--card-blue) text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
            Ready to Protect Your Power?
          </h2>
          {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
          <p className="text-xl text-(--muted-gray) mb-10">
            Contact LJA Power Limited Co today to discuss your generator needs.
          </p>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="btn-yellow px-10 py-4 text-base font-heading font-bold uppercase tracking-wider"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorksPage;
