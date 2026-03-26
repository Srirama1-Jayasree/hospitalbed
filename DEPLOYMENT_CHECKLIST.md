# Pre-Deployment Checklist

## Backend (Render)

- [ ] pom.xml configured with fat JAR build (finalName: tracker)
- [ ] Procfile created with Maven startup command
- [ ] render.yaml created with deployment config
- [ ] .env.production created with Aiven credentials
- [ ] application.yml has SERVER_PORT env variable
- [ ] CORS_ALLOWED_ORIGINS accepts environment variable
- [ ] Code pushed to GitHub repository
- [ ] All secrets are in Render dashboard, NOT in code

## Frontend (Vercel)

- [ ] vercel.json created with build config
- [ ] .env.production has correct backend URL
- [ ] .env.local has local backend URL (optional)
- [ ] package.json has correct build script
- [ ] Code pushed to GitHub repository
- [ ] Vite is configured as framework

## Aiven MySQL

- [ ] Database created and accessible
- [ ] SSL mode enabled on connection string
- [ ] Credentials copied safely to Render env vars
- [ ] IP whitelist allows cloud provider IPs (or open access)

## Accounts & Access

- [ ] GitHub account with repositories set up
- [ ] Render account created and git connected
- [ ] Vercel account created and git connected
- [ ] Aiven console access confirmed

## Post-Deployment

- [ ] Backend Render URL noted
- [ ] Frontend Vercel URL noted
- [ ] CORS_ALLOWED_ORIGINS updated on Render with Vercel URL
- [ ] Login test successful on production
- [ ] Bed status visible from production frontend
