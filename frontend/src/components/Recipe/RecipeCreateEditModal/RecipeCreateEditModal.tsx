import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from "../../Base/Button";
import { recipeApi } from "../../../api/recipeApi";
import type { RecipeResponse } from "../../../api/recipeApi";

interface RecipeCreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeCreateEditModal = ({ isOpen, onClose }: RecipeCreateEditModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const [recipe, setRecipe] = useState<RecipeResponse>({
    name: '',
    imageUrl: '',
    servings: 1,
    sourceUrl: '',
    prepTime: 0,
    cookTime: 0,
    instructions: ''
  });

  // const handleScrape = async (url: string) => {}
  const handleSaveRecipe = async () => {
    try {
      const response = await recipeApi.save(recipe);
      console.log("Recipe saved:", response);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  if (!isOpen) return null;
  const target = document.getElementById('modal-root');
  if (!target) return null;

  return createPortal(
    <div>
      <div className={`fixed top-0 left-0 min-h-full w-full z-40 bg-black/40 ${isOpen ? 'block' : 'hidden'}`}></div>
      <div
        className={`fixed bottom-0 left-0 w-full z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="relative bg-white px-2 py-4 h-[calc(100vh-150px)] rounded-t-4xl shadow-lg w-full max-w-md">
          <div
            className="absolute top-4 right-8"
          >
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
          </div>
          <h2 className="text-2xl font-bold mb-4 pl-4">Create/Edit Recipe</h2>

          <div className="overflow-y-auto h-[calc(100vh-225px)] px-4 pb-10">
            <form className="flex items-end mb-6">
              <div className="w-full">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="sourceUrl">Source URL</label>
                <input
                  type="text"
                  id="sourceUrl"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:inset-ring-1 focus:inset-ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button
                label="Scrape"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); console.log("Scrape clicked"); }}
                variant="primary"
                styleName="rounded-l-none"
              />
            </form>
            <form className="flex flex-col">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.imageUrl}
                  onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.name}
                  onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="servings">Servings</label>
                <input
                  type="number"
                  id="servings"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.servings}
                  onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="prepTime">Prep Time (minutes)</label>
                <input
                  type="number"
                  id="prepTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.prepTime}
                  onChange={(e) => setRecipe({ ...recipe, prepTime: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="cookTime">Cook Time (minutes)</label>
                <input
                  type="number"
                  id="cookTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.cookTime}
                  onChange={(e) => setRecipe({ ...recipe, cookTime: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Button
                label="Save Recipe"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); handleSaveRecipe(); }}
                variant="primary"
                styleName="self-end"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    , target);
}