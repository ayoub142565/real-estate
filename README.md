# EstatePro Frontend (React + Tailwind)

EstatePro is a modern, responsive real estate frontend for property listings (buy, sell, rent).

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- React Helmet Async
- LocalStorage-based demo data/auth/favorites/admin state
- Google Maps Embed support

## Features

- Home page with hero, featured listings, categories, latest listings, testimonials, CTA, footer
- Property listing page with advanced filtering, sorting, and pagination
- Property details page with gallery, amenities, map, contact agent form, similar properties
- Favorites page
- Login/Register + protected routes
- Contact page with map/company details
- Admin dashboard to add/delete listings, mark featured, inspect users/inquiries totals
- Mobile-first responsive design with reusable components and skeleton loading

## Frontend-Only Data Layer

This build intentionally contains **no backend**.
All data is handled client-side through `localStorage` using services in:

- `client/src/services/store.js`
- `client/src/data/properties.js`

It includes seeded demo data and a default admin account:

- Email: `admin@estatepro.com`
- Password: `Admin123!`

## Run Locally

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Environment Variables

- `VITE_GOOGLE_MAPS_API_KEY` (optional)

If omitted, the app falls back to standard Google Maps embed URLs.
