import type { Request, Response } from 'express';
import Category from '../models/category';

const list = async (req: Request, res: Response) => {
  const categories = await Category.list();

  res.status(200).json({
    message: "Success",
    data: categories
  });
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const category = await Category.show(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Success",
    data: category
  });
};

const create = async (req: Request, res: Response) => {
  const newCategory = await Category.store(req.body);

  res.status(201).json({
    message: "Category created",
    data: newCategory
  });
}

const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const updatedCategory = await Category.update(id, req.body)
    .catch((error: any) => {
      return res.status(404).json({ message: error.message });
    });

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Category updated",
    data: updatedCategory
  });
}

const del = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const deleted = await Category.delete(id)
    .catch((error: any) => {
      return res.status(404).json({ message: error.message });
    });

  if (!deleted) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Category deleted"
  });
}

const connectRecipe = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const updatedCategory = await Category.connectRecipe(id, parseInt(req.body.recipeId))
    .catch((error: any) => {
      return res.status(404).json({ message: error.message });
    });

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Recipe added",
    data: updatedCategory
  });
};

const removeRecipe = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const recipeId = parseInt(req.params.recipeId as string);
  if (isNaN(id) || isNaN(recipeId)) {
    return res.status(400).json({ message: "Invalid category ID or recipe ID" });
  }

  const updatedCategory = await Category.removeRecipe(id, recipeId)
    .catch((error: any) => {
      return res.status(404).json({ message: error.message });
    });

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Recipe removed",
    data: updatedCategory
  });
};

export default {
  list,
  show,
  create,
  update,
  del,
  connectRecipe,
  removeRecipe
};