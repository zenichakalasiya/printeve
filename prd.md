# Product Requirements Document (PRD) — PrintEve
## Version 1.0

* **Version:** 1.0
* **Status:** Draft
* **Stage:** Greenfield
* **Last Updated:** June 2026

---

## 1. Executive Summary

PrintEve is an on-demand custom printing platform that connects customers who want personalised print products (Stickers, posters, Banners, Pamphlets, batches etc) with a network of verified printer vendors who fulfil those orders.

The platform operates across four surfaces — a customer website, a customer mobile app, an internal admin dashboard, and a dedicated printer vendor portal — all powered by a single Bun API backend at `api.printeve.in`.

V1 delivers a complete end-to-end platform: customers browse, customise, and order; printers receive, fulfil, and dispatch; admins manage the full operation from one place. PrintEve takes a platform margin on each fulfilled order.

---

## 2. Problem Statement

* **For customers:** Getting custom printed products today means finding a local printer, negotiating pricing, sending files over WhatsApp, and hoping for quality. There is no reliable, branded, digital-first experience for ordering custom print goods online.
* **For printer vendors:** Small and mid-size print shops have idle capacity but no scalable channel for consistent order volume. They rely on walk-ins and word of mouth with no digital job management tooling.
* **For the business:** A clear gap exists for a platform that aggregates print demand and routes it efficiently to a vendor network — taking a margin on each order while giving both sides a superior experience.

---

## 3. Goals & Success Metrics

### Business goals
* Launch with at least 3 onboarded printer vendors before public launch.
* Process first 100 orders within 30 days of launch.

### Product goals
* **Customer:** landing page → placed order in under 5 minutes.
* **Printer:** accept and update a job status in under 2 minutes.
* **Admin:** assign an order to a printer within 1 minute of placement.

---

## 4. Users & Personas

### Customer (Web + App)
Individuals and small businesses ordering custom printed products.
* **Needs:** easy product discovery, transparent pricing, real-time order tracking, reliable quality.
* **Pain points today:** no trusted online destination, unclear pricing, no tracking after ordering, inconsistent quality.

### Admin ([admin.printeve.in](http://admin.printeve.in))
PrintEve internal operations team.
* **Needs:** full visibility across all orders, users, and vendors; ability to manually assign print jobs to the right vendor; product catalog management; revenue reporting; platform settings control.

### Printer Vendor ([printer.printeve.in](http://printer.printeve.in))
External print shop owners or operators fulfilling orders.
* **Needs:** clear incoming job view with all files and specs, simple accept/reject flow, status update tools, proof upload, earnings visibility.
* **Pain points today:** all job management over WhatsApp, no proof-of-completion workflow, unpredictable order volume.

---

## 5. Scope — V1

### In Scope
* Customer web app — `printeve.in`
* Customer mobile app — iOS + Android (login mandatory)
* Admin dashboard — `admin.printeve.in`
* Printer vendor portal — `printer.printeve.in`
* Single Bun API — `api.printeve.in` with 4 namespaces: `/v1/web`, `/v1/app`, `/v1/admin`, `/v1/printer`
* Product catalog with categories and variants
* Custom design file upload (PNG, PDF, AI — max 3GB)
* Cart and checkout with Razorpay payment
* Order management and live status tracking
* Manual print job assignment (admin assigns to vendor)
* Print job fulfillment workflow
* Email notifications via Resend
* Push notifications via FCM (mobile app)
* Admin reporting and analytics
* Printer vendor onboarding and profile management
* Customer data anonymised for printer vendors (order ID + area only)

### Out of Scope — Post-V1
* In-browser design editor
* Multi-vendor cart
* Auto-assignment of jobs by location or capacity
* Guest checkout on mobile app
* Customer reviews and ratings
* Loyalty points / rewards
* International shipping
* White-label printer portal
* Public API for third-party integrations

---

## 6. Features & Requirements

**Priority Levels:**
* **P0** = must ship
* **P1** = should ship
* **P2** = nice to have

