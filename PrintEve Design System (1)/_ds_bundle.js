/* @ds-bundle: {"format":3,"namespace":"PrintEveDesignSystem_a6adda","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"CategoryCard","sourcePath":"components/commerce/CategoryCard.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"StatCard","sourcePath":"components/commerce/StatCard.jsx"},{"name":"Avatar","sourcePath":"components/feedback/Avatar.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Rating","sourcePath":"components/feedback/Rating.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardHeader","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardBody","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardFooter","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"5421227daaef","components/commerce/CategoryCard.jsx":"b05ac80b9b52","components/commerce/ProductCard.jsx":"16cab4caa2bc","components/commerce/StatCard.jsx":"240c7e56f3eb","components/feedback/Avatar.jsx":"640a044a3780","components/feedback/Badge.jsx":"e13afb4b3352","components/feedback/Rating.jsx":"43dc9385b1f6","components/forms/Input.jsx":"e6c5d9e1ef6c","components/forms/Select.jsx":"1fc20644d112","components/forms/Textarea.jsx":"4c96238be08a","components/navigation/Accordion.jsx":"8f11ada523a6","components/navigation/Tabs.jsx":"74feb2c1d7a6","components/surfaces/Card.jsx":"85dd89cacce5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PrintEveDesignSystem_a6adda = window.PrintEveDesignSystem_a6adda || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["pe-btn", `pe-btn--${variant}`, `pe-btn--${size}`, fullWidth ? "pe-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: cls
  }, props), leftIcon, size !== "icon" ? children : children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CategoryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function CategoryCard({
  name,
  description,
  iconSrc,
  icon,
  href = "#",
  as = "a",
  className = "",
  ...props
}) {
  ensureStyles();
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: `pe-cat ${className}`,
    href: as === "a" ? href : undefined
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pe-cat__icon"
  }, iconSrc ? /*#__PURE__*/React.createElement("img", {
    src: iconSrc,
    alt: ""
  }) : icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "pe-cat__name"
  }, name), description && /*#__PURE__*/React.createElement("p", {
    className: "pe-cat__desc"
  }, description)));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pe-stat { display: flex; flex-direction: column; gap: 0.35rem; padding: var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-background); box-shadow: var(--shadow-card); }
.pe-stat__icon { width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); display: inline-flex; align-items: center; justify-content: center; background: var(--color-primary-soft); color: var(--color-primary-soft-fg); margin-bottom: 0.5rem; }
.pe-stat__icon svg { width: 1.25rem; height: 1.25rem; }
.pe-stat__value { font-size: var(--text-4xl); font-weight: var(--weight-extra); color: var(--color-text); letter-spacing: var(--tracking-tight); line-height: 1; }
.pe-stat__label { font-size: var(--text-sm); color: var(--color-text-muted); }
`;
function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-stat-css")) {
    const s = document.createElement("style");
    s.id = "pe-stat-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Trust statistic card — big numeral with a label and optional icon.
 */
function StatCard({
  value,
  label,
  icon,
  className = "",
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `pe-stat ${className}`
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: "pe-stat__icon"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "pe-stat__value"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "pe-stat__label"
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

/**
 * Circular user avatar — image when available, falling back to initials.
 */
function Avatar({
  src,
  name = "",
  size = "md",
  className = "",
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `pe-avatar pe-avatar--${size} ${className}`,
    title: name
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pe-badge {
  display: inline-flex; align-items: center; gap: 0.3rem;
  border-radius: var(--radius-full); padding: 0.25rem 0.625rem;
  font-family: var(--font-sans); font-size: var(--text-xs); font-weight: var(--weight-medium);
  line-height: 1; white-space: nowrap; border: 1px solid transparent;
}
.pe-badge svg { width: 0.8rem; height: 0.8rem; }
.pe-badge--default   { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border); }
.pe-badge--primary   { background: var(--color-primary-soft); color: var(--color-primary-soft-fg); }
.pe-badge--secondary { background: color-mix(in srgb, var(--color-secondary) 14%, transparent); color: var(--color-primary-hover); }
.pe-badge--accent    { background: var(--color-accent); color: var(--color-accent-fg); }
.pe-badge--success   { background: var(--color-primary-soft); color: var(--color-primary-soft-fg); }
.pe-badge--danger    { background: color-mix(in srgb, var(--color-danger) 12%, transparent); color: var(--color-danger); }
.pe-badge--warning   { background: color-mix(in srgb, var(--color-warning) 16%, transparent); color: #92580a; }
.pe-badge--outline   { background: transparent; color: var(--color-text-muted); border-color: var(--color-border); }
.pe-badge__dot { width: 0.4rem; height: 0.4rem; border-radius: 50%; background: currentColor; }
`;
function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-badge-css")) {
    const s = document.createElement("style");
    s.id = "pe-badge-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/**
 * Small status / category label.
 */
