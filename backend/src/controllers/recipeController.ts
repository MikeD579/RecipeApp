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

const scrape = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const scrapedRecipe = await Recipe.scrape(url);
        res.status(200).json({
            message: "Recipe scraped successfully",
            data: scrapedRecipe
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error scraping recipe", error: error.message });
    }
}

export default { list, show, create, update, del, scrape };