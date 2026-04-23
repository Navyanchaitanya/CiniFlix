# CiniFlix - Quick Start Guide

Complete Netflix Clone with React, Node.js & PostgreSQL

## What You Get ✨

- ✅ Complete Netflix UI clone
- ✅ User authentication & registration
- ✅ Movie catalog with search & filters
- ✅ Watchlist management
- ✅ Movie reviews & ratings
- ✅ Responsive design
- ✅ Database-backed backend

## 5-Minute Setup

### Install & Run Locally

```bash
# Navigate to project
cd ciniflix

# Install dependencies
npm install

# Set up database (create .env.local first with DATABASE_URL)
npx prisma generate
npx prisma migrate dev --name init

# Seed sample movies
npm run prisma:seed

# Start development server
npm run dev
```

Visit http://localhost:3000

Test with:
- Email: demo@example.com
- Password: demo123

## Deploy to Render in 10 Minutes

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Netflix clone ready for deployment"
git push origin main
```

### Step 2: Create Database

1. Go to render.com
2. New → PostgreSQL
3. Copy connection string
4. Save for next step

### Step 3: Create Web Service

1. New → Web Service
2. Connect GitHub → select ciniflix repo
3. Build Command: `npm install && npm run build && npx prisma migrate deploy && npm run prisma:seed`
4. Start Command: `npm start`
5. Add Environment Variables:
   - `DATABASE_URL`: (from PostgreSQL dashboard, use INTERNAL URL)
   - `NEXTAUTH_SECRET`: (generate: `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: https://your-app-name.onrender.com

### Step 4: Deploy

Click "Create Web Service" and wait ~2-3 minutes. That's it!

Your app will be at: `https://your-app-name.onrender.com`

## File Structure

```
src/
├── app/
│   ├── api/              # Backend API routes
│   ├── movie/[id]/       # Movie details page
│   ├── login/            # Authentication
│   ├── signup/
│   ├── watchlist/        # User's watchlist
│   ├── browse/           # Browse & search
│   └── page.js           # Home page
├── components/           # Reusable React components
└── lib/                  # Utilities (auth, database)

prisma/
├── schema.prisma         # Database schema
└── seed.js              # Sample data
```

## API Endpoints

**Movies**
- `GET /api/movies` - List all movies
- `GET /api/movies/[id]` - Get movie details

**Watchlist**
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add movie
- `DELETE /api/watchlist/[id]` - Remove movie

**Auth**
- `POST /api/auth/register` - Create account
- `POST /api/auth/[...nextauth]` - Login/logout

**Reviews**
- `POST /api/movies/[id]/reviews` - Add review

## Features

### 🏠 Home Page
- Hero section with featured movie
- Trending movies grid
- Quick watchlist add

### 🔍 Browse Page
- Search movies
- Filter by genre
- Infinite scroll
- Add to watchlist

### 🎬 Movie Details
- Full movie information
- Cast & crew
- Reviews & ratings
- Watch trailer
- Add rating/review

### 📋 My List
- Personalized watchlist
- Watch progress tracking
- Quick remove

### 🔐 Authentication
- Register with email/password
- Secure login
- Session management
- Auto-logout on close

## Database Tables

- **users** - User accounts
- **movies** - Movie catalog
- **watchlist_items** - User's watchlist
- **reviews** - Movie reviews
- **accounts** - OAuth integration
- **sessions** - Session tokens

## Customization

### Add More Movies

Edit `prisma/seed.js` to add more sample movies.

### Change Styling

Edit Tailwind classes in components (already configured in `globals.css`)

### Add OAuth (GitHub/Google)

Add credentials to `.env.local`:
```
GITHUB_ID=your-github-app-id
GITHUB_SECRET=your-github-secret
```

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Database error?**
```bash
# Reset database
npx prisma migrate reset

# Reseed
npm run prisma:seed
```

**Build fails on Render?**
- Check build logs in Render dashboard
- Ensure DATABASE_URL uses INTERNAL URL
- Verify all environment variables are set

## Next Steps

1. ✅ Deploy to Render (DEPLOYMENT.md)
2. 📱 Test on mobile
3. 🎨 Customize styling
4. 🎥 Add video streaming
5. 💳 Add payment (Stripe)
6. 📊 Add admin dashboard

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| Hosting | Render (Web + Database) |
| Styling | Tailwind CSS |

## Performance Tips

- Images are already optimized
- Pagination built-in for movies
- Sessions cached in JWT
- Database queries optimized with indexes

## Security Features

- ✅ Password hashing (bcryptjs)
- ✅ JWT session tokens
- ✅ SQL injection protected (Prisma)
- ✅ CSRF protection (NextAuth)
- ✅ Secure headers

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Render Docs](https://render.com/docs)

---

**Questions?** Check the full README.md or DEPLOYMENT.md

**Ready to launch?** Follow DEPLOYMENT.md for Render hosting!

Happy coding! 🎬🍿
