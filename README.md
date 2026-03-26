# Real-Time Hospital Bed Availability Tracker

A full-stack cloud-ready implementation based on your abstract.

## Tech Stack
- Frontend: React + Vite
- Backend: Spring Boot 3 (Java 17), Spring Security (JWT), Spring Data JPA
- Database: MySQL (local Docker or Aiven Cloud MySQL)

## Features Implemented
- JWT authentication (`/api/auth/register`, `/api/auth/login`)
- Role-based access:
  - `ROLE_ADMIN`: update bed availability
  - `ROLE_USER`: view bed availability
- Bed tracking by ward (`ICU`, `GENERAL`, `EMERGENCY`)
- Real-time-style updates in UI using auto-refresh every 5 seconds
- Filter by ward
- Seed users and sample hospital data on first run

## Project Structure
- `backend` Spring Boot REST API
- `frontend` React UI
- `docker-compose.yml` Local MySQL

## 1. Run MySQL Locally

```bash
docker compose up -d
```

## 2. Run Backend

### Configure env vars
Copy values from `backend/.env.example` into your environment.

For local MySQL defaults, no env var is required because defaults are already in `application.yml`.
If Docker is unavailable, run any local MySQL server and keep host, port, user, and password aligned with the defaults or set env vars.

### Start backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

Default seeded users:
- Admin: `admin@hospital.com` / `Admin@123`
- User: `user@hospital.com` / `User@123`

## 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## 4. Use Aiven MySQL Cloud

Set these backend env vars before running Spring Boot:
- `DB_URL=jdbc:mysql://<aiven-host>:<port>/<db>?sslMode=REQUIRED`
- `DB_USER=<aiven-username>`
- `DB_PASSWORD=<aiven-password>`
- `JWT_SECRET=<long-random-secret>`
- `CORS_ALLOWED_ORIGINS=<frontend-url>`

If your Aiven plan requires certificates, include them using MySQL connector SSL properties.

## Main API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/beds?ward=ICU|GENERAL|EMERGENCY`
- `POST /api/beds` (admin only)

## Notes
- This starter uses polling (5s interval) for near-real-time visibility.
- You can upgrade to WebSocket/SSE for push-based updates later.