### 6.1 Customer Web (`printeve.in`)

#### Authentication
| Requirement | Priority |
| :--- | :--- |
| Register with name, email, and password | P0 |
| Login → HttpOnly session cookie (7-day sliding expiry) | P0 |
| Logout clears session server-side | P0 |
| Password reset via email OTP | P1 |
| Google OAuth login | P2 |

#### Product Catalog
| Requirement | Priority |
| :--- | :--- |
| Homepage with featured products and categories | P0 |
| Browse by category with filters (price, category) | P0 |
| Product listing — paginated, filterable | P0 |
| Product detail — images, description, variants, pricing | P0 |
| Upload custom design file (PNG, PDF, AI — max 3GB) | P0 |
| Product search by name / keyword | P1 |
| Recently viewed products | P2 |

#### Cart
| Requirement | Priority |
| :--- | :--- |
| Add product with variant and quantity to cart | P0 |
| Update quantity or remove items | P0 |
| Cart persists across sessions (linked to account) | P0 |
| Cart shows subtotal, tax, and total | P0 |
| Apply coupon code | P1 |

#### Checkout
| Requirement | Priority |
| :--- | :--- |
| Select or add delivery address | P0 |
| Order summary shown before payment | P0 |
| Pay via Razorpay — UPI, card, netbanking, wallets | P0 |
| On success → order created, confirmation email sent | P0 |
| On failure → error shown with retry option | P0 |
| Razorpay webhook handles async confirmation (idempotent) | P0 |

#### Orders
| Requirement | Priority |
| :--- | :--- |
| View order history | P0 |
| View full order detail — items, status, address, payment | P0 |
| Live order status (refreshes on page load) | P0 |
| Email notification on each status change | P1 |
| Download invoice as PDF | P2 |

#### Account
| Requirement | Priority |
| :--- | :--- |
| View and update profile | P0 |
| Address book — add, edit, delete, set default | P0 |
| Change password | P1 |

---

### 6.2 Customer Mobile App (iOS + Android)

> [!NOTE]
> Login is mandatory. Guest checkout is not supported in V1.

#### Authentication
| Requirement | Priority |
| :--- | :--- |
| Register with name, email, password | P0 |
| Login → access token (15 min) + refresh token (30 days) | P0 |
| Silent token refresh on expiry | P0 |
| Logout invalidates refresh token server-side | P0 |
| Biometric login after first login (FaceID / fingerprint) | P2 |

#### Product Catalog
| Requirement | Priority |
| :--- | :--- |
| Home screen — featured products and categories | P0 |
| Browse by category with filters | P0 |
| Product detail — images, variants, pricing | P0 |
| Upload custom design from camera roll or files | P0 |
| Product search by keyword | P1 |

#### Cart & Checkout
| Requirement | Priority |
| :--- | :--- |
| Add, update, remove cart items | P0 |
| Cart persists across app sessions | P0 |
| Select or add delivery address at checkout | P0 |
| Pay via Razorpay — UPI, card, wallets | P0 |
| Order confirmation screen on success | P0 |
| Coupon code input | P1 |

#### Orders & Tracking
| Requirement | Priority |
| :--- | :--- |
| Order history screen | P0 |
| Order detail with live status | P0 |
| Push notification on every order status change | P0 |
| FCM device token registered on login | P0 |

#### Profile
| Requirement | Priority |
| :--- | :--- |
| View and edit profile | P0 |
| Address book management | P0 |
| Notification preferences | P1 |

---

### 6.3 Admin Dashboard (`admin.printeve.in`)

#### Authentication & Access
| Requirement | Priority |
| :--- | :--- |
| Admin login → JWT (separate secret from all other namespaces) | P0 |
| Portal IP-restricted at Nginx level | P0 |
| Every admin action audit-logged — who, what, when, record ID | P0 |

#### Dashboard
| Requirement | Priority |
| :--- | :--- |
| KPIs: revenue today, orders today, new users, pending print jobs | P0 |
| Revenue chart — daily / weekly / monthly toggle | P0 |
| Orders by status breakdown chart | P1 |
| Top selling products widget | P1 |

