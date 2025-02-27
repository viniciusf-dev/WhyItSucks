"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Gamepad2 } from "lucide-react";

const SearchBar = () => {
  const [game, setGame] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game.trim()) return;

    setIsSearching(true);

    // Passo 1: consultar a rota /api/search
    try {
      const res = await fetch(`/api/search?game=${encodeURIComponent(game)}`);
      if (res.ok) {
        const data = await res.json();
        // Exemplo: logar no console o appid
        console.log("AppID encontrado no Mongo:", data.appid);
      } else {
        // Se não estiver OK, você pode tratar erro se quiser
        const errorData = await res.json();
        console.error("Erro ao buscar jogo:", errorData.error);
      }
    } catch (err) {
      console.error("Erro na chamada da API:", err);
    }

    // Passo 2: após a chamada (independente do resultado), aguarda 1 seg e redireciona
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
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
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
