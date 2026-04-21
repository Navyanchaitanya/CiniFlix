# CiniFlix - Netflix Clone

A full-stack Netflix clone built with React.js (Next.js), Node.js, and PostgreSQL. Stream your favorite movies with user authentication, watchlist management, and reviews.

## Features

✨ **User Authentication**
- User registration and login with NextAuth
- Secure password hashing with bcryptjs
- JWT based session management

🎬 **Movie Catalog**
- Browse trending movies
- Search movies by title or description
- Filter by genre
- View detailed movie information with reviews

📋 **Watchlist Management**
- Add/remove movies from watchlist
- Track watch progress
- Mark movies as completed

⭐ **Reviews & Ratings**
- Rate movies (1-10)
- Leave written reviews
- View other users' reviews

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **Tailwind CSS** - Styling
- **NextAuth.js** - Authentication
- **Axios** - HTTP requests

### Backend
- **Node.js** - Runtime
- **Next.js API Routes** - Backend API
- **Express** - API middleware (optional)

### Database
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database management
- **Render PostgreSQL** - Cloud database hosting

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or Render)
- GitHub account (optional for OAuth)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ciniflix.git
cd ciniflix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ciniflix"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npm run prisma:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## Database Setup with Render PostgreSQL

### Create a Render PostgreSQL Database

1. Go to [render.com](https://render.com)
2. Create a free PostgreSQL database
3. Copy the connection string
4. Add to `.env.local`:

```
DATABASE_URL="your-render-postgresql-url"
```

### Connect Render Database Locally

```bash
npx prisma db push
npm run prisma:seed
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handler

### Movies
- `GET /api/movies` - Get all movies (with pagination & filters)
- `GET /api/movies/[id]` - Get movie details

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add movie to watchlist
- `DELETE /api/watchlist/[id]` - Remove from watchlist
- `PATCH /api/watchlist/[id]` - Update watch progress

### Reviews
- `POST /api/movies/[id]/reviews` - Add review
- `GET /api/movies/[id]` - Get reviews with movie

## Deployment to Render

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ciniflix.git
git branch -M main
git push -u origin main
```

### 2. Create Render Web Service

1. Go to [render.com](https://render.com)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install && npm run build && npx prisma migrate deploy`
   - **Start Command:** `npm start`

### 3. Add Environment Variables on Render

Set these in the Render dashboard:

```
DATABASE_URL=your-render-postgresql-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-render-app-url
```

### 4. Deploy

Push changes to GitHub and Render will automatically deploy!

## Project Structure

```
ciniflix/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── movies/
│   │   │   ├── watchlist/
│   │   │   └── ...
│   │   ├── login/
│   │   ├── signup/
│   │   ├── browse/
│   │   ├── watchlist/
│   │   ├── movie/[id]/
│   │   └── page.js (home)
│   ├── components/
│   │   ├── Header.js
│   │   ├── MovieCard.js
│   │   ├── SessionProvider.js
│   │   └── ...
│   └── lib/
│       ├── prisma.js
│       └── auth.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── public/
├── .env.local
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Database Schema

### User
- id
- email (unique)
- password (hashed)
- name
- image
- emailVerified
- timestamps

### Movie
- id
- title
- description
- posterUrl
- backdropUrl
- releaseDate
- rating
- duration
- genre (array)
- director
- cast (array)
- trailerUrl
- videoUrl
- viewCount

### WatchlistItem
- id
- userId (foreign key)
- movieId (foreign key)
- addedAt
- completed
- progress (0-100)

### Review
- id
- userId (foreign key)
- movieId (foreign key)
- rating (1-10)
- comment
- timestamps

## Demo Credentials

After seeding the database:

```
Email: demo@example.com
Password: demo123
```

## Features to Add (Future)

- [ ] Payment integration (Stripe)
- [ ] Video streaming functionality
- [ ] User profiles and avatar upload
- [ ] Recommendation algorithm
- [ ] Admin dashboard for movie management
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Social features (follow, share ratings)
- [ ] Content rating system
- [ ] Subtitles support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, open an issue on GitHub or contact [your-email@example.com]

---

Happy streaming! 🎬🍿
