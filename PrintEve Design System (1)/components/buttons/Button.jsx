import React from "react";

const CSS = `
.pe-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  white-space: nowrap; font-family: var(--font-sans); font-weight: var(--weight-semibold);
  border-radius: var(--radius-md); border: 1px solid transparent; cursor: pointer;
  transition: background-color .18s ease, color .18s ease, border-color .18s ease,
              box-shadow .18s ease, transform .06s ease;
  text-decoration: none; line-height: 1;
}
.pe-btn:focus-visible { outline: var(--ring-width) solid var(--color-ring); outline-offset: var(--ring-offset); }
.pe-btn:disabled, .pe-btn[aria-disabled="true"] { opacity: .5; pointer-events: none; }
.pe-btn:active { transform: translateY(0.5px); }
.pe-btn svg { width: 1.05em; height: 1.05em; flex-shrink: 0; }

/* sizes */
.pe-btn--sm { height: 2.25rem; padding: 0 0.875rem; font-size: var(--text-sm); }
.pe-btn--md { height: 2.75rem; padding: 0 1.25rem; font-size: var(--text-sm); }
.pe-btn--lg { height: 3rem; padding: 0 1.75rem; font-size: var(--text-base); }
.pe-btn--icon { height: 2.75rem; width: 2.75rem; padding: 0; }
.pe-btn--block { width: 100%; }

/* variants */
.pe-btn--primary { background: var(--color-primary); color: var(--color-primary-foreground); box-shadow: var(--shadow-xs); }
.pe-btn--primary:hover { background: var(--color-primary-hover); box-shadow: var(--shadow-brand); }
.pe-btn--secondary { background: var(--color-primary-soft); color: var(--color-primary-soft-fg); }
.pe-btn--secondary:hover { background: color-mix(in srgb, var(--color-primary-soft) 80%, var(--color-primary) 20%); }
.pe-btn--outline { background: var(--color-background); color: var(--color-text); border-color: var(--color-border); }
.pe-btn--outline:hover { background: var(--color-surface); border-color: var(--color-border-strong); }
.pe-btn--ghost { background: transparent; color: var(--color-text); }
.pe-btn--ghost:hover { background: var(--color-surface); }
.pe-btn--link { background: transparent; color: var(--color-primary); height: auto; padding: 0; border-radius: 0; }
.pe-btn--link:hover { text-decoration: underline; box-shadow: none; }
.pe-btn--danger { background: var(--color-danger); color: #fff; }
.pe-btn--danger:hover { background: color-mix(in srgb, var(--color-danger) 86%, #000 14%); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-btn-css")) {
    const s = document.createElement("style");
    s.id = "pe-btn-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * PrintEve primary action button.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  as = "button",
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  const Comp = as;
  const cls = [
    "pe-btn",
    `pe-btn--${variant}`,
    `pe-btn--${size}`,
    fullWidth ? "pe-btn--block" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <Comp className={cls} {...props}>
      {leftIcon}
      {size !== "icon" ? children : children}
      {rightIcon}
    </Comp>
  );
}
