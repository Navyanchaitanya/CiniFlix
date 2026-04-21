'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/navigation';

const GENRES = ['Action', 'Drama', 'Crime', 'Sci-Fi', 'Thriller', 'Adventure'];

export default function Browse() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchMovies();
      fetchWatchlist();
    }
  }, [status, router]);

  useEffect(() => {
    filterMovies();
  }, [selectedGenre, searchQuery, movies]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data.data);
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

  const filterMovies = () => {
    let filtered = movies;

    if (selectedGenre) {
      filtered = filtered.filter((movie) => movie.genre.includes(selectedGenre));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleWatchlistToggle = async (movieId) => {
    if (watchlist.includes(movieId)) {
      // Remove from watchlist
      // Note: We need the actual watchlist item ID to remove it
      // For simplicity, we'll refetch the watchlist
      const item = (await fetch('/api/watchlist').then((r) => r.json())).data.find(
        (w) => w.movieId === movieId
      );
      if (item) {
        try {
          await fetch(`/api/watchlist/${item.id}`, { method: 'DELETE' });
          setWatchlist(watchlist.filter((id) => id !== movieId));
        } catch (error) {
          console.error('Failed to remove from watchlist:', error);
        }
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

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="px-4 md:px-16 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Browse</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-red-600 outline-none transition"
          />
        </div>

        {/* Genre Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Genres</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('')}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedGenre === ''
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  selectedGenre === genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No movies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchlistToggle={handleWatchlistToggle}
                isInWatchlist={watchlist.includes(movie.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
