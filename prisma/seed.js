const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const movies = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl:
      "https://images.unsplash.com/photo-1533613220915-121f5051d4d0?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1533613220915-121f5051d4d0?w=1200&h=600&fit=crop",
    releaseDate: new Date("1994-09-23"),
    rating: 9.3,
    duration: 142,
    genre: ["Drama", "Crime"],
    language: "en",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman"],
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    releaseDate: new Date("2008-07-18"),
    rating: 9.0,
    duration: 152,
    genre: ["Action", "Crime", "Drama"],
    language: "en",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"],
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    posterUrl:
      "https://images.unsplash.com/photo-1526920050866-1ee84e6bf17d?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1526920050866-1ee84e6bf17d?w=1200&h=600&fit=crop",
    releaseDate: new Date("2010-07-16"),
    rating: 8.8,
    duration: 148,
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "en",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard"],
    trailerUrl: "https://www.youtube.com/watch?v=YoHD_XwrzKw",
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterUrl:
      "https://images.unsplash.com/photo-1484238985556-f3b196cd269d?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1484238985556-f3b196cd269d?w=1200&h=600&fit=crop",
    releaseDate: new Date("1994-10-14"),
    rating: 8.9,
    duration: 154,
    genre: ["Crime", "Drama"],
    language: "en",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman"],
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4EJOLQ",
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl:
      "https://images.unsplash.com/photo-1532794527178-a8baf47e5e7d?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1532794527178-a8baf47e5e7d?w=1200&h=600&fit=crop",
    releaseDate: new Date("2014-11-07"),
    rating: 8.6,
    duration: 169,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    language: "en",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    trailerUrl: "https://www.youtube.com/watch?v=zSID6AWvubE",
  },
  {
    title: "The Matrix",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines.",
    posterUrl:
      "https://images.unsplash.com/photo-1518488588421-ba891ab04bc1?w=300&h=450&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1518488588421-ba891ab04bc1?w=1200&h=600&fit=crop",
    releaseDate: new Date("1999-03-31"),
    rating: 8.7,
    duration: 136,
    genre: ["Action", "Sci-Fi"],
    language: "en",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.watchlistItem.deleteMany();
  await prisma.movie.deleteMany();

  // Create movies
  for (const movie of movies) {
    const createdMovie = await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${createdMovie.title}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
