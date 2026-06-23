import React from "react";
import { Badge } from "../feedback/Badge.jsx";
import { Rating } from "../feedback/Rating.jsx";

const CSS = `
.pe-prod {
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  background: var(--color-background); text-decoration: none; cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
}
.pe-prod:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
.pe-prod__media { position: relative; aspect-ratio: 4 / 3; background: var(--color-surface); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.pe-prod__media img, .pe-prod__media svg { width: 64%; height: 64%; object-fit: contain; transition: transform .3s ease; }
.pe-prod:hover .pe-prod__media img, .pe-prod:hover .pe-prod__media svg { transform: scale(1.06); }
.pe-prod__badge { position: absolute; top: 0.75rem; left: 0.75rem; }
.pe-prod__body { display: flex; flex-direction: column; gap: 0.5rem; padding: var(--space-4); flex: 1; }
.pe-prod__name { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); margin: 0; }
.pe-prod__foot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; }
.pe-prod__from { font-size: var(--text-xs); color: var(--color-text-muted); }
.pe-prod__price { font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--color-text); }
.pe-prod__cta { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-primary); display: inline-flex; align-items: center; gap: 0.25rem; opacity: 0; transition: opacity .2s ease; }
.pe-prod:hover .pe-prod__cta { opacity: 1; }
`;

function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-prod-css")) {
    const s = document.createElement("style");
    s.id = "pe-prod-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Featured-product showcase card with image, price, rating and quick CTA.
 */
export function ProductCard({ name, price, imageSrc, image, rating, reviews, badge, href = "#", as = "a", className = "", ...props }) {
  ensureStyles();
  const Comp = as;
  return (
    <Comp className={`pe-prod ${className}`} href={as === "a" ? href : undefined} {...props}>
      <div className="pe-prod__media">
        {badge && <span className="pe-prod__badge"><Badge variant="primary">{badge}</Badge></span>}
        {imageSrc ? <img src={imageSrc} alt={name} /> : image}
      </div>
      <div className="pe-prod__body">
        <h3 className="pe-prod__name">{name}</h3>
        {rating != null && <Rating value={rating} count={reviews} />}
        <div className="pe-prod__foot">
          <div>
            <div className="pe-prod__from">From</div>
            <div className="pe-prod__price">{price}</div>
          </div>
          <span className="pe-prod__cta">
            View
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </Comp>
  );
}
