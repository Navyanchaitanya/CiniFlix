# CiniFlix - Deployment Guide

This guide will walk you through deploying CiniFlix to Render with a PostgreSQL database.

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Render account (free at render.com)

## Step 1: Prepare Local Setup

### 1.1 Update Environment Variables

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ciniflix"
NEXTAUTH_SECRET="change-me-to-a-secure-random-key"
NEXTAUTH_URL="http://localhost:3000"
```

To generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 1.2 Install Dependencies

```bash
npm install
```

### 1.3 Set Up Local Database (Optional - for testing)

```bash
# Generate Prisma client
npx prisma generate

# Create and seed database
npx prisma migrate dev --name init
npm run prisma:seed
```

### 1.4 Test Local Development

```bash
npm run dev
```

Visit http://localhost:3000 and test the app.

## Step 2: Push to GitHub

### 2.1 Create a New GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ciniflix` (lowercase, no spaces)
3. Description: "Netflix Clone with React, Node.js, and PostgreSQL"
4. Make it **Public**
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### 2.2 Push Code to GitHub

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Full Netflix clone with authentication and watchlist"

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/ciniflix.git

# Rename to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

After pushing, verify at: https://github.com/YOUR-USERNAME/ciniflix

## Step 3: Set Up Render Services

### 3.1 Create PostgreSQL Database on Render

1. Go to [render.com](https://render.com)
2. Sign up or login
3. Click "New +"
4. Select "PostgreSQL"
5. Configure:
   - **Name:** `ciniflix-db`
   - **Database:** `ciniflix`
   - **User:** `postgres`
   - **Region:** Choose closest to you
   - **Plan:** Free tier (if available)
6. Click "Create Database"
7. Wait for it to initializes (2-3 minutes)
8. **Copy the connection string** - you'll need it!

### 3.2 Create Web Service on Render

1. Go to [render.com](https://render.com) dashboard
2. Click "New +"
3. Select "Web Service"
4. Click "Connect" next to your GitHub account
5. Select your `ciniflix` repository
6. Configure:
   - **Name:** `ciniflix` (or any unique name)
   - **Region:** Same as database (for performance)
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build && npx prisma migrate deploy && npm run prisma:seed`
   - **Start Command:** `npm start`
   - **Plan:** Free tier

7. Click "Create Web Service"

### 3.3 Add Environment Variables to Render

In the Web Service dashboard:

1. Go to **Environment**
2. Click "Add Environment Variable"
3. Add these variables:

```
DATABASE_URL=postgresql://postgres:PASTE_YOUR_DB_PASSWORD@dpg-XXXXX.render.internal/ciniflix
NEXTAUTH_SECRET=paste-your-generated-secret-key
NEXTAUTH_URL=https://your-app-name.onrender.com
```

**Important:** Don't use `localhost` for DATABASE_URL on Render!

4. When adding DATABASE_URL:
   - Go back to your PostgreSQL service page
   - Copy the **Internal Database URL** (not external)
   - Paste it as DATABASE_URL

5. Click "Save Changes"

### 3.4 Wait for Deployment

The deployment will start automatically. Check the **Logs** tab to see progress.

Expected sequence:
```
Building...
Running build command: npm install && npm run build...
Running prisma migrate...
Running prisma seed...
Starting service...
```

If you see errors, check:
- DATABASE_URL format is correct
- All environment variables are set
- Build logs for specific error messages

## Step 4: Test Your Deployment

1. Wait for "Your service is live" message
2. Click the URL or visit: `https://your-app-name.onrender.com`
3. Test functionality:
   - [ ] Home page loads with movie list
   - [ ] Sign up works
   - [ ] Login works
   - [ ] Can add movies to watchlist
   - [ ] Can write reviews
   - [ ] Browse and search works

## Step 5: Connect Custom Domain (Optional)

### Using Render's Free Domain

Your app gets a free domain like: `your-app-name.onrender.com`

### Using Your Own Domain

1. In Render dashboard, go to your Web Service
2. Click "Settings"
3. Scroll to "Custom Domains"
4. Add your domain (e.g., ciniflix.com)
5. Render will provide DNS records to add to your domain provider

## Troubleshooting

### Database Connection Errors

```
Error: getaddrinfo ENOTFOUND dpg-xxxxx.render.internal
```

**Solution:**
- Make sure DATABASE_URL uses **Internal URL** (ends with `.internal`)
- Not external URL (ends with `.onrender.com`)
- Check DATABASE_URL is copied exactly

### Build Fails

```
Error: prisma migrate deploy
```

**Solution:**
- Run locally first: `npx prisma migrate dev`
- Commit the migrations folder
- Push to GitHub again

### Service Returns 500 Error

1. Check Logs in Render dashboard
2. Verify all environment variables are set
3. Check DATABASE_URL format
4. Look for any error messages in logs

### Stuck on "Building"

1. Wait up to 10 minutes
2. If still building, click "Cancel Deployment"
3. Click "Manual Deploy" -> "Deploy latest commit"

## Environment Variables Reference

| Variable | Value Example | Purpose |
|----------|--------------|---------|
| `DATABASE_URL` | `postgresql://user:pwd@host/db` | PostgreSQL connection |
| `NEXTAUTH_SECRET` | Random 32-char string | Session encryption key |
| `NEXTAUTH_URL` | `https://app.onrender.com` | App URL for OAuth callbacks |
| `GITHUB_ID` | (if using GitHub OAuth) | GitHub OAuth app ID |
| `GITHUB_SECRET` | (if using GitHub OAuth) | GitHub OAuth secret |

## Monitoring Your App

In Render dashboard:

1. **Logs** - Real-time application logs
2. **Metrics** - CPU, RAM, connections
3. **Events** - Deployment history
4. **Settings** - Change environment variables

## Useful Commands for Future Updates

Push app updates:
```bash
git add .
git commit -m "Updated feature description"
git push origin main
```

The app will automatically redeploy on Render!

Update database schema:
```bash
# Create migration
npx prisma migrate dev --name feature_description

# Push to GitHub
git push origin main
```

## Connect to Remote Database Locally

For development with production database:

```bash
# Add Render DATABASE_URL to .env.local temporarily
# Note: Use EXTERNAL URL for local connections
DATABASE_URL="postgresql://user:pwd@dpg-xxxxx.onrender.com/db_name"

# Run migrations locally
npx prisma migrate dev

# Don't commit .env.local!
```

## Support

For Render-specific issues:
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)

For Next.js issues:
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

---

**Your CiniFlix app is now live and accessible online!** 🎉
