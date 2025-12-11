"use client";

// Icons
import { Check } from "lucide-react";

// Next.js Components
import Link from "next/link";
import Image from "next/image";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const ServicesHomePage = () => {
  const container = useRef();

  useGSAP(
    () => {
      const serviceHomePageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current, // Use ref for safety
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      serviceHomePageTimeline
        .fromTo(
          ".service-hp-img",
          { opacity: 0 },
          { opacity: 1, ease: "power2.inOut" }
        )
        .fromTo(
          ".service-hp-header",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.inOut" }
        )
        .fromTo(
          ".service-hp-p",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          ".proccess",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.inOut", stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(
          ".service-hp-btn",
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.inOut",
            // Removed clearProps as it can sometimes cause flash issues in React
            // if state changes, opacity: 1 is sufficient.
          },
          "-=0.2"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="service-hp"
      // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
      className="bg-(--bg-dark) text-white overflow-hidden"
    >
      <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-2 py-30 items-center">
        {/* Left: Image (Optimized with Next/Image) */}
        <div className="flex items-center justify-center">
          <div className="service-hp-img overflow-hidden aspect-square rounded-xl shadow-2xl relative w-full max-w-lg">
            <Image
              src="/images/abt4.webp"
              alt="Technician Checking the Generator"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Overlay for depth */}
            {/* Fixed: from-[var(--bg-dark)] -> from-(--bg-dark) */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark)/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8">
          {/* Header: Industrial Style */}
          {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
          <div className="service-hp-header text-4xl lg:text-5xl font-bold font-heading uppercase tracking-tight leading-none text-white">
            Complete <span className="text-(--accent-yellow)">Power</span>{" "}
            Solutions
          </div>

          {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
          <p className="service-hp-p text-base md:text-lg text-(--muted-gray) leading-relaxed">
            From initial consultation to ongoing maintenance, we provide
            comprehensive power generation solutions tailored to your specific
            needs.
          </p>

          <ul className="text-base space-y-4">
            {[
              "Professional site assessment and planning",
              "Expert installation and commissioning",
              "Preventive maintenance programs",
              "Customer Service Support",
              "Parts and services availability",
              "Compliance and certificate assistance",
            ].map((item, index) => (
              <li key={index} className="proccess flex items-start">
                {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                <Check className="text-(--accent-yellow) size-5 min-w-5 mt-0.5 me-3" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link
              href="/services"
              // Ensure you have a 'btn-yellow' class defined in global CSS or use Tailwind utilities here:
              // e.g. "bg-(--accent-yellow) text-black hover:bg-white ..."
              className="service-hp-btn btn-yellow inline-block font-heading font-bold uppercase tracking-wider px-8 py-3 rounded-lg transition-transform hover:-translate-y-1"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
