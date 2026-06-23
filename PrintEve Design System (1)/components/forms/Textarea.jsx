import React from "react";

const CSS = `
.pe-field { display: flex; flex-direction: column; gap: 0.4rem; }
.pe-label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--color-text); }
.pe-label__req { color: var(--color-danger); margin-left: 2px; }
.pe-textarea {
  width: 100%; box-sizing: border-box; min-height: 5.5rem; resize: vertical;
  border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  background: var(--color-background); color: var(--color-text);
  padding: 0.625rem 0.875rem; font-family: var(--font-sans); font-size: var(--text-sm);
  line-height: var(--leading-normal);
  transition: border-color .16s ease, box-shadow .16s ease;
}
.pe-textarea::placeholder { color: var(--color-text-muted); }
.pe-textarea:hover { border-color: var(--color-border-strong); }
.pe-textarea:focus-visible { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.pe-textarea--error { border-color: var(--color-danger); }
.pe-field__hint { font-size: var(--text-xs); color: var(--color-text-muted); }
.pe-field__hint--error { color: var(--color-danger); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-textarea-css")) {
    const s = document.createElement("style");
    s.id = "pe-textarea-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Multi-line text field. Self-contained styling that mirrors Input.
 */
export function Textarea({ label, hint, error, required = false, rows = 4, id, className = "", ...props }) {
  ensureStyles();
  const taId = id || (label ? `pe-ta-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const cls = ["pe-textarea", error ? "pe-textarea--error" : "", className].filter(Boolean).join(" ");
  return (
    <div className="pe-field">
      {label && (
        <label className="pe-label" htmlFor={taId}>
          {label}{required && <span className="pe-label__req">*</span>}
        </label>
      )}
      <textarea id={taId} rows={rows} className={cls} aria-invalid={!!error} {...props} />
      {(hint || error) && (
        <span className={`pe-field__hint${error ? " pe-field__hint--error" : ""}`}>{error || hint}</span>
      )}
    </div>
  );
}
