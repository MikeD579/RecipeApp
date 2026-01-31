import { useContext } from 'react';
import { RecipeContext } from './RecipeContext.js';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }
  return context;
};
