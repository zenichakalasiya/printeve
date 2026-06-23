import React from "react";

const CSS = `
.pe-acc { border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-background); overflow: hidden; }
.pe-acc__item { border-bottom: 1px solid var(--color-border); }
.pe-acc__item:last-child { border-bottom: 0; }
.pe-acc__trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 1.125rem 1.5rem; background: none; border: 0; cursor: pointer; text-align: left;
  font-family: var(--font-sans); font-size: var(--text-base); font-weight: var(--weight-semibold);
  color: var(--color-text); transition: color .15s ease;
}
.pe-acc__trigger:hover { color: var(--color-primary); }
.pe-acc__trigger:focus-visible { outline: var(--ring-width) solid var(--color-ring); outline-offset: -2px; }
.pe-acc__chevron { flex-shrink: 0; color: var(--color-text-muted); transition: transform .22s ease; }
.pe-acc__item--open .pe-acc__chevron { transform: rotate(180deg); color: var(--color-primary); }
.pe-acc__panel { overflow: hidden; transition: height .24s ease; height: 0; }
.pe-acc__panel-inner { padding: 0 1.5rem 1.25rem; color: var(--color-text-muted); font-size: var(--text-sm); line-height: var(--leading-relaxed); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-acc-css")) {
    const s = document.createElement("style");
    s.id = "pe-acc-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Single-expand accordion. `items` is an array of { question, answer }.
 */
export function Accordion({ items = [], defaultOpen = 0, className = "", ...props }) {
  ensureStyles();
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={`pe-acc ${className}`} {...props}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`pe-acc__item${isOpen ? " pe-acc__item--open" : ""}`}>
            <button className="pe-acc__trigger" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {item.question}
              <svg className="pe-acc__chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="pe-acc__panel" style={{ height: isOpen ? "auto" : 0 }}>
              <div className="pe-acc__panel-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
