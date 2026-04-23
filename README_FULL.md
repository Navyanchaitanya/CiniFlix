# CiniFlix - Netflix Clone

A full-stack movie streaming application built with **React.js (Next.js)**, **Node.js**, and **PostgreSQL**. 

🎬 Stream your favorite movies with user authentication, personalized watchlists, and community reviews.

## 🌟 Features

### User Management
- ✅ User registration and login with NextAuth
- ✅ Secure password hashing with bcryptjs
- ✅ JWT-based session management
- ✅ Profile management

### Movie Browsing
- ✅ Browse trending and popular movies
- ✅ Advanced search by title or description
- ✅ Filter movies by genre
- ✅ Detailed movie information with:
  - Poster and backdrop images
  - Release date, rating, duration
  - Director and cast information
  - Synopsis and trailers

### Watchlist Features
- ✅ Add/remove movies from personal watchlist
- ✅ Track watch progress (0-100%)
- ✅ Mark movies as completed/watched
- ✅ Quick access to saved movies

### Community Features
- ✅ Rate movies (1-10 stars)
- ✅ Write and read user reviews
- ✅ View aggregated ratings and review counts

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with SSR
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **NextAuth.js** - Authentication

### Backend  
- **Node.js** - JavaScript runtime
- **Express.js** (built into Next.js API routes) 
- **Prisma** - Database ORM

### Database
- **PostgreSQL** - Relational database
- Hosted on **Render PostgreSQL** for production

### Deployment
- **Render** - Hosting platform for web service
- **GitHub** - Version control and CI/CD trigger

## 📋 Project Structure

```
ciniflix/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/
│   │   │   ├── movies/
│   │   │   ├── watchlist/
│   │   │   └── reviews/
│   │   ├── login/               # User login page
│   │   ├── signup/              # User registration page
│   │   ├── browse/              # Movie browsing page
│   │   ├── movie/[id]/          # Movie detail page
│   │   ├── watchlist/           # User's watchlist page
│   │   ├── layout.js            # Root layout
│   │   ├── page.js              # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable React components
│   │   ├── Header.js
│   │   ├── MovieCard.js
│   │   ├── SessionProvider.js
│   │   └── ...
│   └── lib/                     # Utilities
│       ├── auth.js              # Auth helpers
│       └── prisma.js            # Prisma client
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.js                  # Database seeding
├── public/                      # Static assets
├── .env.local                   # Local environment variables
├── .env.production              # Production environment template
├── package.json
├── next.config.js
├── DEPLOYMENT.md                # Deployment instructions
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL database (local or Render)
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ciniflix.git
cd ciniflix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed sample movies (optional)
npm run prisma:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Seed database with sample movies
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth authentication
- `POST /api/auth/callback/credentials` - Credentials login

### Movies
- `GET /api/movies` - Get movies (supports pagination, search, filtering)
- `GET /api/movies/[id]` - Get single movie details
- `POST /api/movies/[id]/reviews` - Create review
- `GET /api/movies/[id]/reviews` - Get movie reviews

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add movie to watchlist
- `GET /api/watchlist/[id]` - Get specific watchlist item
- `DELETE /api/watchlist/[id]` - Remove from watchlist
- `PATCH /api/watchlist/[id]` - Update progress/completion

## 🔐 Environment Variables

### Required
```env
DATABASE_URL=              # PostgreSQL connection string
NEXTAUTH_SECRET=           # Generate: openssl rand -base64 32
NEXTAUTH_URL=             # Your app URL (http://localhost:3000 for dev)
```

### Optional (for OAuth login)
```env
GITHUB_ID=                # GitHub OAuth application ID
GITHUB_SECRET=            # GitHub OAuth secret
GOOGLE_CLIENT_ID=         # Google OAuth client ID
GOOGLE_CLIENT_SECRET=     # Google OAuth secret
```

## 📦 Database Schema

### Users
- `id` - Unique identifier
- `email` - Unique email address
- `name` - Display name
- `password` - Hashed password
- `image` - Profile picture URL
- `createdAt`, `updatedAt` - Timestamps

### Movies
- `id` - Unique identifier
- `title` - Movie title
- `description` - Movie plot
- `posterUrl`, `backdropUrl` - Movie images
- `releaseDate` - Release date
- `rating` - IMDB-style rating
- `duration` - Duration in minutes
- `genre` - Array of genres
- `director`, `cast` - Production details
- `trailerUrl`, `videoUrl` - Media links

### WatchlistItems
- `id` - Unique identifier
- `userId` - Reference to user
- `movieId` - Reference to movie
- `progress` - Watch progress (0-100%)
- `completed` - Boolean flag
- `addedAt` - When added to list

### Reviews
- `id` - Unique identifier
- `userId` - Reference to user
- `movieId` - Reference to movie
- `rating` - 1-10 rating
- `comment` - Text review
- `createdAt`, `updatedAt` - Timestamps

## 🚀 Deployment on Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Render with:
- PostgreSQL database on Render
- Environment variable setup
- Database migrations
- Sample data seeding
- Troubleshooting guide

### Quick Deploy Steps

1. Push code to GitHub
2. Create PostgreSQL database on Render
3. Create Web Service on Render (connected to GitHub)
4. Set environment variables
5. Deploy automatically from git push

## 🎯 Features Coming Soon

- [ ] Advanced recommendation engine
- [ ] Continue watching feature
- [ ] Social sharing
- [ ] Multiple language support
- [ ] Mobile app (React Native)
- [ ] TV show support
- [ ] Personalized playlists
- [ ] Admin dashboard

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review [Next.js docs](https://nextjs.org/docs)
- Check [Prisma docs](https://www.prisma.io/docs)

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ using React, Node.js, and PostgreSQL**
