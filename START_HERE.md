# 🎬 CiniFlix - Netflix Clone

**Complete** | **Production-Ready** | **React + Node.js + PostgreSQL**

---

## 📖 START HERE

### 🚀 **First Time?**
👉 Read: [SETUP_AND_DEPLOY.md](./SETUP_AND_DEPLOY.md)

### 🏠 **Want to Run Locally?**
👉 Read: [LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md)

### ☁️ **Want to Deploy to Render?**
👉 Read: [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)

### 🔧 **Technical Details?**
👉 Read: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ⚡ Quick Start (2 Minutes)

```bash
cd d:\Resume_Certificates\CineFlix2\ciniflix
npm run setup
# Opens http://localhost:3000 automatically
```

---

## ✨ What's Included

✅ **Frontend**
- React 19 with Next.js 16
- JavaScript (not TypeScript)
- Tailwind CSS for styling
- Responsive design
- Movie browsing & search
- Watchlist management
- Reviews & ratings

✅ **Backend**
- Node.js API routes
- User authentication (NextAuth.js)
- Movie management endpoints
- Watchlist API
- Review system
- Database health checks

✅ **Database**
- Prisma ORM
- PostgreSQL (production)
- SQLite (local development)
- Full schema with migrations
- Sample seed data

✅ **Deployment**
- Render.yaml config
- Build scripts
- Environment templates
- Health check endpoint
- Post-deploy scripts

---

## 📊 Core Features

| Feature | Status | Details |
|---------|--------|---------|
| User Authentication | ✅ | Email/password + NextAuth |
| Movie Browsing | ✅ | Search, filter by genre, pagination |
| Watchlist | ✅ | Add/remove, track progress |
| Reviews | ✅ | Rate movies, write comments |
| Responsive Design | ✅ | Mobile, tablet, desktop |
| Admin Ready | ✅ | Prisma Studio for DB management |
| Production Deploy | ✅ | Ready for Render |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Next.js 16, Tailwind CSS 4 |
| Backend | Node.js, Express (Next.js routes) |
| Database | PostgreSQL, Prisma ORM, SQLite (local) |
| Auth | NextAuth.js with credentials |
| Deployment | Render, GitHub, Docker ready |
| Languages | JavaScript (ES6+) |

---

## 📁 Documentation Map

```
📄 SETUP_AND_DEPLOY.md       ← Master guide (START HERE)
📄 LOCALHOST_SETUP.md        ← Local development guide
📄 QUICK_DEPLOY_GUIDE.md     ← Render deployment (step-by-step)
📄 DEPLOYMENT.md             ← Technical deployment details
📄 README.md                 ← This file
📄 .env.example              ← Environment variables template
📄 .env.local                ← Local environment (already set up)
📄 render.yaml               ← Render configuration
📄 build.sh                  ← Build script for Render
```

---

## 🚀 Three-Step Deployment

### Step 1: Run Locally
```bash
npm run setup          # Install + setup + start
# Visit http://localhost:3000
```

### Step 2: Push to GitHub
```bash
git add -A
git commit -m "CiniFlix ready for deployment"
git push -u origin master
```

### Step 3: Deploy to Render
1. Create PostgreSQL database on Render
2. Create Web Service (connect GitHub)
3. Set environment variables
4. Deploy! 🚀

Detailed: [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)

---

## 🗄️ Database Schemas

### Users
- Email, password, name, profile picture
- Authentication via NextAuth

### Movies
- Title, description, poster, backdrop
- Rating, duration, director, cast
- Genre, language, year

### Watchlist
- User's saved movies
- Watch progress (0-100%)
- Completion status

### Reviews
- User ratings (1-10)
- Written comments
- Timestamps

---

## 📋 Environment Variables

