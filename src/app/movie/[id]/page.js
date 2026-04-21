'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    fetchMovie();
    if (session) {
      fetchWatchlist();
    }
  }, [params.id, session]);

  const fetchMovie = async () => {
    try {
      const res = await fetch(`/api/movies/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setMovie(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await fetch('/api/watchlist');
      const data = await res.json();
      if (data.success) {
        setWatchlistItems(data.data);
        const inWatchlist = data.data.some((w) => w.movieId === params.id);
        setIsInWatchlist(inWatchlist);
      }
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (isInWatchlist) {
      const item = watchlistItems.find((w) => w.movieId === params.id);
      try {
        await fetch(`/api/watchlist/${item.id}`, { method: 'DELETE' });
        setIsInWatchlist(false);
      } catch (error) {
        console.error('Failed to remove from watchlist:', error);
      }
    } else {
      try {
        const res = await fetch('/api/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieId: params.id }),
        });
        if (res.ok) {
          setIsInWatchlist(true);
        }
      } catch (error) {
        console.error('Failed to add to watchlist:', error);
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/movies/${params.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: parseInt(rating),
          comment,
        }),
      });

      if (res.ok) {
        setRating(0);
        setComment('');
        fetchMovie();
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Header with backdrop */}
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Movie Details */}
      <div className="px-4 md:px-16 py-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-48 h-72 object-cover rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-yellow-400 mr-2">
                  {movie.rating?.toFixed(1)}
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(movie.rating / 2) ? '' : 'opacity-30'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gray-400">
                {movie.duration} min • {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>

            <p className="text-gray-300 text-lg mb-6">{movie.description}</p>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">
                <span className="font-bold">Director:</span> {movie.director}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold">Cast:</span> {movie.cast?.join(', ')}
              </p>
              <p className="text-gray-400">
                <span className="font-bold">Language:</span> {movie.language}
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              {movie.trailerUrl && (
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition"
                >
                  ▶ Watch Trailer
                </a>
              )}
              <button
                onClick={handleWatchlistToggle}
                className={`px-8 py-3 rounded font-bold transition ${
                  isInWatchlist
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isInWatchlist ? '✓ In My List' : '+ Add to List'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre?.map((g) => (
                <span key={g} className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {session && (
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>
            <form onSubmit={handleReviewSubmit} className="bg-gray-900 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-white font-bold mb-2">Rating (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-600 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-bold mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-600 outline-none"
                  placeholder="Share your thoughts..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !rating}
                className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition disabled:bg-gray-600"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {movie.reviews && movie.reviews.length > 0 && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="space-y-4">
              {movie.reviews.map((review) => (
                <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={review.user.image || 'https://ui-avatars.com/api/?name=' + review.user.name}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{review.user.name}</p>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(review.rating / 2) ? '' : 'opacity-30'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && <p className="text-gray-300 mt-2">{review.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
