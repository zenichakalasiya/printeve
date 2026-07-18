import React from "react";

const CSS = `
.pe-card {
  background: var(--color-background); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-card);
  display: flex; flex-direction: column; overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.pe-card--hoverable { cursor: pointer; }
.pe-card--hoverable:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); border-color: color-mix(in srgb, var(--color-primary) 30%, var(--color-border)); }
.pe-card--flat { box-shadow: none; }
.pe-card--pad { padding: var(--space-6); }
.pe-card__header { padding: var(--space-6) var(--space-6) 0; }
.pe-card__title { font: var(--text-h3); margin: 0; color: var(--color-text); letter-spacing: var(--tracking-snug); }
.pe-card__desc { margin: 0.25rem 0 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }
.pe-card__body { padding: var(--space-6); }
.pe-card__footer { padding: 0 var(--space-6) var(--space-6); display: flex; align-items: center; gap: var(--space-3); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-card-css")) {
    const s = document.createElement("style");
    s.id = "pe-card-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/** Surface container. Compose with CardHeader / CardBody / CardFooter, or pass `padded`. */
export function Card({ hoverable = false, flat = false, padded = false, className = "", children, ...props }) {
  ensureStyles();
  const cls = [
    "pe-card",
    hoverable ? "pe-card--hoverable" : "",
    flat ? "pe-card--flat" : "",
    padded ? "pe-card--pad" : "",
    className,
  ].filter(Boolean).join(" ");
  return <div className={cls} {...props}>{children}</div>;
}

export function CardHeader({ title, description, className = "", children, ...props }) {
  ensureStyles();
  return (
    <div className={`pe-card__header ${className}`} {...props}>
      {title && <h3 className="pe-card__title">{title}</h3>}
      {description && <p className="pe-card__desc">{description}</p>}
      {children}
    </div>
  );
}

export function CardBody({ className = "", children, ...props }) {
  ensureStyles();
  return <div className={`pe-card__body ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = "", children, ...props }) {
  ensureStyles();
  return <div className={`pe-card__footer ${className}`} {...props}>{children}</div>;
}
