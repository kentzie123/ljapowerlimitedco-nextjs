"use client";

// Routing
import Link from "next/link";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";

// Hooks
import { useRef } from "react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugin (Safe to do here for this component)
gsap.registerPlugin(ScrollTrigger);

const PageNavigationHeader = ({
  h1,
  h1Yellow,
  p,
  id,
  src,
  // srcSet is removed; Next.js handles responsive images automatically via <Image />
  backgroundAlt = "Hero image",
  breadcrumbs = [{ label: "Home", to: "/" }, { label: "Product" }],
}) => {
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const routeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: `#${id}`, start: "top center" },
    });

    tl.from(titleRef.current, {
      x: -30,
      ease: "power2.out",
      duration: 0.8,
    })
      .from(
        pRef.current,
        {
          x: 50,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        "-=0.6"
      )
      .from(
        routeRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "back.inOut",
        },
        "-=0.8"
      );
  }, [id]);

  return (
    <>
      {/* Yellow Shape Background */}
      {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
      <div
        className="absolute top-0 left-0 h-[400px] w-full bg-(--accent-yellow)/70 translate-y-1.5 z-0 pointer-events-none will-change-transform"
        style={{
          clipPath: "polygon(100% 60%, 50% 100%, 0 60%, 0 0, 100% 0)",
        }}
      />

      <section
        id={id}
        className="relative h-100 overflow-hidden flex-center z-10"
        style={{
          clipPath: "polygon(100% 60%, 50% 100%, 0 60%, 0 0, 100% 0)",
        }}
      >
        {/* OPTIMIZATION: Next.js Image with fill */}
        <Image
          src={src}
          alt={backgroundAlt}
          fill
          priority // Hero image should load immediately
          placeholder="blur" // Only works if src is an import, ignored if string path
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Fallback for string paths
          className="absolute inset-0 object-cover"
          sizes="100vw"
        />

        {/* Overlay */}
        {/* Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark) */}
        <div className="absolute top-0 inset-0 bg-(--bg-dark)/90" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6 px-4">
          {/* Main Title */}
          <h1
            ref={titleRef}
            // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
            className="will-change-transform font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-(--accent-yellow)"
          >
            <span className="text-white">{h1}</span> {h1Yellow}
          </h1>

          <p
            ref={pRef}
            className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg font-light leading-relaxed will-change-transform"
          >
            {p}
          </p>

          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            ref={routeRef}
            className="text-white pt-2 will-change-transform"
          >
            <ul className="flex flex-wrap justify-center items-center gap-2 w-full max-w-md mx-auto text-xs md:text-sm font-medium tracking-wide uppercase">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={`crumb-${index}`} className="flex items-center">
                    {index > 0 && (
                      // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
                      <ChevronRight className="size-4 text-(--accent-yellow) mx-2" />
                    )}

                    {isLast ? (
                      // Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow)
                      <span
                        className="text-(--accent-yellow)"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.to || crumb.href || "#"} // Handle 'to' or 'href' prop
                        // Fixed: hover:text-[var(--accent-yellow)] -> hover:text-(--accent-yellow)
                        // Fixed: hover:border-[var(--accent-yellow)] -> hover:border-(--accent-yellow)
                        className="hover:text-(--accent-yellow) transition-colors border-b border-transparent hover:border-(--accent-yellow)"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default PageNavigationHeader;