### Development (.env.local)
```env
DATABASE_URL="file:./dev.db"          # SQLite for local
NEXTAUTH_SECRET="dev-key"             # Any string
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### Production (Render Dashboard)
```env
DATABASE_URL="postgresql://...@render.com/ciniflix"    # Render PostgreSQL
NEXTAUTH_SECRET="[generate with openssl rand -base64 32]"
NEXTAUTH_URL="https://your-app.onrender.com"
NODE_ENV="production"
```

---

## 🧪 Verification Checklist

Use this before deploying:

- [ ] `npm run dev` starts without errors
- [ ] App loads at http://localhost:3000
- [ ] Movies display in grid
- [ ] User registration works
- [ ] User login works
- [ ] Watchlist add/remove works
- [ ] Database seed creates 10+ movies
- [ ] No console errors (F12)
- [ ] Responsive design works
- [ ] Code pushed to GitHub
- [ ] Environment variables set in Render

---

## 🔥 Key Files

| File | Purpose |
|------|---------|
| `src/app/page.js` | Home page with featured movie |
| `src/app/login/page.js` | Login screen |
| `src/app/signup/page.js` | Registration screen |
| `src/app/browse/page.js` | Movie browsing page |
| `src/app/movie/[id]/page.js` | Movie detail page |
| `src/app/api/auth/[...nextauth]/route.js` | Authentication logic |
| `src/app/api/movies/route.js` | Movie endpoints |
| `src/app/api/watchlist/route.js` | Watchlist endpoints |
| `prisma/schema.prisma` | Database schema |
| `prisma/seed.js` | Sample data |

---

## 💡 Development Tips

1. **Use Prisma Studio** to view database:
   ```bash
   npm run studio
   ```

2. **Watch for auto-reload**:
   - Save file → Next.js recompiles → Refresh browser

3. **Check database**:
   ```bash
   npm run studio  # Visual editor at localhost:5555
   ```

4. **Reset database** (WARNING: deletes all data):
   ```bash
   npm run db:reset
   npm run prisma:seed
   ```

5. **Different port**:
   ```bash
   npm run dev -- -p 3001
   ```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | `npm install && npx prisma generate` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Database error | Check DATABASE_URL in .env |
| Build fails | Check terminal for specific error |
| Movies not showing | `npm run prisma:seed` |
| Login not working | Check database connection |

---

## 📱 Features Test

### Public (No Login)
- ✅ View homepage
- ✅ See featured movie
- ✅ Navigation menu
- ✅ Sign up page
- ✅ Login page

### After Login
- ✅ Browse all movies
- ✅ Search movies
- ✅ Filter by genre
- ✅ View movie details
- ✅ Add to watchlist
- ✅ Write reviews
- ✅ Rate movies
- ✅ View my list

---

## 🌐 Links

| Resource | Link |
|----------|------|
| GitHub Code | https://github.com/Navyanchaitanya/ciniflix |
| Live App | https://ciniflix-xxx.onrender.com (after deploy) |
| Next.js | https://nextjs.org |
| Prisma | https://www.prisma.io |
| Render | https://render.com |

---

## 📞 Support Resources

- 📖 **Local Setup?** → [LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md)
- 🚀 **Want to Deploy?** → [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)
- 🔧 **Technical Issues?** → [DEPLOYMENT.md](./DEPLOYMENT.md)
- ❓ **Getting Started?** → [SETUP_AND_DEPLOY.md](./SETUP_AND_DEPLOY.md)

---

## 🎓 Learning Path

1. **Run locally** - Understand how it works
2. **Play with code** - Modify, test, break things
3. **Read guides** - Understand architecture
4. **Deploy to Render** - Make it live
5. **Add features** - Extend functionality
6. **Share & celebrate** - Show the world! 🎉

---

## 🎯 Next Steps

```bash
# 1. Start development
npm run setup

# 2. Test the app
# Visit http://localhost:3000

# 3. When ready, push to GitHub
git push -u origin master

# 4. Deploy to Render
# Follow QUICK_DEPLOY_GUIDE.md
```

---

## 📊 Project Stats

- **Frontend Pages**: 6 (Home, Login, Signup, Browse, Detail, Watchlist)
- **API Endpoints**: 15+ (Auth, Movies, Watchlist, Reviews)
- **Database Tables**: 6 (Users, Movies, Watchlist, Reviews + Auth tables)
- **Components**: 10+ reusable React components
- **Lines of Code**: 2000+
- **Total Package Size**: ~500MB (node_modules)

---

## ✅ Production Ready

This application is **fully production-ready** with:
- ✅ Proper error handling
- ✅ Security best practices
- ✅ Database migrations
- ✅ Health check endpoints
- ✅ Environment variable management
- ✅ Seed data
- ✅ Build optimization
- ✅ Development/Production configs

---

## 🚀 Ready to Launch!

**Your Netflix clone is complete and ready to deploy!**

1. Open terminal
2. Run `npm run setup`
3. Visit http://localhost:3000
4. Push to GitHub
5. Deploy to Render
6. Share with the world! 🎬

---

**Built with ❤️ by Netflix Clone Developer**

**Powered by: React | Node.js | PostgreSQL | Render**

*Created: April 2026*

---

## 📝 License

This project is open-source and available under MIT License.

Feel free to use, modify, and distribute!

---

## 🙋 Questions?

Check the documentation files:
- [SETUP_AND_DEPLOY.md](./SETUP_AND_DEPLOY.md) - Master guide
- [LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md) - Local dev
- [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md) - Render deploy
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Technical details

**Happy coding! 🚀**
