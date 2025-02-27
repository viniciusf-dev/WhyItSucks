"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Gamepad2 } from 'lucide-react';

const SearchBar = () => {
  const [game, setGame] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!game.trim()) return;
    
    setIsSearching(true);
    // Simulate API call with timeout
    setTimeout(() => {
      router.push(`/results?game=${encodeURIComponent(game)}`);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-8 px-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              placeholder="Enter game name..."
              className="pixel-input w-full pl-12 pr-4 py-4 text-xl"
              disabled={isSearching}
            />
          </div>
          <button 
            type="submit" 
            className="ml-4 pixel-button flex items-center justify-center"
            disabled={isSearching}
          >
            <Gamepad2 className="mr-2" size={20} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
        {isSearching && (
          <div className="absolute -bottom-8 left-0 w-full text-center text-retro-purple animate-pulse">
            Scanning for negative reviews...
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;