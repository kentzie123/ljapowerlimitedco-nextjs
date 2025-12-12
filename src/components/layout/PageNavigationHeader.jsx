"use client";

// Routing
import Link from "next/link";
import Image from "next-image-export-optimizer";

// Icons
import { ChevronRight } from "lucide-react";

// Hooks
import { useRef } from "react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const PageNavigationHeader = ({
  h1,
  h1Yellow,
  p,
  id,
  src,
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
          preload={true} // 1. Tells Next.js to preload this
          fetchPriority="high" // 2. Explicitly sets browser fetch priority
          loading="eager" // 3. Ensures no lazy loading
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          className="absolute inset-0 object-cover"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute top-0 inset-0 bg-(--bg-dark)/90" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6 px-4">
          {/* Main Title */}
          <h1
            ref={titleRef}
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
                      <ChevronRight className="size-4 text-(--accent-yellow) mx-2" />
                    )}

                    {isLast ? (
                      <span
                        className="text-(--accent-yellow)"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.to || crumb.href || "#"}
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
