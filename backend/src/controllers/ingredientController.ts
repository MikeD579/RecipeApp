import type { Request, Response } from 'express';
import Ingredient from '../models/ingredient';

const list = async (req: Request, res: Response) => {
    const ingredients = await Ingredient.list();

    res.status(200).json({
        message: "Success",
        data: ingredients
    });
};

const show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ingredient ID" });
    }

    const ingredient = await Ingredient.show(id);
    if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
    }

    res.status(200).json({
        message: "Success",
        data: ingredient
    });
};

const create = async (req: Request, res: Response) => {
    const newIngredient = await Ingredient.store(req.body);

    res.status(201).json({
        message: "Ingredient created",
        data: newIngredient
    });
}

const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid recipe ID" });
    }

    const updatedIngredient = await Ingredient.update(id, req.body)
        .catch((error) => {
            return res.status(404).json({ message: error.message });
        });

    if (!updatedIngredient) {
        return res.status(404).json({ message: "Ingredient not found" });
    }

    res.status(200).json({
        message: "Ingredient updated",
        data: updatedIngredient
    });
}

const del = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ingredient ID" });
    }

    await Ingredient.delete(id);

    res.status(200).json({
        message: "Ingredient deleted"
    });
}

export default { list, show, create, update, del };