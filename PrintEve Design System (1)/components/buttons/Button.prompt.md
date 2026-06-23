**Button** — the primary action control; green-filled by default with soft, outline, ghost and link emphasis levels.

```jsx
<Button variant="primary" size="lg" rightIcon={<ArrowRightIcon />}>Start an Order</Button>
<Button variant="outline">How It Works</Button>
<Button variant="secondary" leftIcon={<PlusIcon />}>Add design</Button>
<Button variant="ghost" size="icon" aria-label="Search"><SearchIcon /></Button>
```

Variants: `primary` (brand green), `secondary` (soft #DCFCE7 tonal), `outline`, `ghost`, `link`, `danger`.
Sizes: `sm`, `md` (default), `lg`, `icon`. Pass `fullWidth` to stretch, `as="a"` to render a link.
