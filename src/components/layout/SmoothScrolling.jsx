"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrolling({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Control speed (default 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    // This ensures GSAP animations update exactly when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    // This ensures both libraries update on the exact same frame (no jitter)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert to milliseconds
    });

    // 4. Disable GSAP lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
