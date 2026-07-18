import React from "react";

const CSS = `
.pe-avatar {
  display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
  border-radius: var(--radius-full); overflow: hidden; background: var(--color-primary-soft);
  color: var(--color-primary-soft-fg); font-family: var(--font-sans); font-weight: var(--weight-semibold);
  user-select: none;
}
.pe-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pe-avatar--sm { width: 2rem; height: 2rem; font-size: var(--text-xs); }
.pe-avatar--md { width: 2.75rem; height: 2.75rem; font-size: var(--text-sm); }
.pe-avatar--lg { width: 3.5rem; height: 3.5rem; font-size: var(--text-lg); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-avatar-css")) {
    const s = document.createElement("style");
    s.id = "pe-avatar-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

/**
 * Circular user avatar — image when available, falling back to initials.
 */
export function Avatar({ src, name = "", size = "md", className = "", ...props }) {
  ensureStyles();
  return (
    <span className={`pe-avatar pe-avatar--${size} ${className}`} title={name} {...props}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
