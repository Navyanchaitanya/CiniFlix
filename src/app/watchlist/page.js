'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function Watchlist() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchWatchlist();
    }
  }, [status, router]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch('/api/watchlist');
      const data = await res.json();
      if (data.success) {
        setWatchlist(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (id) => {
    try {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setWatchlist(watchlist.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">My List</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-6">Your list is empty</p>
            <Link
              href="/"
              className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map((item) => (
              <div key={item.id} className="relative group">
                <MovieCard
                  movie={item.movie}
                  onWatchlistToggle={() => handleRemoveFromWatchlist(item.id)}
                  isInWatchlist={true}
                />
                <button
                  onClick={() => handleRemoveFromWatchlist(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
