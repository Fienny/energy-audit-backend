import { useEffect, useRef, useState } from "react";

/**
 * count-up анимация (0 -> target) с requestAnimationFrame
 * start: boolean — когда true, начинается анимация
 */
export default function useCountUp(target, { duration = 900, start = true } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start) return;

    // чтобы не перезапускалось при каждом ререндере
    if (startedRef.current) return;
    startedRef.current = true;

    const t = Number(target) || 0;
    const from = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const next = Math.round(from + (t - from) * eased);
      setValue(next);

      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}
