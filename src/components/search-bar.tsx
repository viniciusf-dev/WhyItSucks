"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Gamepad2, X } from "lucide-react";
import debounce from "lodash/debounce";

interface GameResult {
  appid: number;
  name: string;
}

const SearchBar = () => {
  const [game, setGame] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GameResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameResult | null>(null);
  const router = useRouter();

  // Função debounce para busca enquanto digita
  const debouncedSearch = debounce(async (searchTerm: string) => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const res = await fetch(`/api/search?game=${encodeURIComponent(searchTerm)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.appid) {
          // Resultado único (correspondência exata)
          setSearchResults([{ appid: data.appid, name: data.name }]);
        } else if (data.results && data.results.length > 0) {
          // Múltiplos resultados
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (err) {
      console.error("Erro na busca:", err);
      setSearchResults([]);
      setShowResults(false);
    }
  }, 300);

  // Atualiza a busca quando o usuário digita
  useEffect(() => {
    if (game.trim()) {
      debouncedSearch(game);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [game]);

  // Fecha o dropdown de resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game.trim()) return;

    setIsSearching(true);

    // Se tiver um jogo selecionado, use seu appid
    const searchTerm = selectedGame ? selectedGame.name : game;
    const appId = selectedGame?.appid;

    try {
      // Guarda o appId no localStorage para uso posterior
      if (appId) {
        localStorage.setItem('lastSearchedAppId', appId.toString());
      }
    } catch (err) {
      console.error("Erro ao salvar appId:", err);
    }

    // Redireciona para a página de resultados após uma breve animação
    setTimeout(() => {
      router.push(`/results?game=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
      setShowResults(false);
    }, 1000);
  };

  const handleResultClick = (result: GameResult) => {
    console.log("Selected AppID:", result.appid); // Log do appId do jogo selecionado
    setGame(result.name);
    setSelectedGame(result);
    setShowResults(false);
  };

  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGame("");
    setSelectedGame(null);
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-8 px-4">
      <form onSubmit={handleSearch} className="relative search-container">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
            <input
              type="text"
              value={game}
              onChange={(e) => {
                setGame(e.target.value);
                setSelectedGame(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (searchResults.length > 0) {
                  setShowResults(true);
                }
              }}
              placeholder="Enter game name..."
              className="pixel-input w-full pl-12 pr-10 py-4 text-xl"
              disabled={isSearching}
              autoComplete="off"
            />
            {game && (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
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

        {/* Dropdown de resultados com animação de explosão de pixels */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-black border-4 border-retro-purple overflow-hidden crt-effect animate-pixel-explosion">
            <div className="bg-retro-black p-1">
              <div className="bg-retro-darkGray border-2 border-black">
                <div className="border-t-2 border-t-white/10 border-l-2 border-l-white/10 border-b-2 border-b-black/50 border-r-2 border-r-black/50 max-h-60 overflow-y-auto scrollbar">
                  <div className="p-1">
                    {searchResults.map((result, index) => (
                      <div
                        key={result.appid}
                        className={`p-2 cursor-pointer font-pixel-secondary text-lg transition-colors ${
                          index % 2 === 0 ? 'bg-retro-charcoal' : 'bg-retro-darkGray'
                        } hover:bg-retro-purple hover:text-white`}
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-center">
                          <Gamepad2 size={16} className="mr-2 text-retro-purple" />
                          <span>{result.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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