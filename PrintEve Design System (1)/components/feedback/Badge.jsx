import React from "react";

const CSS = `
.pe-badge {
  display: inline-flex; align-items: center; gap: 0.3rem;
  border-radius: var(--radius-full); padding: 0.25rem 0.625rem;
  font-family: var(--font-sans); font-size: var(--text-xs); font-weight: var(--weight-medium);
  line-height: 1; white-space: nowrap; border: 1px solid transparent;
}
.pe-badge svg { width: 0.8rem; height: 0.8rem; }
.pe-badge--default   { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border); }
.pe-badge--primary   { background: var(--color-primary-soft); color: var(--color-primary-soft-fg); }
.pe-badge--secondary { background: color-mix(in srgb, var(--color-secondary) 14%, transparent); color: var(--color-primary-hover); }
.pe-badge--accent    { background: var(--color-accent); color: var(--color-accent-fg); }
.pe-badge--success   { background: var(--color-primary-soft); color: var(--color-primary-soft-fg); }
.pe-badge--danger    { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
.pe-badge--warning   { background: color-mix(in srgb, var(--color-warning) 16%, transparent); color: #92580a; }
.pe-badge--outline   { background: transparent; color: var(--color-text-muted); border-color: var(--color-border); }
.pe-badge__dot { width: 0.4rem; height: 0.4rem; border-radius: 50%; background: currentColor; }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-badge-css")) {
    const s = document.createElement("style");
    s.id = "pe-badge-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Small status / category label.
 */
export function Badge({ variant = "default", dot = false, className = "", children, ...props }) {
  ensureStyles();
  return (
    <span className={`pe-badge pe-badge--${variant} ${className}`} {...props}>
      {dot && <span className="pe-badge__dot" />}
      {children}
    </span>
  );
}
