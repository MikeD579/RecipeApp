import React from 'react';
import { Search, Home, ScrollText, LayoutList } from 'lucide-react';
import { RecipeCreateEditModal } from '../components/Recipe/RecipeCreateEditModal';
import { useState } from 'react';

type Page = "home" | "recipes" | "categories";

interface Props {
  children: React.ReactNode;
  currentPage?: Page;
  onPageChange?: (page: Page) => void;
}

export const DefaultLayout: React.FC<Props> = ({ children, currentPage = "home", onPageChange }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' as Page, icon: Home },
    { name: 'Recipes', id: 'recipes' as Page, icon: ScrollText },
    { name: 'Categories', id: 'categories' as Page, icon: LayoutList },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-200 p-6">
      <div className="flex flex-col items-center justify-start">
        {children}

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <div className="flex items-center w-[calc(100%-2rem)] ml-4 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg inset-shadow-md">
          <Search size={20} className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-[calc(100%-2rem)] bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="flex justify-around w-full p-2 bg-white gap-4 mt-3">
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
              <item.icon size={32} className="" />
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