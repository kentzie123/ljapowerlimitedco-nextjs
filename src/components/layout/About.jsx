"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      });

      // 1. Title Animation (Replaces SplitText with safe stagger)
      tl.from(".animate-title span", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      })
        // 2. Text & Content Animation
        .from(
          ".animate-content",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.8"
        )
        // 3. Grid Images Animation
        .from(
          ".image-reveal",
          {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="about"
      // Using your global CSS variable --bg-dark
      className="min-h-dvh bg-(--bg-dark) text-(--white) py-30"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-16 gap-8">
          <div className="col-span-8 space-y-4">
            {/* 1. Tagline */}
            <div className="animate-content font-heading text-(--accent-yellow) text-lg md:text-xl font-bold uppercase tracking-[0.2em]">
              - Who Are We
            </div>

            {/* 2. Main Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-(--white) uppercase tracking-tight leading-[1.1]">
              <span className="animate-title inline-block">
                {"LJA Power Limited Co".split("").map((char, i) => (
                  <span key={i} className="inline-block whitespace-pre">
                    {char}
                  </span>
                ))}
              </span>
              <br />
              {/* Using var(--primary-blue) instead of hex code */}
              <span className="animate-content text-(--primary-blue)">
                — Your Trusted
              </span>
              <br />
              <span className="animate-content text-(--primary-blue)">
                Energy Lifeline ⚡
              </span>
            </h2>
          </div>

          <div className="col-span-4 space-y-6 flex flex-col justify-end">
            {/* 3. Body Text */}
            <p className="animate-content text-(--white) text-base md:text-lg leading-relaxed">
              LJA Power Limited Co is a trusted name in the power generation
              industry, providing high-quality diesel generators and reliable
              energy solutions across the Philippines. We don’t just sell
              generators — we deliver peace of mind & keeps your business
              powered and running
            </p>

            <div className="animate-content mt-3 border-l-4 border-(--accent-yellow) pl-4">
              <p className="text-base text-(--muted-gray) italic font-medium">
                “Empowering businesses and communities with reliable energy
                solutions.”
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE GRID */}
        {/* Note: Added explicit heights (h-64 md:h-80) to preserve your layout 
            because Next.js 'fill' requires parent height. */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          <div className="md:col-span-3 relative h-64 md:h-80 group overflow-hidden rounded-md image-reveal">
            <Image
              src="/images/abt3.webp"
              alt="Industrial Generator Setup"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            />
            {/* Gradient Overlay Fixed: Changed from-[var(--bg-surface)]/80 to from-(--bg-surface)/80 */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-surface)/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-6 relative h-64 md:h-80 group overflow-hidden rounded-md image-reveal">
            <Image
              src="/images/abt2.webp"
              alt="LJA Power Technicians"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            />
            {/* Gradient Overlay Fixed */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-surface)/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-3 relative h-64 md:h-80 group overflow-hidden rounded-md image-reveal">
            <Image
              src="/images/abt4.webp"
              alt="Generator Maintenance"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            />
            {/* Gradient Overlay Fixed */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-surface)/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative h-64 md:h-80 group overflow-hidden rounded-md image-reveal">
            <Image
              src="/images/abt1.webp"
              alt="LJA Power Office"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            />
            {/* Gradient Overlay Fixed */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-surface)/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-4 relative h-64 md:h-80 group overflow-hidden rounded-md image-reveal">
            <Image
              src="/images/abt5.webp"
              alt="Delivery Truck"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            />
            {/* Gradient Overlay Fixed */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-surface)/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
