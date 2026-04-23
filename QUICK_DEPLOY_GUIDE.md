# CiniFlix - Complete Setup & Deployment Guide

## 🎉 Status: Ready for Final Deployment!

Your complete Netflix clone has been created with:
- ✅ Full React.js (Next.js) Frontend
- ✅ Node.js Backend with API routes
- ✅ PostgreSQL database schema (Prisma)
- ✅ User authentication (NextAuth.js)
- ✅ Movie browsing, searching, filtering
- ✅ Watchlist management
- ✅ Reviews & ratings system
- ✅ Tailwind CSS styling

---

## 📝 STEP 1: Push Code to GitHub

### Option A: GitHub Web UI (Easiest)
1. Visit: https://github.com/new
2. Create new repository named: **ciniflix**
3. Choose "Public" or "Private"
4. Do NOT initialize with README (we have one)
5. Click "Create repository"

### Option B: Command Line with Authentication

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix

# If git push prompts for password:
# - Windows: Enter your GitHub password or use Personal Access Token
# - macOS/Linux: Use SSH key or Personal Access Token

git push -u origin master
```

### 🔑 Generate GitHub Personal Access Token
If you need a token instead of password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: `ciniflix-deploy`
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. Copy the token
7. When git asks for password, paste the token

---

## 🗄️ STEP 2: Deploy Database on Render

### Create PostgreSQL Database

1. Go to: **https://dashboard.render.com**
2. Click **New +** → **PostgreSQL**
3. Fill in:
   - **Name**: `ciniflix-db`
   - **Database Name**: `ciniflix`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15
4. Click **Create Database**
5. ⏳ Wait 2-3 minutes for creation
6. **Copy the Internal Connection String** (starts with `postgresql://`)
   - Format: `postgresql://user:password@dpg-xxx.us-east-1.render.com:5432/dbname`

---

## 🚀 STEP 3: Deploy Web Service on Render

### Create Web Service

1. Go to: **https://dashboard.render.com**
2. Click **New +** → **Web Service**
3. Choose **Connect to GitHub** (if not connected, authorize Render)
4. Select repository: **ciniflix**
5. Fill in:
   - **Name**: `ciniflix`
   - **Environment**: `Node`
   - **Region**: Same region as database
   - **Branch**: `master`
   - **Build Command**: Copy below exactly:

```bash
npm install && npx prisma generate && npx prisma migrate deploy --skip-generate && npm run build
```

   - **Start Command**: `npm start`

6. Scroll to **Advanced** section
7. Add **Environment Variables** (click **Add Environment Variable** for each):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste from Step 2 PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://ciniflix-abc123.onrender.com` (will update after deploy) |
| `NODE_ENV` | `production` |

8. Click **Create Web Service**
9. ⏳ Wait for build to complete (5-10 minutes)

### Generate NEXTAUTH_SECRET

Open terminal and run:
```bash
openssl rand -base64 32
```

Copy the output to the `NEXTAUTH_SECRET` environment variable.

---

## 🌐 STEP 4: Update Variables After Deploy

After your app is deployed:

1. Get your final Render URL from the deployment (looks like: `https://ciniflix-abc123.onrender.com`)
2. Go back to **Environment** tab in Render
3. Update `NEXTAUTH_URL` to your actual URL
4. Click **Save Changes** (redeploy will happen)

---

## 5️⃣ STEP 5: Initialize Database & Seed Data

After successful deployment:

1. In Render dashboard, click your **Web Service**
2. Go to **Shell** tab
3. Run these commands:

```bash
# Run database migrations
npx prisma migrate deploy --skip-generate

# Seed with sample movies
npm run prisma:seed
```

4. You should see "Seeded database with X movies"

---

## 🧪 STEP 6: Test Your App

1. Visit: `https://ciniflix-abc123.onrender.com`
2. You should see the homepage with featured movie
3. **Test Registration**: Click "Sign Up"
   - Email: `test@example.com`
   - Password: `password123`
4. **Test Login**: Sign in with created account
5. **Test Features**:
   - Browse movies (scroll down "Trending Now")
   - Add movies to watchlist (heart icon)
   - Visit movie detail page
   - Go to "My List" to see watchlist

---

## 🐛 Troubleshooting

### Build Failed Error: Prisma
**Problem**: "Cannot find module '.prisma/client'"
**Solution**: 
- Ensure `DATABASE_URL` is set BEFORE deployment
- Check database connection string is correct
- Run in Render Shell: `npx prisma generate && npx prisma migrate deploy --skip-generate`

### App Shows 500 Error
**Solution**:
1. Check Render **Logs** tab for error details
2. Verify database is running
3. Run migrations in Shell: `npx prisma migrate deploy --skip-generate`
4. Check environment variables are set

### Can't Connect to Database
**Solution**:
1. Get fresh connection string from Render PostgreSQL dashboard
2. Test connection format: `postgresql://user:password@host:5432/dbname`
3. Copy entire string including database name
4. Verify no spaces in the string

### Pages Showing "Cannot GET"
**Solution**:
1. Wait for first deploy to fully complete
2. Sometimes takes 1-2 minutes for full startup
3. Refresh the page after a minute

---

## 📱 Project Structure

```
ciniflix/
├── src/app/
│   ├── api/                 # Backend API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── movies/         # Movie data endpoints
│   │   ├── watchlist/      # Watchlist management
│   │   └── reviews/        # Movie reviews
│   ├── login/              # Login page (public)
│   ├── signup/             # Sign up page (public)
│   ├── browse/             # Browse movies (protected)
│   ├── watchlist/          # My List page (protected)
│   ├── movie/[id]/         # Movie detail (protected)
│   └── page.js             # Home page
├── src/components/         # Reusable React components
├── src/lib/               # Utility functions
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.js            # Sample data
└── public/                # Static files
```

---

## 🔗 Useful Links

- **Your GitHub**: https://github.com/Navyanchaitanya
- **Your Repository**: https://github.com/Navyanchaitanya/ciniflix
- **Render Dashboard**: https://dashboard.render.com
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org

---

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub (https://github.com/Navyanchaitanya/ciniflix)
- [ ] PostgreSQL database created on Render
- [ ] Web Service created on Render
- [ ] All environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `NEXTAUTH_URL` (updated with actual URL)
  - [ ] `NODE_ENV=production`
- [ ] Build completed successfully
- [ ] Database migrations run
- [ ] Sample movies seeded
- [ ] Homepage loads at your Render URL
- [ ] Login/Signup works
- [ ] Can browse movies
- [ ] Watchlist functionality works

---

## 🎓 What You Can Learn Next

- Add social login (Google, GitHub OAuth)
- Implement payment system
- Add admin dashboard
- Create mobile app (React Native)
- Add recommendation system
- Deploy to other platforms (Vercel, AWS, Azure)
- Performance optimization and caching
- Real-time features with WebSockets

---

## ❓ Need Help?

1. Check Render **Logs** tab for detailed errors
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) in project
3. Check [Next.js Deployment docs](https://nextjs.org/docs/deployment)
4. Visit [Render Support](https://render.com/docs)

---

**Your Netflix clone is production-ready! 🎬**

Next: Push to GitHub → Deploy to Render → Celebrate! 🎉
