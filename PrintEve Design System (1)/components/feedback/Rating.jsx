import React from "react";

const CSS = `
.pe-rating { display: inline-flex; align-items: center; gap: 0.35rem; }
.pe-rating__stars { display: inline-flex; gap: 1px; color: var(--color-secondary); }
.pe-rating__stars svg { width: 1rem; height: 1rem; }
.pe-rating__empty { color: var(--color-border-strong); }
.pe-rating__value { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }
.pe-rating__count { font-size: var(--text-xs); color: var(--color-text-muted); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-rating-css")) {
    const s = document.createElement("style");
    s.id = "pe-rating-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const Star = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={filled ? "" : "pe-rating__empty"}>
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
  </svg>
);

/**
 * Star rating display with optional numeric value and review count.
 */
export function Rating({ value = 5, max = 5, showValue = true, count, className = "", ...props }) {
  ensureStyles();
  const rounded = Math.round(value);
  return (
    <span className={`pe-rating ${className}`} {...props}>
      <span className="pe-rating__stars">
        {Array.from({ length: max }).map((_, i) => <Star key={i} filled={i < rounded} />)}
      </span>
      {showValue && <span className="pe-rating__value">{value.toFixed(1)}</span>}
      {count != null && <span className="pe-rating__count">({count.toLocaleString()})</span>}
    </span>
  );
}
