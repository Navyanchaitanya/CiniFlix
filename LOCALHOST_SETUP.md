# 🚀 CiniFlix - Localhost Setup Guide

Complete setup instructions to run CiniFlix on your machine and prepare for Render deployment.

## Prerequisites

- Node.js 20+ (Download from https://nodejs.org/)
- npm 10+ (comes with Node.js)
- Git (Download from https://git-scm.com/)
- Code Editor (VS Code recommended)

---

## ✅ Step 1: Clone/Open the Project

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix
```

---

## 📦 Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages (React, Next.js, Prisma, NextAuth, Tailwind CSS, etc.)

---

## 🗄️ Step 3: Set Up Database (Choose ONE Option)

### Option A: **SQLite (Recommended for Local Testing - NO Installation Needed)**

```bash
# 1. Update .env.local to use SQLite (it's already configured by default)
# DATABASE_URL="file:./dev.db"

# 2. Generate Prisma Client
npx prisma generate

# 3. Create database and tables
npx prisma migrate dev --name init

# 4. Seed with sample movies
npm run prisma:seed

# ✅ Done! Database is ready
```

### Option B: Local PostgreSQL (If You Have It Installed)

```bash
# 1. Make sure PostgreSQL is running
# 2. Create database: createdb ciniflix
# 3. Update .env.local:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/ciniflix"

# 4. Generate Prisma Client
npx prisma generate

# 5. Create tables
npx prisma migrate dev --name init

# 6. Seed database
npm run prisma:seed

# ✅ Database ready
```

### Option C: Test on Render PostgreSQL (Advanced)

```bash
# 1. Create database on Render.com
# 2. Copy connection string
# 3. Update .env.local:
# DATABASE_URL="postgresql://user:password@render-host:5432/ciniflix"

# 4. Run setup
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

---

## 🎯 Step 4: Start Development Server

### Quick Start (Recommended)
```bash
npm run dev
```

### With Full Setup
```bash
npm run setup
```
This runs: install → database setup → seed → dev server

---

## 🌐 Step 5: Open in Browser

Visit: **http://localhost:3000**

You should see the CiniFlix homepage! 🎬

---

## ✨ What to Test

### 🎨 UI Testing (Works Without Database)
- [x] Homepage loads
- [x] Header with navigation
- [x] Featured movie section
- [x] Responsive design
- [x] Sign In / Sign Up buttons visible

### 🔐 With Database - Test Features
```
Login Credentials (after seed):
Email: demo@example.com
Password: demo123456
```

- [ ] Sign Up - Create new account
- [ ] Sign In - Login with email/password
- [ ] Browse - See movies list
- [ ] Search - Find movies by title
- [ ] Filter - By genre
- [ ] Movie Detail - Click on a movie
- [ ] Watchlist - Add/remove movies
- [ ] Reviews - Read and write reviews
- [ ] Responsive - Test on mobile view

---

## 🛠️ Useful Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production build locally
npm start

# View database (Prisma Studio)
npm run studio

# Run database migrations
npm run prisma:migrate

# Seed database again
npm run prisma:seed

# Reset database (WARNING: deletes all data)
npm run db:reset

# Lint code
npm run lint
```

---

## 🗄️ Prisma Studio (Database Manager)

View and edit your database visually:

```bash
npm run studio
```

Opens: **http://localhost:5555**

---

## 📱 Testing on Different Ports

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

Visit: http://localhost:3001

---

## 🔍 Debugging

### Check if server is running
```bash
curl http://localhost:3000
```

### View database
```bash
npm run studio
```

### Check for errors
- Look at terminal output
- Check browser console (F12)
- Check Network tab

### Reset Everything
```bash
npm run db:reset
npm run prisma:seed
npm run dev
```

---

## 🚨 Common Issues & Solutions

### ❌ Error: "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### ❌ Error: "Database connection failed" (with PostgreSQL)
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Try SQLite instead for testing: `DATABASE_URL="file:./dev.db"`

### ❌ Error: "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### ❌ Pages show blank or "Cannot GET"
- Wait for build to complete (check terminal)
- Hard refresh browser (Ctrl+Shift+R)
- Check terminal for errors

### ❌ Database empty / no movies showing
```bash
npm run db:reset
npm run prisma:seed
```

### ❌ Changes not showing up
- Save your code file (Ctrl+S)
- Next.js will auto-reload
- If not, restart: Ctrl+C then `npm run dev`

---

## 📊 Project Structure

```
ciniflix/
├── src/
│   ├── app/
│   │   ├── api/          # Backend API routes
│   │   ├── login/        # Login page
│   │   ├── signup/       # Sign up page
│   │   ├── browse/       # Browse movies
│   │   ├── movie/[id]/   # Movie detail page
│   │   ├── watchlist/    # Watchlist page
│   │   ├── layout.js     # Root layout
│   │   ├── page.js       # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   └── lib/             # Utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.js          # Sample data
├── public/              # Static files
├── .env.local           # Environment variables
└── package.json         # Dependencies

```

---

## 🔐 Environment Variables Explained

### .env.local (Development)
```
DATABASE_URL        # Database connection string
NEXTAUTH_SECRET     # Authentication secret (random string)
NEXTAUTH_URL        # Your app URL (http://localhost:3000)
NODE_ENV            # "development" for local testing
```

### .env.production (Render)
- Same variables but with Render URLs and secrets
- Never commit .env files with real secrets

---

## ✅ Before Deploying to Render

Make sure locally:
- [x] `npm run dev` starts without errors
- [x] Homepage loads at http://localhost:3000
- [x] Database is seeded with movies
- [x] Login/signup/browse features work
- [x] No console errors (F12)
- [x] Code is committed to GitHub

---

## 🚀 Next: Deploy to Render

Once everything works locally:

1. Push code to GitHub:
```bash
git add -A
git commit -m "Ready for Render deployment"
git push -u origin master
```

2. Follow [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md) for Render deployment

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 💡 Tips for Smooth Development

- Always run `npm install` after pulling code changes
- Keep `.env.local` out of git (it's in .gitignore)
- Use Prisma Studio to visualize database
- Check terminal output for helpful error messages
- Test on mobile with Chrome DevTools (F12)

---

## 🎉 You're All Set!

1. Run `npm run dev`
2. Visit http://localhost:3000
3. Enjoy your Netflix clone! 🎬

**Happy coding!** 🚀

For issues or questions, check the [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)