#### Order Management
| Requirement | Priority |
| :--- | :--- |
| View all orders — filter by status, date range, customer | P0 |
| View full order detail | P0 |
| Manually update order status | P0 |
| Manually assign order to a printer vendor → creates PrintJob | P0 |
| Issue full or partial refund | P1 |
| Export orders to CSV | P2 |

#### Product Management
| Requirement | Priority |
| :--- | :--- |
| View all products with active/inactive status | P0 |
| Create product — name, description, category, variants, pricing, images | P0 |
| Edit existing product | P0 |
| Delete / deactivate product | P0 |
| Manage categories — create, edit, delete, reorder | P0 |

#### User, Printer & Coupon Management
| Requirement | Priority |
| :--- | :--- |
| View all customers — searchable and filterable | P0 |
| View customer profile and full order history | P0 |
| Block / unblock a customer account | P1 |
| View all printer vendor accounts | P0 |
| Create printer account — generates login credentials | P0 |
| Edit printer account details | P0 |
| Deactivate / remove printer vendor | P1 |
| Create coupon — code, flat/%, min order, expiry, usage limit | P0 |
| View and delete coupons | P0 |

#### Reports & Settings
| Requirement | Priority |
| :--- | :--- |
| Revenue report — by day / week / month / custom range | P0 |
| Order report — volume, status breakdown, AOV | P1 |
| Product performance — top sellers, revenue by product | P1 |
| Configure tax rate (%) | P0 |
| Configure flat or tiered shipping charges | P0 |
| Free shipping threshold | P1 |

---

### 6.4 Printer Vendor Portal (`printer.printeve.in`)

> [!IMPORTANT]
> Customer data is anonymised for all printer vendors. Jobs show order ID and delivery area only — no customer name or full address is ever exposed.

#### Authentication
| Requirement | Priority |
| :--- | :--- |
| Printer login → JWT (separate secret) | P0 |
| Portal IP-restricted at Nginx level | P0 |
| Access token: 12h · Refresh token: 14 days | P0 |

#### Dashboard
| Requirement | Priority |
| :--- | :--- |
| Stats: pending jobs, in-progress, completed, earnings this month | P0 |
| Recent job activity feed | P1 |

#### Job Management
| Requirement | Priority |
| :--- | :--- |
| View all jobs assigned to this printer only (hard-scoped in API) | P0 |
| Job detail — product specs, quantity, design files, delivery area (anonymised) | P0 |
| Accept a job | P0 |
| Reject a job with a mandatory reason | P0 |
| Update status: Printing → Ready → Dispatched | P0 |
| Upload proof photo on job completion | P0 |
| View completed and rejected job history | P1 |

#### Profile
| Requirement | Priority |
| :--- | :--- |
| View and update business name, address, contact details | P0 |
| View account status — active / suspended | P1 |

---

## 7. Order Lifecycle

### Order Status Flow
| Status | Description |
| :--- | :--- |
| `PENDING` | Order placed, payment initiated via Razorpay |
| `CONFIRMED` | Payment confirmed via webhook — customer notified |
| `PRINTING` | Admin assigns to printer, printer accepts — job in progress |
| `READY` | Printer marks job ready, uploads proof photo |
| `SHIPPED` | Printer marks dispatched — customer notified |
| `DELIVERED` | Admin marks delivered — customer notified |
| `CANCELLED` | Cancelled before printing begins |
| `REFUNDED` | Refund issued by admin |

### Print Job Status Flow
| Status | Description |
| :--- | :--- |
| `ASSIGNED` | Job created and manually assigned to a printer by admin |
| `ACCEPTED` | Printer accepts the job |
| `IN_PROGRESS` | Printer is actively working on the job |
| `READY` | Job complete, awaiting dispatch |
| `DISPATCHED` | Job shipped to customer |
| `REJECTED` | Printer rejects — admin must re-assign manually |

