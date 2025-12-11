"use client";

import "@/assets/css/FeaturedProducts.css";

import Link from "next/link";

// Hooks
import { useRef } from "react";

// Data
import { generators } from "@/constants";

// UI
import ProductCard from "../ui/ProductCard";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  // Main container ref for scoping
  const container = useRef();
  // Ref for the grid wrapper to target children
  const featuredProductsRef = useRef();

  const featuredProducts = [
    generators.find((gen) => gen.slug === "pgs-1-50-f"),
    generators.find((gen) => gen.slug === "pgs-1-100-f"),
    generators.find((gen) => gen.slug === "pgs-1-150-c"),
    generators.find((gen) => gen.slug === "pgs-1-200-f"),
  ];

  useGSAP(
    () => {
      // 1. Grid Items Animation
      const productCards = gsap.utils.toArray(
        featuredProductsRef.current.children
      );

      productCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            ease: "power2.inOut",
          }
        );
      });

      // 2. Header & Paragraph Animation
      const featuredProductTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      });

      featuredProductTimeline
        .from(".fp-header", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.inOut",
        })
        .from(
          ".fp-p",
          {
            opacity: 0,
            y: 40,
            ease: "power2.inOut",
          },
          "-=0.2"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="featured-products"
      className="min-h-dvh relative text-white py-30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-(--bg-dark)/90" />

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-10">
        <div className="section-container">
          <div className="text-center mb-20">
            {/* Main Heading */}
            <h2 className="fp-header font-heading text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight leading-none">
              Featured <span className="text-(--accent-yellow)">Products</span>
            </h2>

            {/* Subtext */}
            <p className="fp-p text-(--muted-gray) text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our range of high-quality generators designed to keep your
              world powered — anytime, anywhere.
            </p>
          </div>

          <div
            ref={featuredProductsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
          >
            {featuredProducts.map((featuredProduct) => (
              <ProductCard
                key={featuredProduct.slug}
                product={featuredProduct}
              />
            ))}
          </div>

          <div className="mt-20 flex-center">
            <Link
              href="/products" // Next.js uses 'href', not 'to'
              className="bg-[#145d77] border border-(--panel-blue) hover:border-[#1a6d8a] px-8 py-4 rounded-lg hover:bg-(--accent-yellow) hover:text-black transition-all duration-300 font-heading font-bold uppercase tracking-wider text-sm md:text-base"
            >
              View all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
