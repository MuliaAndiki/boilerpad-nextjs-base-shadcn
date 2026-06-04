"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

// Component to sync Lenis with GSAP ScrollTrigger
function ScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Set up GSAP ticker to sync with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable Lenis internal RAF since GSAP handles it
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoRaf: false, // Disable auto RAF, let GSAP handle it
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
