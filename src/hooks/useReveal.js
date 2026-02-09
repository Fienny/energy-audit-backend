import { useEffect, useRef, useState } from "react";

/**
 * Reveal on scroll using IntersectionObserver
 * @param {Object} options
 * @param {number} options.threshold
 * @param {string} options.rootMargin
 * @param {boolean} options.once - reveal only once
 */
export function useReveal({ threshold = 0.12, rootMargin = "0px 0px -10% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ✅ respect reduced motion
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setIsVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
