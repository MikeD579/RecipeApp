import { useState, useEffect, type ReactNode } from 'react';
import { recipeApi, type RecipeResponse } from '../../api/recipeApi';
import { RecipeContext } from './RecipeContext';

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const recipes = await recipeApi.list();
      setRecipeList(recipes);
      localStorage.setItem('recipes', JSON.stringify(recipes));
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Load from cache on error
      const cached = localStorage.getItem('recipes');
      if (cached) setRecipeList(JSON.parse(cached));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load from cache first
    const cached = localStorage.getItem('recipes');
    if (cached) setRecipeList(JSON.parse(cached));

    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipeList, isLoading, refetch: fetchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};