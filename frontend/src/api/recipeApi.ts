import { api } from './axiosInstance';
import type { ApiResponse } from './axiosInstance';
import type { CategoryResponse } from './categoryApi';

export interface RecipeResponse {
  id?: number;
  title: string;
  total_time?: number;
  yields?: string;
  ingredients?: string[];
  instructions?: string[];
  image?: string;
  source: string;
  Categories?: CategoryResponse[];
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

  update: async (id: number, recipe: RecipeResponse): Promise<ApiResponse<RecipeResponse>> => {
    const { data } = await api.put(`/recipes/${id}`, recipe);
    return data.data;
  },

  list: async (): Promise<RecipeResponse[]> => {
    const { data } = await api.get<ApiResponse<RecipeResponse[]>>('/recipes');
    return data.data;
  },

  show: async (id: number): Promise<RecipeResponse> => {
    const { data } = await api.get<ApiResponse<RecipeResponse>>(`/recipes/${id}`);
    return data.data;
  }
};