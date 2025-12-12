"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // 1. Import this to track page changes

export default function SmoothScrolling({ children }) {
  const lenisRef = useRef(null); // 2. Create a ref to store the Lenis instance
  const pathname = usePathname(); // 3. Get current path

  // Initialize Lenis & GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Save the instance to the ref so we can use it elsewhere
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 4. RESET SCROLL ON PAGE CHANGE
  useEffect(() => {
    if (lenisRef.current) {
      // { immediate: true } skips the smooth animation and snaps to top instantly
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]); // Runs every time the URL changes

  return <>{children}</>;
}
