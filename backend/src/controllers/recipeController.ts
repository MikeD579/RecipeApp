import type { Request, Response } from 'express';
import Recipe from '../models/recipe';

const list = async (req: Request, res: Response) => {
    const recipes = await Recipe.list();

    res.status(200).json({
        message: "Success",
        data: recipes
    });
};

const show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid recipe ID" });
    }

    const recipe = await Recipe.show(id);
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
        message: "Success",
        data: recipe
    });
};

const create = async (req: Request, res: Response) => {
    const newRecipe = await Recipe.store(req.body);

    res.status(201).json({
        message: "Recipe created",
        data: newRecipe
    });
}

const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid recipe ID" });
    }

    const updatedRecipe = await Recipe.update(id, req.body)
        .catch((error) => {
            return res.status(404).json({ message: error.message });
        });

    if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
        message: "Recipe updated",
        data: updatedRecipe
    });
}

const del = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid recipe ID" });
    }

    await Recipe.delete(id);

    res.status(200).json({
        message: "Recipe deleted"
    });
}

export default { list, show, create, update, del };