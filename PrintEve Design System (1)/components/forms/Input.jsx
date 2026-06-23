import React from "react";

const CSS = `
.pe-field { display: flex; flex-direction: column; gap: 0.4rem; }
.pe-label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--color-text); }
.pe-label__req { color: var(--color-danger); margin-left: 2px; }
.pe-input-wrap { position: relative; display: flex; align-items: center; }
.pe-input-wrap__icon { position: absolute; left: 0.75rem; display: inline-flex; color: var(--color-text-muted); pointer-events: none; }
.pe-input-wrap__icon svg { width: 1rem; height: 1rem; }
.pe-input {
  width: 100%; height: 2.75rem; box-sizing: border-box;
  border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  background: var(--color-background); color: var(--color-text);
  padding: 0 0.875rem; font-family: var(--font-sans); font-size: var(--text-sm);
  transition: border-color .16s ease, box-shadow .16s ease, background-color .16s ease;
}
.pe-input--has-icon { padding-left: 2.25rem; }
.pe-input::placeholder { color: var(--color-text-muted); }
.pe-input:hover { border-color: var(--color-border-strong); }
.pe-input:focus-visible { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.pe-input:disabled { opacity: .55; cursor: not-allowed; background: var(--color-surface); }
.pe-input--error { border-color: var(--color-danger); }
.pe-input--error:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-danger) 18%, transparent); }
.pe-field__hint { font-size: var(--text-xs); color: var(--color-text-muted); }
.pe-field__hint--error { color: var(--color-danger); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-field-css")) {
    const s = document.createElement("style");
    s.id = "pe-field-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Labeled text input with optional leading icon, hint and error states.
 */
export function Input({
  label,
  hint,
  error,
  required = false,
  icon = null,
  id,
  className = "",
  ...props
}) {
  ensureStyles();
  const inputId = id || (label ? `pe-input-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const cls = [
    "pe-input",
    icon ? "pe-input--has-icon" : "",
    error ? "pe-input--error" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className="pe-field">
      {label && (
        <label className="pe-label" htmlFor={inputId}>
          {label}{required && <span className="pe-label__req">*</span>}
        </label>
      )}
      <div className="pe-input-wrap">
        {icon && <span className="pe-input-wrap__icon">{icon}</span>}
        <input id={inputId} className={cls} aria-invalid={!!error} {...props} />
      </div>
      {(hint || error) && (
        <span className={`pe-field__hint${error ? " pe-field__hint--error" : ""}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
