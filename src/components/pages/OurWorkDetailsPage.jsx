"use client";

// Routing
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next-image-export-optimizer";

// Icons
import {
  ArrowLeft,
  MapPin,
  FileText,
  Clock,
  Calendar,
  Layers,
} from "lucide-react";

// Data
import { works } from "@/constants";

const OurWorkDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const project = works.find((work) => work.slug === slug);

  // --- 1. ROBUST 404 STATE ---
  if (!project) {
    return (
      // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
      <div className="bg-(--bg-dark) min-h-screen flex-center text-white pt-[60px]">
        <div className="flex-center flex-col text-center">
          <h1 className="font-heading text-4xl font-bold mb-4 uppercase tracking-wide">
            Work Not Found
          </h1>
          {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
          <p className="text-(--muted-gray) mb-8">
            The project record you are looking for is unavailable or has been
            moved.
          </p>
          <button
            onClick={() => router.push("/our-works")}
            className="btn-yellow font-heading uppercase tracking-wider px-8 py-3"
          >
            Back to Our Works
          </button>
        </div>
      </div>
    );
  }

  // Next.js handles image paths relative to public/, no need for full domain unless external
  // If your data has leading slash like "/images/...", it works perfectly with <Image />
  const finalImageUrl = project.image || "/images/default-project.webp";

  return (
    // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
    <div className="bg-(--bg-dark) text-white">
      {/* Header Section */}
      <section className="project-details-header relative py-32 lg:py-40">
        {/* Fixed: from-[var(--bg-dark)] -> from-(--bg-dark) */}
        <Image
          className="object-cover"
          src={finalImageUrl}
          alt={`Photo of ${project.title} operation`}
          fill
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark) via-(--bg-dark)/80 to-(--bg-dark)/60" />
        <div className="section-container relative z-10">
          <div className="space-y-8 max-w-4xl">
            <Link
              href="/our-works"
              // Fixed: hover:border-[var(--accent-yellow)] -> hover:border-(--accent-yellow)
              // Fixed: hover:text-[var(--accent-yellow)] -> hover:text-(--accent-yellow)
              className="flex items-center gap-2 w-fit px-4 py-2 rounded-full font-heading uppercase tracking-wide border border-white/10 hover:border-(--accent-yellow) hover:text-(--accent-yellow) transition-colors bg-black/20 backdrop-blur-sm"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm font-bold">Back to Our Works</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4">
              {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
              <div className="bg-(--accent-yellow) px-4 py-1.5 rounded-sm text-black text-xs font-bold font-heading uppercase tracking-widest">
                {project.category}
              </div>
              {project.details?.capacity && (
                // Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow)
                // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
                <div className="border border-(--accent-yellow) px-4 py-1.5 rounded-sm text-(--accent-yellow) text-xs font-bold font-heading uppercase tracking-widest">
                  {project.details.capacity}
                </div>
              )}
            </div>

            <h1 className="font-bold text-5xl lg:text-7xl font-heading uppercase tracking-tight leading-none">
              {project.title}
            </h1>

            <p className="text-gray-300 lg:text-xl leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contacts"
                className="btn-yellow font-heading uppercase tracking-wider px-8 py-4 text-sm"
              >
                Request Quote
              </Link>
              <Link
                href="/services"
                className="btn-blue font-heading uppercase tracking-wider px-8 py-4 text-sm"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        {/* Project Stats Grid */}
        <section className="py-12 -mt-16 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Location", value: project.location, icon: MapPin },
              { label: "Category", value: project.category, icon: Layers },
              {
                label: "Duration",
                value: project.details?.duration || "Ongoing",
                icon: Clock,
              },
              {
                label: "Completed",
                value: project.details?.completedDate || "In Progress",
                icon: Calendar,
              },
            ].map((stat, i) => (
              // Fixed: bg-[var(--card-blue)] -> bg-(--card-blue)
              // Fixed: hover:border-[var(--accent-yellow)] -> hover:border-(--accent-yellow)
              <div
                key={i}
                className="bg-(--card-blue)/90 backdrop-blur-md flex flex-col items-center py-8 px-4 rounded-xl gap-3 border border-white/5 hover:border-(--accent-yellow)/30 transition-colors shadow-xl"
              >
                {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                <stat.icon className="text-(--accent-yellow) size-8" />
                {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
                <div className="text-xs text-(--muted-gray) font-heading uppercase tracking-widest">
                  {stat.label}
                </div>
                <div className="text-base lg:text-lg font-bold font-heading uppercase text-center wrap-break-word w-full">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/10 my-16"></div>

        {/* SECTION 2: JOB SUMMARY & VISUAL PROOF */}
        <section className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">
            {/* Column 1: Summary/Action */}
            {/* Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow) */}
            <div className="space-y-8 lg:col-span-1 border-l-4 border-(--accent-yellow) pl-6 sticky top-24">
              <div>
                {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                <div className="font-heading text-sm tracking-widest text-(--accent-yellow) uppercase flex items-center gap-2 mb-2">
                  <FileText className="size-4" /> Scope of Work
                </div>
                <h2 className="font-heading font-bold text-3xl uppercase tracking-tight leading-none text-white mb-4">
                  Project Execution
                </h2>
                {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
                <p className="text-(--muted-gray) text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
              <div className="bg-(--card-blue) p-6 rounded-lg border border-white/5">
                <h3 className="text-white font-heading font-bold uppercase text-sm mb-2">
                  Project Highlights
                </h3>
                <ul className="space-y-2">
                  {[
                    "Client Satisfaction Guaranteed",
                    "Safety Protocols Observed",
                    "On-Time Delivery",
                  ].map((item, i) => (
                    // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
                    <li
                      key={i}
                      className="flex items-center gap-2 text-(--muted-gray) text-sm"
                    >
                      {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
                      <span className="size-1.5 bg-(--accent-yellow) rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2 & 3: Visual Proof/Technical Info */}
            <div className="lg:col-span-2 relative">
              {/* Large Image/Visual Proof */}
              {/* Fixed: border-[var(--card-blue)] -> border-(--card-blue) */}
              {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-(--card-blue) group aspect-video bg-(--card-blue)">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  src={finalImageUrl}
                  alt={`Photo of ${project.title} operation`}
                  fill
                  priority
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Capacity Detail Box */}
              {project.details?.capacity &&
                project.details.capacity !== "N/A" && (
                  // Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow)
                  <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-(--accent-yellow) text-black p-4 lg:p-6 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-1 border-2 border-white">
                    <div className="text-xs font-heading font-bold uppercase opacity-70 mb-1">
                      Unit Rating
                    </div>
                    <div className="font-heading font-black text-2xl lg:text-3xl uppercase leading-none">
                      {project.details.capacity}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      {/* Fixed: bg-[var(--panel-blue)] -> bg-(--panel-blue) */}
      {/* Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow) */}
      <section className="bg-(--panel-blue) py-24 text-center border-t border-(--accent-yellow)/20">
        <div className="flex flex-col items-center gap-6 section-container px-6">
          <div className="font-bold text-4xl lg:text-6xl font-heading uppercase tracking-tight text-white">
            Have a Similar Project?
          </div>
          {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
          <p className="text-lg text-(--muted-gray) max-w-2xl">
            Contact our team to discuss your power generation needs and get a
            customized solution tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/contacts"
              className="btn-yellow font-heading uppercase tracking-wider px-10 py-4"
            >
              Get in Touch
            </Link>
            <Link
              href="/our-works"
              className="btn-blue font-heading uppercase tracking-wider px-10 py-4"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkDetailsPage;
