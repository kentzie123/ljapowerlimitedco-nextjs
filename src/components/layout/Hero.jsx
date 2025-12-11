"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Hero = () => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".will-appear", {
        duration: 0.7,
        y: 40,
        ease: "power2.out",
        stagger: 0.2,
      })
        .from(
          ".will-appear-h1",
          {
            y: 40,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.002,
          },
          "-=0.5"
        )
        .from(
          ".will-appear-p",
          {
            opacity: 0,
            duration: 0.7,
            y: 40,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-btns",
          {
            opacity: 0,
            duration: 0.7,
            y: 40,
            ease: "expo.out",
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative pt-30 pb-10 md:pb-30 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video */}
      {/* Make sure lja-promotional-video.mp4 is in public/videos/ */}
      <video
        className="absolute object-cover w-full h-full top-0 left-0"
        src="/videos/lja-promotional-video.mp4"
        muted
        autoPlay
        playsInline
        loop
        poster="/images/hero1.webp"
        aria-hidden="true"
        tabIndex="-1"
      ></video>

      {/* Dark Overlay (Matches your CSS var --bg-dark with opacity) */}
      <div className="absolute top-0 inset-0 bg-[#0a1f2a]/85 z-0" />

      <div className="flex flex-col section-container text-white space-y-6 relative z-10">
        {/* 1. TAGLINE */}
        <div className="overflow-hidden font-heading text-(--accent-yellow) font-bold tracking-[0.2em] uppercase text-sm md:text-base">
          <h2 className="will-appear">
            Powering Progress, Comfort, and Connection ⚡️
          </h2>
        </div>

        {/* 2. MAIN HEADING */}
        <h1 className="will-appear-h1 font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95]">
          <span className="text-(--primary-blue)">Reliable</span> <br />
          <span className="text-white">Diesel Generators</span> <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
            Across the Philippines
          </span>
        </h1>

        {/* 3. PARAGRAPH */}
        <p className="will-appear-p text-gray-300 text-base lg:text-xl max-w-2xl font-light leading-relaxed">
          We don't just sell generators — we deliver peace of mind,{" "}
          <br className="hidden md:block" />
          keeping your lights on, your business running, and your life moving
          forward.
        </p>

        {/* 4. BUTTONS */}
        <div className="hero-btns flex flex-wrap gap-4 pt-4">
          <Link
            className="btn-yellow px-8! py-4! font-heading font-bold uppercase tracking-wider text-lg shadow-lg hover:shadow-(--accent-yellow)/50 transition-all"
            href="/products"
          >
            View our products
          </Link>

          <Link
            className="btn-backdrop px-8! py-4! font-heading font-bold uppercase tracking-wider text-lg border-2 border-white/20 hover:border-white transition-all"
            href="/contacts"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
