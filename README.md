# CiniFlix - Netflix Clone

A full-stack Netflix clone application built with React, Next.js, Node.js, and PostgreSQL.

## Features

✨ **User Authentication** - Secure sign-up and login with NextAuth.js
🎬 **Movie Browse** - Browse, search, and filter movies
🎯 **Watchlist** - Add movies to your personal watchlist
⭐ **Reviews & Ratings** - Write and read movie reviews
📱 **Responsive Design** - Works on desktop, tablet, and mobile
🚀 **Production Ready** - Deployed on Render

## Tech Stack

- **Frontend**: React 19, Next.js 16, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js 4
- **Deployment**: Render

## Quick Start

### Prerequisites
- Node.js v20+
- PostgreSQL database
- npm or yarn

### Local Development

1. Clone the repository
```bash
git clone https://github.com/Navyanchaitanya/ciniflix.git
cd ciniflix
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.production.example .env.local
# Edit .env.local with your local PostgreSQL connection string
```

4. Run database migrations and seed data
```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Start the development server
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Deployment to Render

1. Push code to GitHub
2. Create a new Web Service on Render connected to this repository
3. Select Node as runtime
4. Set environment variables in Render dashboard:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - Other variables are auto-configured by Render from render.yaml
5. Deploy!

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
npm run db:reset         # Reset database
npm run studio           # Open Prisma Studio
npm run lint             # Run ESLint
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Get current session

### Movies
- `GET /api/movies` - Get all movies (with pagination)
- `GET /api/movies/[id]` - Get movie details
- `GET /api/movies/[id]/reviews` - Get movie reviews

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add movie to watchlist
- `DELETE /api/watchlist/[id]` - Remove from watchlist

### Reviews
- `POST /api/reviews` - Create a review
- `GET /api/reviews` - Get reviews

### Health
- `GET /api/health` - Check app and database status

## Project Structure

```
├── src/
│   ├── app/           # Next.js pages and API routes
│   ├── components/    # React components
│   ├── lib/          # Utilities
│   └── styles/       # CSS files
├── prisma/           # Database schema and migrations
├── public/           # Static assets
├── render.yaml       # Render deployment config
└── package.json      # Dependencies
```

## Database Models

- **User** - User accounts with email, name, password
- **Movie** - Movie details with title, description, ratings
- **WatchlistItem** - User's saved movies and watch progress
- **Review** - User reviews and ratings for movies

## Demo Account

Email: test@example.com
Password: password123

## License

MIT
