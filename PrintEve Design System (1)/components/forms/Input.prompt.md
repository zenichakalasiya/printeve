**Input** — labeled single-line text field with optional icon, hint and error states.

```jsx
<Input label="Email" type="email" placeholder="you@company.com" required />
<Input label="Search products" icon={<SearchIcon />} placeholder="Business cards…" />
<Input label="Pincode" error="Enter a valid 6-digit pincode" defaultValue="12" />
```

Focus renders a soft-green ring. Pass `error` to switch to the danger style; `hint` for helper copy.
