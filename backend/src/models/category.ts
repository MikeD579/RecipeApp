import { parse } from "node:path";
import type { CategoriesModel } from "../../generated/prisma/models.js";
import { prisma } from '../../lib/prisma.js';
import cast from "../utils/cast.js";

const casts: { [key: string]: (val: any) => any } = {
  // Add any necessary type casts here
  id: (val: any) => parseInt(val),
  recipeId: (val: any) => parseInt(val),
};

const list = async () => {
  return await prisma.categories.findMany();
};

const show = async (id: number) => {
  return await prisma.categories.findUnique({
    where: { id: id },
    include: { Recipes: true }
  });
};

const store = async (categoryData: CategoriesModel) => {
  return await prisma.categories.create({
    data: cast.castData(categoryData, casts)
  });
}

const update = async (id: number, updateData: CategoriesModel) => {
  const category = await show(id); // Ensure category exists
  if (!category) {
    throw new Error("Category not found");
  }

  return await prisma.categories.update({
    where: { id: id },
    data: cast.castData(updateData, casts)
  });
}

const del = async (id: number) => {
  return await prisma.categories.delete({
    where: { id: id }
  });
}

const connectRecipe = async (id: number, recipeId: number) => {
  const category = await show(id);
  if (!category) {
    throw new Error("Category not found");
  }

  return await prisma.categories.update({
    where: { id: id },
    data: {
      Recipes: {
        connect: { id: recipeId }
      }
    },
    include: { Recipes: true }
  });
};

const removeRecipe = async (id: number, recipeId: number) => {
  const category = await show(id);
  if (!category) {
    throw new Error("Category not found");
  }

  return await prisma.categories.update({
    where: { id: id },
    data: {
      Recipes: {
        disconnect: { id: recipeId }
      }
    },
    include: { Recipes: true }
  });
};

export default { list, show, store, update, delete: del, connectRecipe, removeRecipe };