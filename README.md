# EstatePro - Full-Stack Real Estate Platform

EstatePro is a production-ready real estate website for buying, selling, and renting properties.
It includes a modern responsive React UI and a secure Node.js/Express API with MongoDB.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Maps:** Google Maps Embed/API key support
- **Image Upload:** Cloudinary

## Features

- Browse listings in responsive card/grid layouts
- Advanced filtering: price, status, type, beds/baths, keyword, sorting
- Property detail pages with gallery, map, amenities, similar listings
- Auth flow: register, login, logout, protected routes
- Save favorites per user
- Contact agent / inquiries workflow
- Admin dashboard:
  - Add and delete listings
  - Mark featured listings
  - Manage users and view inquiry totals
- Security hardening:
  - Helmet, CORS, rate limiting
  - Mongo sanitize, xss-clean, HPP
  - Input validation with Joi
  - Password hashing, JWT middleware
- Performance optimizations:
  - Query pagination
  - API response caching for listings
  - MongoDB indexes
  - Lazy loaded images and skeleton loading states
- SEO-ready metadata via `react-helmet-async`

## Project Structure

```
real-estate/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   └── router/
│   └── ...
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── seed/
│   └── ...
└── README.md
```

## Setup Instructions

### 1) Backend

```bash
cd server
cp .env.example .env
npm install
npm run seed   # optional sample data
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2) Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints (Core)

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/properties`
- `GET /api/properties/featured`
- `GET /api/properties/:id`
- `POST /api/properties` (admin)
- `PUT /api/properties/:id` (admin)
- `DELETE /api/properties/:id` (admin)
- `GET /api/users/favorites`
- `PATCH /api/users/favorites/:propertyId`
- `GET /api/users` (admin)
- `POST /api/inquiries`
- `GET /api/inquiries` (admin)

## Deployment Notes

- Configure all environment variables on your hosting provider.
- For production, serve frontend build via CDN or static host.
- Deploy API separately (Render/Railway/Fly/EC2/etc).
- Use managed MongoDB (Atlas), Cloudinary, and proper CORS origin.
