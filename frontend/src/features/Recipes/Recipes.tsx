import { useState, useEffect } from "react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";
import { RecipeList } from "../../components/Recipe/RecipeList";

type Page = "home" | "recipes" | "categories";

interface Props {
  setCurrentPage: (page: Page) => void;
}

export const Recipes = ({ setCurrentPage }: Props) => {
  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <div><h1 className="text-5xl font-extrabold italic mt-16 mb-2 text-gray-800">Recipes</h1></div>
        <div className="border-b border-gray-300 mb-6 h-1 w-full"></div>
      </div>
      <RecipeList isLoading={isLoading} recipes={recipeList} />
    </div>
  );
}