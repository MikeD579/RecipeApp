import React from 'react';
import { ScrollText, FilePlusCorner, CalendarPlus } from 'lucide-react';
import { Search } from '../components/Base/Search';
import { NavLink, useLocation } from "react-router-dom";
import { useRecipes } from '../contexts/RecipeContext';

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  const { recipeList } = useRecipes();
  const location = useLocation();
  const isExactRoute = location.pathname !== '/';

  return (
    <div className="min-h-screen w-full bg-gray-200 p-6">
      <div className="max-w-2xl mx-auto pb-20">
        {children}

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>

      <NavLink
        to="/recipe/new"
        className={`${isExactRoute ? "hidden" : "fixed"} bottom-28 right-4 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-md`}
      >
        <FilePlusCorner size={20} />
      </NavLink>

      {recipeList?.length > 0 && (
        <Search items={recipeList} hidden={isExactRoute} />
      )}

      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="grid grid-cols-2 w-full p-2 bg-white gap-4 mt-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-md transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-600'}`
            }
          >
            <span className="flex items-center justify-center gap-2">
              <ScrollText size={20} className="" />
              Recipes
            </span>
          </NavLink>
          <NavLink
            to="/mealplans"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-md transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-600'}`
            }
          >
            <span className="flex items-center justify-center gap-2">
              <CalendarPlus size={20} className="" />
              Meal Plans
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  )
};