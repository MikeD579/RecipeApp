import { useEffect, useState } from "react";
import type { RecipeResponse } from "../../../api/recipeApi";
import { ChevronLeft, Search as SearchIcon } from "lucide-react";
import { RecipeList } from "../../Recipe/RecipeList";
import Fuse from "fuse.js";

interface Props {
  items: RecipeResponse[];
  hidden?: boolean;
  className?: string;
}

export const Search = ({ items, hidden, className }: Props) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<RecipeResponse[]>([]);

  const fuse = new Fuse<RecipeResponse>(items, {
    keys: ['title', 'ingredients'],
    threshold: 0.3,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredItems([]);
    } else {
      const filtered = fuse.search(query).map(result => result.item);
      setFilteredItems(filtered);
    }
  };

  const handleSelectItem = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    setFilteredItems([]);
  }

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* search backdrop */}
      <div className={`${isSearchActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-0 left-0 w-screen min-h-screen bg-white/60 backdrop-blur-sm flex flex-col justify-start items-center shadow-md inset-shadow-md transition-all duration-300`}></div>
      {/* search bar */}
      <div
        style={{ transform: isSearchActive ? 'translateY(0)' : `translateY(${windowHeight - 9 * 16}px)` }}
        className={`${hidden ? "hidden" : "fixed"} top-12 left-0 flex items-center w-[calc(100%-2rem)] h-8 ml-4 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg inset-shadow-md transition-transform duration-300 z-10`}
      >
        {
          isSearchActive
            ? (<button onClick={() => setIsSearchActive(false)}><ChevronLeft size={20} className="mr-2 text-gray-600" /></button>)
            : (<SearchIcon size={20} className="mr-2 text-gray-600" />)
        }
        <input
          value={searchQuery}
          type="text"
          placeholder="Search"
          className="w-[calc(100%-2rem)] bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
          onFocus={() => setIsSearchActive(true)}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <RecipeList
          recipes={filteredItems}
          isLoading={false}
          className={`absolute top-12 left-0 w-full max-h-screen overflow-y-auto p-4 ${isSearchActive ? "opacity-100" : "opacity-0"} transition-all duration-300`}
          onClick={() => handleSelectItem()}
        />
      </div>
    </div>
  );
}