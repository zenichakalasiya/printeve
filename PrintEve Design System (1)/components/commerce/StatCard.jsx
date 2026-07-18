import React from "react";

const CSS = `
.pe-stat { display: flex; flex-direction: column; gap: 0.35rem; padding: var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-background); box-shadow: var(--shadow-card); }
.pe-stat__icon { width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); display: inline-flex; align-items: center; justify-content: center; background: var(--color-primary-soft); color: var(--color-primary-soft-fg); margin-bottom: 0.5rem; }
.pe-stat__icon svg { width: 1.25rem; height: 1.25rem; }
.pe-stat__value { font-size: var(--text-4xl); font-weight: var(--weight-extra); color: var(--color-text); letter-spacing: var(--tracking-tight); line-height: 1; }
.pe-stat__label { font-size: var(--text-sm); color: var(--color-text-muted); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-stat-css")) {
    const s = document.createElement("style");
    s.id = "pe-stat-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Trust statistic card — big numeral with a label and optional icon.
 */
export function StatCard({ value, label, icon, className = "", ...props }) {
  ensureStyles();
  return (
    <div className={`pe-stat ${className}`} {...props}>
      {icon && <span className="pe-stat__icon">{icon}</span>}
      <span className="pe-stat__value">{value}</span>
      <span className="pe-stat__label">{label}</span>
    </div>
  );
}
