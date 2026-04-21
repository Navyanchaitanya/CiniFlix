'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchMovies();
    if (session) {
      fetchWatchlist();
    }
  }, [session]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data.data);
      if (data.data.length > 0) {
        setFeaturedMovie(data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await fetch('/api/watchlist');
      const data = await res.json();
      if (data.success) {
        setWatchlist(data.data.map((w) => w.movieId));
      }
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    }
  };

  const handleWatchlistToggle = async (movieId) => {
    if (!session) {
      window.location.href = '/login';
      return;
    }

    if (watchlist.includes(movieId)) {
      // Remove from watchlist
      const item = watchlist.find((w) => w === movieId);
      try {
        await fetch(`/api/watchlist/${item}`, { method: 'DELETE' });
        setWatchlist(watchlist.filter((id) => id !== movieId));
      } catch (error) {
        console.error('Failed to remove from watchlist:', error);
      }
    } else {
      // Add to watchlist
      try {
        const res = await fetch('/api/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieId }),
        });
        if (res.ok) {
          setWatchlist([...watchlist, movieId]);
        }
      } catch (error) {
        console.error('Failed to add to watchlist:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <img
            src={featuredMovie.backdropUrl || featuredMovie.posterUrl}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">{featuredMovie.title}</h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-6 line-clamp-3">{featuredMovie.description}</p>
            <div className="flex gap-4">
              <a
                href={`/movie/${featuredMovie.id}`}
                className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
              >
                ▶ Play
              </a>
              <button
                onClick={() => handleWatchlistToggle(featuredMovie.id)}
                className="bg-gray-500 text-white px-8 py-3 rounded font-bold hover:bg-gray-600 transition"
              >
                {watchlist.includes(featuredMovie.id) ? '✓ In List' : '+ My List'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <div className="px-4 md:px-16 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={handleWatchlistToggle}
              isInWatchlist={watchlist.includes(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
