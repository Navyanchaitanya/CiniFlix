# 🎬 CiniFlix - Complete Setup & Deployment Guide

**Netflix Clone** | React.js | Node.js | PostgreSQL | Ready for Production

---

## 📋 Table of Contents

1. [Quick Start - Localhost](#-quick-start--localhost)
2. [Full Localhost Setup](#-full-localhost-setup)
3. [GitHub Push](#-github-push)
4. [Render Deployment](#-render-deployment)
5. [Troubleshooting](#-troubleshooting)

---

## ⚡ Quick Start - Localhost

Get the app running in **5 minutes**:

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix

# Install and run (choose ONE):
npm run setup           # Auto setup everything
# OR manually:
npm install && npm run dev
```

**Open browser:** http://localhost:3000 ✅

---

## 🏠 Full Localhost Setup

### 1️⃣ Prerequisites

- Node.js 20+ from https://nodejs.org/
- npm (comes with Node.js)
- Git from https://git-scm.com/

### 2️⃣ Environment Variables

Edit `.env.local` in project root:

```bash
# Option 1: SQLite (easiest - no installation)
DATABASE_URL="file:./dev.db"

# Option 2: If you have PostgreSQL installed:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/ciniflix"

# Option 3: Render PostgreSQL (for testing production):
# DATABASE_URL="postgresql://user:password@render-host:5432/ciniflix"

# These stay the same:
NEXTAUTH_SECRET="dev-secret-key-can-be-anything"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3️⃣ Install & Setup

```bash
# Navigate to project
cd d:\Resume_Certificates\CineFlix2\ciniflix

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create database & tables
npx prisma migrate dev --name init

# Add sample movies
npm run prisma:seed

# Start development server
npm run dev
```

**Browser:** http://localhost:3000

### 4️⃣ Test the Application

| Feature | Test |
|---------|------|
| Homepage | Loads at localhost:3000 ✅ |
| Featured Movie | Visible in header |
| Navigation | Header links work |
| Responsive | Try resizing browser |

### 5️⃣ Optional: Test With Login

```bash
# Use demo account (after seed runs):
Email: demo@example.com
Password: demo123456

# Or create your own via Sign Up
```

---

## 📤 GitHub Push

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `ciniflix` (must match exactly!)
3. Choose **Public** or **Private**
4. **IMPORTANT:** Do NOT initialize with README
5. Click **Create repository**

### Step 2: Push Code

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix

# If you get prompted for password:
# Use your GitHub password or Personal Access Token

git push -u origin master
```

✅ **Your code is now on GitHub!**

View at: https://github.com/Navyanchaitanya/ciniflix

---

## 🚀 Render Deployment

### Complete Deployment Steps

**READ:** [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md) for detailed instructions

**Quick Summary:**

1. **Create PostgreSQL Database on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "PostgreSQL"
   - Copy connection string

2. **Create Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect GitHub repository (ciniflix)
   - Set Build Command:
     ```
     npm install && npx prisma generate && npx prisma migrate deploy --skip-generate && npm run build
     ```
   - Set Start Command:
     ```
     npm start
     ```

3. **Add Environment Variables**
   ```
   DATABASE_URL = [from PostgreSQL creation]
   NEXTAUTH_SECRET = [run: openssl rand -base64 32]
   NEXTAUTH_URL = [your Render URL - e.g., https://ciniflix-abc123.onrender.com]
   NODE_ENV = production
   ```

4. **Deploy & Test**
   - Render auto-builds (5-10 minutes)
   - Visit your app URL
   - Refresh database: Run in Render Shell:
     ```
     npx prisma migrate deploy --skip-generate
     npm run prisma:seed
     ```

---

## 📁 Project Structure

```
ciniflix/
├── 📄 LOCALHOST_SETUP.md          ← Read for local setup
├── 📄 QUICK_DEPLOY_GUIDE.md       ← Read for Render setup
├── 📄 DEPLOYMENT.md               ← Technical details
├── 📄 render.yaml                 ← Render config
├── 📄 build.sh                    ← Build script
├── 📄 .env.local                  ← Local environment
├── 📄 .env.example                ← Environment template
├── 📄 .env.production.example     ← Production template
├── 📦 package.json                ← Dependencies
├── src/
│   ├── app/
│   │   ├── api/                   ← Backend API
│   │   ├── login/                 ← Login page
│   │   ├── signup/                ← Sign up page
│   │   ├── browse/                ← Movie browser
│   │   ├── movie/[id]/            ← Movie detail
│   │   ├── watchlist/             ← My List page
│   │   ├── page.js                ← Home page
│   │   └── layout.js              ← Root layout
│   ├── components/                ← React components
│   └── lib/                       ← Utilities
├── prisma/
│   ├── schema.prisma              ← Database schema
│   └── seed.js                    ← Sample data
└── README.md                      ← Project info
```

---

## 🎯 Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run setup` | Full setup (install + db + seed + dev) |
| `npm run prisma:migrate` | Create database migrations |
| `npm run prisma:seed` | Add sample movies |
| `npm run studio` | View/edit database |
| `npm run db:reset` | Reset database (DELETE ALL DATA!) |

---

## 🧪 Verification Checklist

### ✅ Localhost Testing
- [ ] `npm run dev` starts without errors
- [ ] App loads at http://localhost:3000
- [ ] Homepage displays featured movie
- [ ] Navigation header works
- [ ] Sign Up page accessible
- [ ] Login works (test with demo account)
- [ ] Movies display in grid
- [ ] Search/filter features work
- [ ] Watchlist adds/removes movies
- [ ] No console errors (F12)

### ✅ Before GitHub Push
- [ ] All tests pass locally
- [ ] Database migrations work
- [ ] Seed data loads correctly
- [ ] Login/logout works
- [ ] No uncommitted changes
- [ ] `.env.local` is in `.gitignore`

### ✅ Before Render Deployment
- [ ] Code pushed to GitHub
- [ ] PostgreSQL database created on Render
- [ ] All environment variables set
- [ ] Build command saves successfully
- [ ] Database migrations run in Shell
- [ ] App loads at provided URL

---

## 🔧 Environment Variables

### For Localhost (.env.local)
```env
DATABASE_URL="file:./dev.db"           # SQLite by default
NEXTAUTH_SECRET="dev-secret"           # Any string, used locally
NEXTAUTH_URL="http://localhost:3000"   # Local URL
NODE_ENV="development"
```

### For Render (Set in Dashboard)
```env
DATABASE_URL="postgresql://user:...@dpg-xxx.render.com:5432/ciniflix"  # From Render PostgreSQL
NEXTAUTH_SECRET="[openssl rand -base64 32]"  # Generate new secure value
NEXTAUTH_URL="https://ciniflix-abc123.onrender.com"  # Your Render URL
NODE_ENV="production"
```

**⚠️ NEVER** commit `.env.local` or `.env.production` with real secrets!

---

## 🐛 Common Issues & Solutions

### ❌ "Cannot find module @prisma/client"
```bash
npm install
npx prisma generate
```

### ❌ "Database connection failed"
- Check DATABASE_URL in .env.local
- For SQLite: Should be `file:./dev.db`
- For PostgreSQL: Check host/port/credentials
- Restart dev server after env changes

### ❌ Port 3000 already in use
```bash
npm run dev -- -p 3001
# Visit http://localhost:3001
```

### ❌ "No such table" error
```bash
npm run prisma:migrate  # Creates tables
npm run prisma:seed     # Adds sample data
```

### ❌ Build fails on Render
- Check DATABASE_URL is set correctly
- Verify PostgreSQL database exists
- Check logs: Render Dashboard → Logs
- Run migrations manually in Shell tab

### ❌ App shows 500 error on Render
- Check Render dashboard Logs tab
- Run: `npx prisma migrate deploy --skip-generate` in Shell
- Run: `npm run prisma:seed` in Shell
- Check all environment variables are set

---

## 📱 Testing on Different Devices

### Mobile (Chrome DevTools)
```
F12 → Click device icon → Select phone
```

### Tablet
```
F12 → Click device icon → iPad
```

### Responsive Test
```
Resize browser window to test all screen sizes
```

---

## 🔐 Security Notes

1. **Never commit .env files** with secrets (they're in .gitignore)
2. **Generate new NEXTAUTH_SECRET** for production:
   ```bash
   openssl rand -base64 32
   ```
3. **Use HTTPS URLs** in production (Render provides this)
4. **Never share PostgreSQL credentials** publicly
5. **Use strong passwords** for production databases

---

## 📞 Useful Links

| Resource | Link |
|----------|------|
| GitHub Repository | https://github.com/Navyanchaitanya/ciniflix |
| Render Dashboard | https://dashboard.render.com |
| Next.js Docs | https://nextjs.org/docs |
| Prisma Docs | https://www.prisma.io/docs |
| NextAuth.js | https://next-auth.js.org |

---

## 🆘 Detailed Help

- **Localhost Issues?** → Read [LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md)
- **Deployment Issues?** → Read [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)
- **Technical Details?** → Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- **General Info?** → Read [README.md](./README.md)

---

## 🎉 Next Steps

1. ✅ **Complete Localhost Setup**
   ```bash
   npm run setup
   ```

2. ✅ **Test the Application**
   - Visit http://localhost:3000
   - Test all features

3. ✅ **Push to GitHub**
   ```bash
   git push -u origin master
   ```

4. ✅ **Deploy to Render**
   - Follow [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)

5. ✅ **Share Your Project!**
   - Your URL: https://ciniflix-abc123.onrender.com
   - GitHub: https://github.com/Navyanchaitanya/ciniflix

---

## 💡 Pro Tips

- Use `npm run studio` to visually manage your database
- Check Render logs frequently during deployment
- Test locally before pushing to GitHub
- Use SQLite locally, PostgreSQL on Render
- Generate new secrets for each environment

---

**Built with ❤️ using React, Node.js, and PostgreSQL**

**Your Netflix clone is ready to amaze! 🎬✨**
