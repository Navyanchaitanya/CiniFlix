'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="font-bold text-white">C</span>
            </div>
            <span className="text-2xl font-bold text-white">inicFlix</span>
          </Link>

          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Home
            </Link>
            {session && (
              <>
                <Link href="/browse" className="text-white hover:text-gray-300 transition">
                  Browse
                </Link>
                <Link href="/watchlist" className="text-white hover:text-gray-300 transition">
                  My List
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    src={session.user?.image || 'https://ui-avatars.com/api/?name=' + session.user?.email}
                    alt={session.user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg">
                  <div className="p-4 text-white border-b border-gray-600">
                    <p className="font-semibold">{session.user?.name}</p>
                    <p className="text-sm text-gray-400">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gray-300 transition">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block text-white hover:text-gray-300 transition">
              Home
            </Link>
            {session && (
              <>
                <Link href="/browse" className="block text-white hover:text-gray-300 transition">
                  Browse
                </Link>
                <Link href="/watchlist" className="block text-white hover:text-gray-300 transition">
                  My List
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
