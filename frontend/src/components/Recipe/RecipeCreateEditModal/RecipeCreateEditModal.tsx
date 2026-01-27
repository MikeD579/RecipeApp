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
    title: '',
    yields: '1',
    total_time: 0,
    instructions: [],
    ingredients: [],
    image: '',
    source: '',
  });

  const handleScrape = async () => {
    try {
      const scrapedRecipe = await recipeApi.scrape(recipe.source);
      setRecipe({ ...recipe, ...scrapedRecipe });
    } catch (error) {
      console.error("Error scraping recipe:", error);
    }
  }

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
                  value={recipe.source}
                  onChange={(e) => setRecipe({ ...recipe, source: e.target.value })}
                />
              </div>
              <Button
                label="Scrape"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); handleScrape(); }}
                variant="primary"
                styleName="rounded-l-none"
              />
            </form>
            <form className="flex flex-col">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">Image</label>
                <input
                  type="text"
                  id="image"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.image}
                  onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.title}
                  onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="yields">Yields</label>
                <input
                  type="text"
                  id="yields"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.yields}
                  onChange={(e) => setRecipe({ ...recipe, yields: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="total_time">Total Time (minutes)</label>
                <input
                  type="number"
                  id="total_time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.total_time}
                  onChange={(e) => setRecipe({ ...recipe, total_time: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructions">Instructions</label>
                <textarea
                  id="instructions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={recipe.instructions?.[0] || ''}
                  onChange={(e) => setRecipe({ ...recipe, instructions: [e.target.value] })}
                />
              </div>
              {
                recipe.ingredients?.map((ing, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`ingredient-${index}`}>Ingredient {index + 1}</label>
                    <input
                      type="text"
                      id={`ingredient-${index}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ing}
                      onChange={(e) => {
                        const newIngredients = [...(recipe.ingredients || [])];
                        newIngredients[index] = e.target.value;
                        setRecipe({ ...recipe, ingredients: newIngredients });
                      }}
                    />
                  </div>
                ))
              }
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