function Badge({
  variant = "default",
  dot = false,
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `pe-badge pe-badge--${variant} ${className}`
  }, props), dot && /*#__PURE__*/React.createElement("span", {
    className: "pe-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.pe-rating { display: inline-flex; align-items: center; gap: 0.35rem; }
.pe-rating__stars { display: inline-flex; gap: 1px; color: var(--color-secondary); }
.pe-rating__stars svg { width: 1rem; height: 1rem; }
.pe-rating__empty { color: var(--color-border-strong); }
.pe-rating__value { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }
.pe-rating__count { font-size: var(--text-xs); color: var(--color-text-muted); }
`;
function ensureStyles() {
  if (typeof document !== "undefined" && !document.getElementById("pe-rating-css")) {
    const s = document.createElement("style");
    s.id = "pe-rating-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const Star = ({
  filled
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: filled ? "currentColor" : "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  className: filled ? "" : "pe-rating__empty"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z"
}));

/**
 * Star rating display with optional numeric value and review count.
 */
function Rating({
  value = 5,
  max = 5,
  showValue = true,
  count,
  className = "",
  ...props
}) {
  ensureStyles();
  const rounded = Math.round(value);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `pe-rating ${className}`
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pe-rating__stars"
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement(Star, {
    key: i,
    filled: i < rounded
  }))), showValue && /*#__PURE__*/React.createElement("span", {
    className: "pe-rating__value"
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    className: "pe-rating__count"
  }, "(", count.toLocaleString(), ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Rating.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function ProductCard({
  name,
  price,
  imageSrc,
  image,
  rating,
  reviews,
  badge,
  href = "#",
  as = "a",
  className = "",
  ...props
}) {
  ensureStyles();
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: `pe-prod ${className}`,
    href: as === "a" ? href : undefined
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "pe-prod__media"
  }, badge && /*#__PURE__*/React.createElement("span", {
    className: "pe-prod__badge"
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "primary"
  }, badge)), imageSrc ? /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: name
  }) : image), /*#__PURE__*/React.createElement("div", {
    className: "pe-prod__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pe-prod__name"
  }, name), rating != null && /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: reviews
  }), /*#__PURE__*/React.createElement("div", {
    className: "pe-prod__foot"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pe-prod__from"
  }, "From"), /*#__PURE__*/React.createElement("div", {
    className: "pe-prod__price"
  }, price)), /*#__PURE__*/React.createElement("span", {
    className: "pe-prod__cta"
  }, "View", /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5l7 7-7 7"
  }))))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Input({
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
  const cls = ["pe-input", icon ? "pe-input--has-icon" : "", error ? "pe-input--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "pe-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "pe-label",
    htmlFor: inputId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "pe-label__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "pe-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "pe-input-wrap__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: cls,
    "aria-invalid": !!error
  }, props))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: `pe-field__hint${error ? " pe-field__hint--error" : ""}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Select({
  label,
  options = [],
  placeholder,
  id,
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  const selId = id || (label ? `pe-sel-${Math.random().toString(36).slice(2, 8)}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "pe-select-wrap"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "pe-label",
    htmlFor: selId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "pe-select-box"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: `pe-select ${className}`
  }, props), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const label2 = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label2);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "pe-select-chevron",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Textarea({
  label,
  hint,
  error,
  required = false,
  rows = 4,
  id,
  className = "",
  ...props
}) {
  ensureStyles();
  const taId = id || (label ? `pe-ta-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const cls = ["pe-textarea", error ? "pe-textarea--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "pe-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "pe-label",
    htmlFor: taId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "pe-label__req"
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    className: cls,
    "aria-invalid": !!error
  }, props)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: `pe-field__hint${error ? " pe-field__hint--error" : ""}`
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Accordion({
  items = [],
  defaultOpen = 0,
  className = "",
  ...props
}) {
  ensureStyles();
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `pe-acc ${className}`
  }, props), items.map((item, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `pe-acc__item${isOpen ? " pe-acc__item--open" : ""}`
    }, /*#__PURE__*/React.createElement("button", {
      className: "pe-acc__trigger",
      "aria-expanded": isOpen,
      onClick: () => setOpen(isOpen ? -1 : i)
    }, item.question, /*#__PURE__*/React.createElement("svg", {
      className: "pe-acc__chevron",
      viewBox: "0 0 24 24",
      width: "18",
      height: "18",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m6 9 6 6 6-6"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "pe-acc__panel",
      style: {
        height: isOpen ? "auto" : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "pe-acc__panel-inner"
    }, item.answer)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Tabs({
  tabs = [],
  defaultIndex = 0,
  className = "",
  ...props
}) {
  ensureStyles();
  const [active, setActive] = React.useState(defaultIndex);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "pe-tabs__list",
    role: "tablist"
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    role: "tab",
    "aria-selected": active === i,
    className: `pe-tabs__tab${active === i ? " pe-tabs__tab--active" : ""}`,
    onClick: () => setActive(i)
  }, t.label))), tabs[active] && /*#__PURE__*/React.createElement("div", {
    className: "pe-tabs__panel",
    role: "tabpanel"
  }, tabs[active].content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
  hoverable = false,
  flat = false,
  padded = false,
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  const cls = ["pe-card", hoverable ? "pe-card--hoverable" : "", flat ? "pe-card--flat" : "", padded ? "pe-card--pad" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), children);
}
function CardHeader({
  title,
  description,
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `pe-card__header ${className}`
  }, props), title && /*#__PURE__*/React.createElement("h3", {
    className: "pe-card__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "pe-card__desc"
  }, description), children);
}
function CardBody({
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `pe-card__body ${className}`
  }, props), children);
}
function CardFooter({
  className = "",
  children,
  ...props
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `pe-card__footer ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardBody, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardBody = __ds_scope.CardBody;

__ds_ns.CardFooter = __ds_scope.CardFooter;

})();
