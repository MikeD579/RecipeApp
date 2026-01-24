import { api } from './axiosInstance';
import type { ApiResponse } from './axiosInstance';

export interface CategoryResponse {
  id?: number;
  name: string;
  imageUrl?: string;
}

export const categoryApi = {
  create: async (category: CategoryResponse): Promise<ApiResponse<CategoryResponse>> => {
    const { data } = await api.post('/categories', category);
    return data.data;
  },

  list: async (): Promise<CategoryResponse[]> => {
    const { data } = await api.get<ApiResponse<CategoryResponse[]>>('/categories');
    return data.data;
  },

  show: async (id: number): Promise<CategoryResponse> => {
    const { data } = await api.get<ApiResponse<CategoryResponse>>(`/categories/${id}`);
    return data.data;
  },

  update: async (category: CategoryResponse): Promise<ApiResponse<CategoryResponse>> => {
    const { data } = await api.put(`/categories/${category.id}`, category);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

  addRecipe: async (categoryId: number, recipeId: number): Promise<void> => {
    await api.post(`/categories/${categoryId}/recipes`, { recipeId });
  },

  removeRecipe: async (categoryId: number, recipeId: number): Promise<void> => {
    await api.delete(`/categories/${categoryId}/recipes/${recipeId}`);
  }
};