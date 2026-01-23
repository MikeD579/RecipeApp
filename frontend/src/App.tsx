import { useState, useEffect } from "react";
import { RecipeList } from "./components/RecipeList";
import { DefaultLayout } from "./layouts/default";
import { recipeApi } from "./api/recipeApi";
import type { RecipeResponse } from "./api/recipeApi";

export default function App() {

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
    <DefaultLayout title="recipes">
      <RecipeList recipes={recipeList} isLoading={isLoading} />
    </DefaultLayout>
  )
}
