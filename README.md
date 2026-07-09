# Efly - Online Travel Agency (OTA)

A full-stack travel agency platform built with **Next.js 16** (App Router), offering flight booking, holiday packages, visa processing, Umrah packages, and a full admin CMS.

---

## Tech Stack

| Category | Libraries |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI** | React 19, TypeScript 5, Tailwind CSS 3, Sass |
| **Database** | MongoDB + Mongoose 8 |
| **Auth** | JWT (jsonwebtoken + bcryptjs) |
| **State / Fetching** | React Context, SWR, Axios |
| **Forms** | react-select, react-dropzone, react-day-picker |
| **Rich Text** | Jodit Editor |
| **Media** | Cloudinary |
| **Email / SMS** | Nodemailer, SMSQ Global API |
| **Analytics** | Google Analytics (G-0WL6ZE3TYJ) |
| **Scheduling** | node-cron (DB backups) |
| **Testing** | Jest + Testing Library |
| **Linting** | ESLint + Prettier |

---

## Prerequisites

- **Node.js** 18+
- **Yarn** (recommended package manager)
- **MongoDB** instance (local or Atlas)

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd efly
yarn install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in the required variables:

```env
MONGODB_URI=mongodb://localhost:27017/efly
JWT_SECRET=your-secret-key

NEXT_PUBLIC_API_URL=https://efly.gausalmunir.site/backend/api/v1
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMS_API_KEY=
SMS_CLIENT_ID=
SMS_SENDER_ID=
```

If running only the frontend standalone, `MONGODB_URI` and `JWT_SECRET` are the minimum required.

### 3. Start Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app. The dev server uses **Turbopack** for fast HMR.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev --turbopack` | Start dev server with Turbopack |
| `build` | `next build` | Build for production |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `lint:fix` | `next lint --fix` | ESLint with auto-fix |
| `format` | `prettier --write "src/**/*.{js,jsx,ts,tsx}"` | Format source files |
| `test` | `jest` | Run tests |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Public pages (home, flights, visa, umrah, blog, etc.)
│   ├── admin/              # Admin dashboard (CRUD for all entities)
│   ├── api/                # API route handlers (auth, blog, holiday, visa, etc.)
│   └── layout.tsx          # Root layout
├── components/
│   ├── common/             # Shared UI (Modal, Table, Toast, Calendar, etc.)
│   ├── form/               # Form components (Input, Select, Editor, etc.)
│   ├── layouts/            # Layout components (Navbar, Footer, Sidebar, etc.)
│   └── pages/              # Page-specific components
├── configs/                # App config (Axios, constants, DB connection)
├── contexts/               # React contexts (Toast)
├── data/                   # Static/dummy data
├── hooks/                  # Custom hooks
├── libs/                   # Utilities (cron jobs)
├── middleware.ts           # Auth & role-based routing
├── models/                 # Mongoose models (User, Blog, Holiday, Visa, etc.)
├── services/               # Service layer (API calls)
├── styles/                 # Global SCSS
├── types/                  # TypeScript type definitions
└── utils/                  # Utilities (auth, email, SMS, Cloudinary, etc.)
```

---

## Features

### Public Site
- Flight search & booking
- Holiday & tour packages
- Visa services (e-Visa, tourist visa)
- Umrah pilgrimage packages
- Blog with articles
- Photo gallery
- Events listing
- FAQ, Contact form
- User dashboard (my bookings, wishlist, deposit, support)

### Admin Dashboard
- Role-based access (Admin, Editor, User)
- Dashboard with charts & analytics
- Blog CRUD with rich text editor
- Holiday / Umrah / Visa package management
- Order & customer management
- Category management
- Gallery & events management
- CMS customization (home slides, blog slides, about, contact, FAQ)
- Invoice management
- Settings

### Technical
- JWT authentication with OTP verification
- Role-based middleware route protection
- Image upload to Cloudinary
- SMS notifications via SMSQ Global
- Email notifications via Nodemailer
- Google Analytics integration
- Dark mode (class strategy)
- Responsive design (Tailwind + Swiper carousels)
- SEO (sitemap, robots.txt, metadata)
- Automated DB backup via cron

---

## Deployment

The project deploys to a **VPS** via **GitHub Actions**. Pushing to `main` triggers the workflow (`.github/workflows/deploy.yml`) which:

1. Pulls latest code on the server
2. Installs dependencies with `yarn`
3. Builds the production bundle with `next build`
4. Restarts the PM2 process

**PM2** is used to manage the running Node.js process on the VPS.

---

## Testing

```bash
yarn test
```

Tests use **Jest** with `@testing-library/react` and a `jsdom` environment.

---

## Linting & Formatting

```bash
yarn lint          # Check for lint errors
yarn lint:fix      # Auto-fix lint errors
yarn format        # Format code with Prettier
```
