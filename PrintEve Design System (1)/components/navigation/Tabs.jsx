import React from "react";

const CSS = `
.pe-tabs__list { display: inline-flex; gap: 0.25rem; padding: 0.25rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.pe-tabs__tab {
  appearance: none; border: 0; cursor: pointer; background: transparent;
  padding: 0.5rem 1rem; border-radius: var(--radius-sm);
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  color: var(--color-text-muted); transition: background-color .15s ease, color .15s ease, box-shadow .15s ease;
}
.pe-tabs__tab:hover { color: var(--color-text); }
.pe-tabs__tab--active { background: var(--color-background); color: var(--color-primary); box-shadow: var(--shadow-xs); }
.pe-tabs__tab:focus-visible { outline: var(--ring-width) solid var(--color-ring); outline-offset: 2px; }
.pe-tabs__panel { padding-top: var(--space-4); }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-tabs-css")) {
    const s = document.createElement("style");
    s.id = "pe-tabs-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Segmented tabs. `tabs` is an array of { label, content }.
 */
export function Tabs({ tabs = [], defaultIndex = 0, className = "", ...props }) {
  ensureStyles();
  const [active, setActive] = React.useState(defaultIndex);
  return (
    <div className={className} {...props}>
      <div className="pe-tabs__list" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            className={`pe-tabs__tab${active === i ? " pe-tabs__tab--active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs[active] && <div className="pe-tabs__panel" role="tabpanel">{tabs[active].content}</div>}
    </div>
  );
}
