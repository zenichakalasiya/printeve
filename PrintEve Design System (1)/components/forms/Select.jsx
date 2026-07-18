import React from "react";

const CSS = `
.pe-select-wrap { position: relative; display: flex; flex-direction: column; gap: 0.4rem; }
.pe-select-box { position: relative; display: flex; align-items: center; }
.pe-select {
  appearance: none; -webkit-appearance: none; width: 100%; height: 2.75rem; box-sizing: border-box;
  border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  background: var(--color-background); color: var(--color-text);
  padding: 0 2.25rem 0 0.875rem; font-family: var(--font-sans); font-size: var(--text-sm);
  cursor: pointer; transition: border-color .16s ease, box-shadow .16s ease;
}
.pe-select:hover { border-color: var(--color-border-strong); }
.pe-select:focus-visible { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.pe-select:disabled { opacity: .55; cursor: not-allowed; background: var(--color-surface); }
.pe-select-chevron { position: absolute; right: 0.75rem; pointer-events: none; color: var(--color-text-muted); display: inline-flex; }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-select-css")) {
    const s = document.createElement("style");
    s.id = "pe-select-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Styled native select with PrintEve chrome and a custom chevron.
 */
export function Select({ label, options = [], placeholder, id, className = "", children, ...props }) {
  ensureStyles();
  const selId = id || (label ? `pe-sel-${Math.random().toString(36).slice(2, 8)}` : undefined);
  return (
    <div className="pe-select-wrap">
      {label && <label className="pe-label" htmlFor={selId}>{label}</label>}
      <div className="pe-select-box">
        <select id={selId} className={`pe-select ${className}`} {...props}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const label2 = typeof o === "string" ? o : o.label;
            return <option key={value} value={value}>{label2}</option>;
          })}
          {children}
        </select>
        <span className="pe-select-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </div>
  );
}
