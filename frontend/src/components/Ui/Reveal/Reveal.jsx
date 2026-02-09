import React from "react";
import { useReveal } from "../../../hooks/useReveal";
import "./Reveal.scss";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  once = true,
}) {
  const { ref, isVisible } = useReveal({ once });

  // ✅ если передали не один React-элемент — оборачиваем как раньше
  if (!React.isValidElement(children)) {
    return (
      <div
        ref={ref}
        className={`reveal reveal--${variant} ${isVisible ? "is-visible" : ""} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }

  // ✅ "безобёрточный" режим: добавляем классы прямо ребёнку (например .card)
  const mergedClassName = [
    children.props.className,
    "reveal",
    `reveal--${variant}`,
    isVisible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle = {
    ...(children.props.style || {}),
    transitionDelay: `${delay}ms`,
  };

  return React.cloneElement(children, {
    ref,
    className: mergedClassName,
    style: mergedStyle,
  });
}