> [!NOTE]
> Auto-assignment by location or capacity is planned for a post-V1 release.

---

## 8. Notification Strategy

| Event | Customer Email | Customer Push | Admin | Printer |
| :--- | :---: | :---: | :---: | :---: |
| Order placed | ✓ | ✓ | — | — |
| Payment failed | ✓ | ✓ | — | — |
| Order confirmed | ✓ | ✓ | — | — |
| Job assigned to printer | — | — | — | ✓ Email |
| Printer accepts job | — | — | ✓ | — |
| Printer rejects job | — | — | ✓ | — |
| Order status: Printing | ✓ | ✓ | — | — |
| Order status: Shipped | ✓ | ✓ | — | — |
| Order status: Delivered | ✓ | ✓ | — | — |
| Refund issued | ✓ | ✓ | — | — |

---

## 9. Non-Functional Requirements

### Performance
* API p95 response time < 300ms under normal load.
* Product listing page loads in < 2 seconds.
* Design file uploads support up to 2GB.

### Security
* All traffic over HTTPS (TLS 1.2+).
* JWT secrets isolated per namespace — a customer token is useless against admin routes.
* Admin and printer portals IP-restricted at Nginx level.
* Passwords hashed with bcrypt (min 12 rounds).
* CSRF protection on all web session mutating requests.
* Zod validation on every endpoint before controller logic runs.
* Rate limiting on all public endpoints.

### Reliability
* Razorpay webhooks must be idempotent — duplicate events must not create duplicate orders.
* Print job assignment must be atomic — a job cannot be assigned to two printers simultaneously.
* Refresh token rotation — old token invalidated on each use.

### Scalability
* Stateless API (except web sessions via Redis) — horizontally scalable.
* File storage on Cloudflare R2 — never local disk.
* DB connection pooling via DrizzleORM.

### Observability
* Request logging on all endpoints.
* Admin audit log for every admin action.
* Printer action log for every job update.
* Error tracking via Sentry or equivalent.

---

## 10. Technical Constraints

| Constraint | Detail |
| :--- | :--- |
| **Runtime** | Bun (not Node.js) |
| **Language** | TypeScript throughout |
| **ORM / DB** | DrizzleORM + PostgreSQL (prod) / SQLite (dev) |
| **Session Store** | Redis for web sessions |
| **Validation** | Zod — runs before every controller method |
| **Auth** | JWT via jose — three separate secrets (app / admin / printer) |
| **File Storage** | Cloudflare R2 — no direct SDK calls in controllers |
| **Email** | Resend |
| **Push** | Firebase Cloud Messaging (FCM) |
| **Payment** | Razorpay |
| **Proxy** | Nginx — reverse proxy + IP whitelist for `/admin/` and `/printer/` |

### Hard rules:
1. No business logic in controllers — services only.
2. No direct DB calls outside the models/services layer.
3. No shared JWT secrets across namespaces.
4. All file operations through `UploadService`.
5. Zod validation must run before every controller method.
6. Printer API never returns customer name or full address — order ID + area only.

---

## 11. Milestones

| Phase | Scope |
| :---: | :--- |
| **1** | Core framework — Bun server, Router, Middleware chain, DB |
| **2** | Models — User, Product, Order, Cart, PrintJob, etc. |
| **3** | Shared services — Auth, Order, Cart, Payment, Print, Upload, Notification |
| **4** | `/v1/web` namespace — full customer web API |
| **5** | `/v1/app` namespace — full mobile app API |
| **6** | `/admin` namespace — full admin dashboard API |
| **7** | `/printer` namespace — full printer portal API |
| **8** | Frontend — `printeve.in` (customer web) |
| **9** | Frontend — `admin.printeve.in` |
| **10** | Frontend — `printer.printeve.in` |
| **11** | Mobile app — iOS + Android |
| **12** | QA, load testing, security audit |
| **13** | Nginx, SSL, Redis, production deployment |
| **14** | Soft launch — 3 onboarded printer vendors |
