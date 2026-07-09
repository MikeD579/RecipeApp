import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";
import { RecipeList } from "../../components/Recipe/RecipeList";

export const Recipes = () => {
  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handleRefresh() {
    setIsLoading(true);
    recipeApi.list().then((recipes) => {
      setRecipeList(recipes);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await recipeApi.list();
        setRecipeList(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="w-full">
      <div>
        <div className="mt-16 grid grid-cols-3 auto-cols-max items-center gap-4">
          <h1 className="text-5xl font-extrabold italic mb-2 text-gray-800">Recipes</h1>
          <span className="text-center text-sm font-thin text-gray-700">
            Total Recipes: {recipeList.length}
          </span>
          <button
            className="ml-auto mr-4 text-gray-600"
            onClick={handleRefresh}
          >
            <RefreshCw size={24} />
          </button>
        </div>
        <div className="border-b border-gray-300 mb-6 h-1 w-full"></div>
      </div>
      <RecipeList isLoading={isLoading} recipes={recipeList} />
    </div>
  );
}