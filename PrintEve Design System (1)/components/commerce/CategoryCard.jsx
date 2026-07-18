import React from "react";

const CSS = `
.pe-cat {
  display: flex; flex-direction: column; gap: var(--space-3);
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  background: var(--color-background); padding: var(--space-5);
  text-decoration: none; cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.pe-cat:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--color-primary) 32%, var(--color-border)); box-shadow: var(--shadow-card-hover); }
.pe-cat__icon {
  width: 3rem; height: 3rem; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  background: var(--color-primary-soft); padding: 0.35rem; transition: background-color .2s ease;
}
.pe-cat__icon img, .pe-cat__icon svg { width: 100%; height: 100%; object-fit: contain; }
.pe-cat__name { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); margin: 0; }
.pe-cat__desc { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0.2rem 0 0; line-height: var(--leading-normal); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-cat-css")) {
    const s = document.createElement("style");
    s.id = "pe-cat-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Product-category tile with brand illustration, name and one-line description.
 */
export function CategoryCard({ name, description, iconSrc, icon, href = "#", as = "a", className = "", ...props }) {
  ensureStyles();
  const Comp = as;
  return (
    <Comp className={`pe-cat ${className}`} href={as === "a" ? href : undefined} {...props}>
      <span className="pe-cat__icon">
        {iconSrc ? <img src={iconSrc} alt="" /> : icon}
      </span>
      <div>
        <h3 className="pe-cat__name">{name}</h3>
        {description && <p className="pe-cat__desc">{description}</p>}
      </div>
    </Comp>
  );
}
