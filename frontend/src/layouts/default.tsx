import React from 'react';
import { Search } from 'lucide-react';
import { RecipeCreateEditModal } from '../components/RecipeCreateEditModal';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-200 p-6">
      <div className="flex flex-col items-center justify-start">
        {children}

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>
      <div className="fixed bottom-4 right-4 w-[calc(100%-2rem)]">
        <div className="flex items-center w-full p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg inset-shadow-md">
          <Search size={20} className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-[calc(100%-2rem)] bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>
      <RecipeCreateEditModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); }}
      />
    </div>
  )
};