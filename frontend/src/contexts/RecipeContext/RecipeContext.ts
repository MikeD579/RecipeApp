import { createContext } from 'react';
import { type RecipeResponse } from '../../api/recipeApi';

export interface RecipeContextType {
  recipeList: RecipeResponse[];
  isLoading: boolean;
  refetch: () => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);
