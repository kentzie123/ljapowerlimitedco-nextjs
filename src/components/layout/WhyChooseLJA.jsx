"use client";

// Icons
import { HardHat, Settings, Wrench } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hooks
import { useRef } from "react";

// UI
import InfoCard from "../ui/InfoCard";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Data
const adData = [
  {
    icon: (
      // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
      <HardHat className="w-8 h-8 text-(--accent-yellow)" aria-hidden="true" />
    ),
    title: "Expertise and Experience",
    desc: "Top-quality generator installation with extensive industry experience and reliability.",
  },
  {
    icon: (
      // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
      <Settings className="w-8 h-8 text-(--accent-yellow)" aria-hidden="true" />
    ),
    title: "Customized Solutions",
    desc: "Tailored generator installations for efficiency, performance, and cost-effectiveness.",
  },
  {
    icon: (
      // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
      <Wrench className="w-8 h-8 text-(--accent-yellow)" aria-hidden="true" />
    ),
    title: "Comprehensive Service",
    desc: "Complete service from free quotation, consultation to commissioning, with professionalism and meticulous attention to detail.",
  },
];

const WhyChooseLJA = () => {
  // 1. Created a main container ref to scope ALL animations (Header + Cards)
  const container = useRef();

  // 2. Kept your grid ref for specific child targeting
  const gridRef = useRef();

  useGSAP(
    () => {
      // A. Card Animation
      // We target the children of the grid specifically
      const adCards = gsap.utils.toArray(gridRef.current.children);

      adCards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse", // Optional: adds re-playability
          },
          opacity: 0,
          y: 80,
          ease: "power2.inOut",
          delay: 0.1 * i, // Reduced delay slightly for snappier feel
          duration: 0.8,
        });
      });

      // B. Title & Text Animation
      const whyChooseUsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%", // Trigger slightly earlier
        },
      });

      whyChooseUsTimeline
        .from(".wcu-title", {
          opacity: 0,
          duration: 1,
          y: 40,
          ease: "power2.inOut",
        })
        .from(
          ".wcu-p",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.6" // Overlap slightly more for smoothness
        );
    },
    { scope: container }
  ); // Scoping prevents conflicts with other sections

  return (
    <section
      ref={container} // Attached scope here
      id="whyChooseUs"
      // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
      className="bg-(--bg-dark) py-30 relative overflow-hidden"
    >
      {/* Visual Accent: Subtle yellow glow */}
      {/* Fixed: bg-[var(--accent-yellow)]/5 -> bg-(--accent-yellow)/5 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-(--accent-yellow)/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          {/* Main Heading: Industrial Style */}
          {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
          <h2 className="wcu-title font-heading text-5xl md:text-7xl font-bold text-(--accent-yellow) mb-6 uppercase tracking-tight leading-[1.1]">
            <span className="text-white">Why Choose</span> LJA Power
          </h2>

          {/* Subtext: Clean Sans-Serif */}
          {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
          <p className="wcu-p text-(--muted-gray) text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted generator solutions built on years of expertise and a strong
            commitment to reliability and excellence.
          </p>
        </div>

        {/* Grid Container */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-20"
        >
          {adData.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLJA;
