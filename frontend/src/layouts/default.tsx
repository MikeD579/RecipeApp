import React from 'react';
import { Search, ScrollText, FilePlusCorner, CalendarPlus } from 'lucide-react';
import { RecipeCreateEditModal } from '../components/Recipe/RecipeCreateEditModal';
import { useState, useEffect } from 'react';

type Page = "recipes" | "mealplans";

interface Props {
  children: React.ReactNode;
  currentPage?: Page;
  onPageChange?: (page: Page) => void;
}

export const DefaultLayout: React.FC<Props> = ({ children, currentPage = "recipes", onPageChange }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Recipes', id: 'recipes' as Page, icon: ScrollText },
    { name: 'Meal Plans', id: 'mealplans' as Page, icon: CalendarPlus },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-200 p-6">
      <div className="flex flex-col items-center justify-start">
        {children}

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={`${isSearchActive ? "hidden" : "fixed"} bottom-28 right-4 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-md`}
      >
        <FilePlusCorner size={20} />
      </button>

      <div
        className={`${isSearchActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-0 left-0 w-screen min-h-screen bg-white/60 backdrop-blur-sm flex flex-col justify-start items-center shadow-md inset-shadow-md transition-all duration-300`}
      >
      </div>

      <div
        style={{
          transform: isSearchActive ? 'translateY(0)' : `translateY(${windowHeight - 9 * 16}px)`,
        }}
        className="fixed top-12 left-0 flex items-center w-[calc(100%-2rem)] h-8 ml-4 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg inset-shadow-md transition-transform duration-300 z-10"
        onClick={() => setIsSearchActive(!isSearchActive)}
      >
        <Search size={20} className="mr-2 text-gray-600" />
        <input
          type="text"
          placeholder="Search"
          className="w-[calc(100%-2rem)] bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <div className="grid grid-cols-2 w-full p-2 bg-white gap-4 mt-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onPageChange?.(item.id)}
              className={
                currentPage === item.id
                  ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              <span className="flex items-center justify-center gap-2">
                <item.icon size={20} className="" />
                <div>{item.name}</div>
              </span>
            </button>
          ))}
        </div>
      </div>
      <RecipeCreateEditModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); }}
      />
    </div>
  )
};