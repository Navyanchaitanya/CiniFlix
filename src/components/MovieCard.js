'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MovieCard({ movie, onWatchlistToggle, isInWatchlist = false }) {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWatchlistClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onWatchlistToggle(movie.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {hovered && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 transition-all duration-300">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 font-bold">{movie.rating?.toFixed(1)}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(movie.rating / 2) ? '' : 'opacity-30'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleWatchlistClick}
                disabled={loading}
                className={`p-2 rounded-full transition ${
                  isInWatchlist
                    ? 'bg-red-600 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                }`}
              >
                {loading ? '...' : isInWatchlist ? '✓' : '+'}
              </button>
            </div>

            <p className="text-gray-300 text-sm line-clamp-2 mb-3">{movie.description}</p>

            <div className="flex flex-wrap gap-1">
              {movie.genre?.slice(0, 3).map((g) => (
                <span key={g} className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
