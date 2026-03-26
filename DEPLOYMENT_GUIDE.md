# Deployment Guide: Vercel Frontend + Render Backend

Complete step-by-step instructions for deploying the Hospital Bed Availability Tracker to production.

---

## Prerequisites

1. GitHub account with the project pushed
2. Vercel account (free tier available)
3. Render account (free tier available)
4. Aiven MySQL database credentials (already configured in `.env`)

---

## Part 1: Deploy Backend to Render

### Step 1: Push backend code to GitHub

```bash
cd backend
git init
git add .
git commit -m "Backend for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hospital-tracker-backend.git
git push -u origin main
```

### Step 2: Create a Render Web Service

1. Go to https://render.com and sign in
2. Click **New +** → **Web Service**
3. Select **Build and deploy from a Git repository**
4. Connect your GitHub account and select the `hospital-tracker-backend` repository
5. Fill in the service details:
   - **Name**: `hospital-bed-tracker-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Runtime**: Leave as default (Render auto-detects Java)
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/tracker-1.0.0.jar`
6. Scroll down to **Environment** section and add these variables:

| Key | Value |
|-----|-------|
| `DB_URL` | `jdbc:mysql://YOUR_AIVEN_HOST:YOUR_AIVEN_PORT/YOUR_DB?sslMode=REQUIRED` |
| `DB_USER` | `YOUR_AIVEN_USER` |
| `DB_PASSWORD` | `YOUR_AIVEN_PASSWORD` |
| `JWT_SECRET` | Generate a random 32+ char string (e.g., use `openssl rand -base64 32`) |
| `CORS_ALLOWED_ORIGINS` | Leave blank for now, update after frontend URL is available |
| `SERVER_PORT` | `8080` |

7. Click **Create Web Service**
8. Wait for the build to complete (~3-5 minutes)
9. Note the deployed URL (e.g., `https://hospital-bed-tracker-api.onrender.com`)

### Step 3: Update CORS for frontend

After deploying frontend (see Part 2), return here and update `CORS_ALLOWED_ORIGINS` env var on Render to include your Vercel frontend URL:
```
https://your-vercel-app.vercel.app
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Push frontend code to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Frontend for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hospital-tracker-frontend.git
git push -u origin main
```

### Step 2: Create a Vercel Project

1. Go to https://vercel.com and sign in
2. Click **Add New...** → **Project**
3. Select **Import Git Repository**
4. Paste your frontend repository URL and click **Continue**
5. Fill in project settings:
   - **Project Name**: `hospital-bed-tracker`
   - **Framework Preset**: Select **Vite**
6. Scroll to **Environment Variables** section and add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://hospital-bed-tracker-api.onrender.com` (use your Render backend URL) |

7. Click **Deploy**
8. Wait for deployment to complete (~2-3 minutes)
9. Your frontend is live at the provided Vercel URL

### Step 3: Update backend CORS

Once Vercel deployment completes, you'll get a URL like `https://hospital-tracker-xyz.vercel.app`.

Go back to Render dashboard → `hospital-bed-tracker-api` → **Environment** → Edit `CORS_ALLOWED_ORIGINS`:
```
https://hospital-tracker-xyz.vercel.app
```

---

## Testing Deployment

1. Open your Vercel frontend URL in browser
2. Log in with:
   - Admin: `admin@hospital.com` / `Admin@123`
   - User: `user@hospital.com` / `User@123`
3. Verify you can view bed status and (if admin) update beds
4. Check browser console for any CORS errors

---

## Environment Variables Summary

### Backend (Render)

```yaml
DB_URL: jdbc:mysql://HOST:PORT/DB?sslMode=REQUIRED
DB_USER: Aiven username
DB_PASSWORD: Aiven password
JWT_SECRET: 32+ character random string
SERVER_PORT: 8080
CORS_ALLOWED_ORIGINS: Your Vercel frontend URL
```

### Frontend (Vercel)

```yaml
VITE_API_BASE_URL: Your Render backend URL
```

---

## Monitoring & Troubleshooting

### View backend logs on Render
1. Go to Render dashboard
2. Click `hospital-bed-tracker-api`
3. Click **Logs** tab

### View frontend logs on Vercel
1. Go to Vercel dashboard
2. Click your project
3. Click **Deployments** tab and select latest deployment

### Common Issues

**CORS errors in browser console:**
- Ensure `CORS_ALLOWED_ORIGINS` on backend matches your Vercel frontend domain exactly (include `https://`)

**Backend connection timeout:**
- Check `DB_URL` is correct and Aiven account allows this IP
- Verify `sslMode=REQUIRED` in connection string

**Build fails on Render:**
- Ensure pom.xml is in backend root directory
- Check Java version is 17+ in build logs

---

## Local Development After Deployment

To run locally while backend is on Render:

**Frontend:**
```bash
export VITE_API_BASE_URL=https://hospital-bed-tracker-api.onrender.com
npm run dev
```

**Backend (local fallback):**
```bash
export JAVA_HOME=/path/to/java17
export DB_URL=jdbc:mysql://localhost:3306/hospital_tracker?...
mvn spring-boot:run
```

---

## Next Steps

1. Consider enabling Render's auto-deployment on git push
2. Set up a custom domain for production (both Vercel and Render support this)
3. Add SSL monitoring and health checks
4. Back up your Aiven MySQL regularly
5. Rotate JWT_SECRET periodically and redeploy
