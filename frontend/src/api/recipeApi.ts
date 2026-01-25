import { api } from './axiosInstance';
import type { ApiResponse } from './axiosInstance';

export interface RecipeResponse {
  id?: number;
  name: string;
  sourceUrl: string;
  imageUrl?: string;
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  instructions?: string;
}

export const recipeApi = {
  scrape: async (url: string): Promise<RecipeResponse> => {
    const { data } = await api.post<ApiResponse<RecipeResponse>>('/recipes/scrape', { url });
    return data.data;
  },

  save: async (recipe: RecipeResponse): Promise<ApiResponse<RecipeResponse>> => {
    const { data } = await api.post('/recipes', recipe);
    return data.data;
  },

  list: async (): Promise<RecipeResponse[]> => {
    const { data } = await api.get<ApiResponse<RecipeResponse[]>>('/recipes');
    return data.data;
  }
};