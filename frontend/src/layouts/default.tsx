import React from 'react';
import { RecipeCreateEditModal } from '../components/RecipeCreateEditModal';
import { useState } from 'react';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ title, children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-200 p-6">
      <div>
        <div><h1 className="text-4xl font-extrabold italic mt-16 mb-2 text-gray-800">{title}</h1></div>
        <div className="border-b border-gray-300 mb-10 h-1 w-full"></div>
      </div>
      <div className="flex flex-col items-center justify-start">
        {children}

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>
      <div className="fixed w-[calc(100%-2rem)] flex bottom-4 right-4">
        <div className="w-full p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg inset-shadow-md">
          search bar
        </div>
        <div
          className="flex items-center justify-center h-10 min-w-10 bg-white/60 backdrop-blur-sm shadow-lg inset-shadow-md leading-none rounded-full ml-2"
          onClick={() => { setIsModalOpen(true); }}
        >
          +
        </div>
      </div>
      <RecipeCreateEditModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); }}
      />
    </div>
  )
};