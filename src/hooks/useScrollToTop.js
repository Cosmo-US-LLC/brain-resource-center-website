import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top IMMEDIATELY when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use 'instant' to jump immediately, not smooth scroll
    });

    // Kill all existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.clearScrollMemory && ScrollTrigger.clearScrollMemory();

    // Refresh ScrollTrigger after a small delay to recalculate positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);
}

