"use client";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Routing
import Link from "next/link";

// Hooks
import { useRef } from "react";

// Icons
import { MoveRight } from "lucide-react";

// Register Plugin locally
gsap.registerPlugin(ScrollTrigger);

const HomeCallToAction = () => {
  const container = useRef();

  useGSAP(
    () => {
      const btmHPTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
        },
      });

      btmHPTimeline
        .from(".btm-hp-header", {
          opacity: 0,
          y: 50,
          ease: "power2.out",
          duration: 0.8,
        })
        .from(
          ".btm-hp-p",
          {
            opacity: 0,
            y: 30,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ".btm-hp-btn",
          {
            opacity: 0,
            y: 20,
            ease: "power2.out",
            stagger: 0.1,
            // CRITICAL: Clears opacity override after animation so hover effects work perfectly
            clearProps: "all",
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="btm-hp"
      // Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow)
      // Fixed: text-[var(--bg-dark)] -> text-(--bg-dark)
      className="bg-(--accent-yellow) text-(--bg-dark) py-24 lg:py-32"
    >
      <div className="section-container flex flex-col items-center text-center space-y-8">
        <div className="overflow-hidden">
          <h2 className="btm-hp-header font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none">
            Ready to Power Your Business?
          </h2>
        </div>

        <p className="btm-hp-p text-lg md:text-xl font-medium max-w-2xl opacity-90 leading-relaxed">
          Get in touch with our experts to find the perfect generator solution for
          your specific needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          {/* Button 1: Solid Dark */}
          <Link
            href="/contact" // Next.js uses 'href'
            // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
            className="btm-hp-btn bg-(--bg-dark) text-white hover:bg-black px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Contact Us Today
          </Link>

          {/* Button 2: Dark Outline */}
          <Link
            href="/products"
          
            className="btm-hp-btn group flex items-center gap-2 border-2 border-(--bg-dark) text-(--bg-dark) px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-(--bg-dark) hover:text-(--accent-yellow) transition-all"
          >
            Browse our generators
            <MoveRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCallToAction;