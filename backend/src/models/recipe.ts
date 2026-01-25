import type { RecipesModel } from "../../generated/prisma/models";
import { prisma } from '../../lib/prisma.js';
import cast from "../utils/cast";
import { scrapeRecipe } from "../services/scraper";

const casts: { [key: string]: (val: any) => any } = {
    // Add any necessary type casts here
    id: (val: any) => parseInt(val),
    total_time: (val: any) => parseInt(val),
    instructions: (val: any) => Array.isArray(val) ? val : JSON.parse(val),
    ingredients: (val: any) => Array.isArray(val) ? val : JSON.parse(val),
};

const list = async () => {
    return await prisma.recipes.findMany();
};

const show = async (id: number) => {
    return await prisma.recipes.findUnique({
        where: { id: id }
    });
};

const store = async (recipeData: RecipesModel) => {
    return await prisma.recipes.create({
        data: cast.castData(recipeData, casts)
    });
}

const update = async (id: number, updateData: RecipesModel) => {
    const recipe = await show(id); // Ensure recipe exists
    if (!recipe) {
        throw new Error("Recipe not found");
    }

    return await prisma.recipes.update({
        where: { id: id },
        data: cast.castData(updateData, casts),
    });
}

const del = async (id: number) => {
    return await prisma.recipes.delete({
        where: { id: id }
    });
}

const scrape = async (url: string) => {
    const recipe: {
        title: string;
        total_time: number;
        yields: string;
        ingredients: string[];
        instructions: string[];
        image: string;
    } = await scrapeRecipe(url) as any;

    // console.log("Scraped recipe:", recipe);
    return {
        title: recipe.title,
        total_time: recipe.total_time,
        yields: recipe.yields,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image,
        source: url,
    };
}

export default { list, show, store, update, delete: del, scrape };