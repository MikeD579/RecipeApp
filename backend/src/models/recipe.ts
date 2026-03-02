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
    Categories: (val: any) => Array.isArray(val) ? val : JSON.parse(val),
};

const list = async () => {
    return await prisma.recipes.findMany({
        include: {
            Categories: true,
        },
    });
};

const show = async (id: number) => {
    return await prisma.recipes.findUnique({
        where: { id: id },
        include: {
            Categories: true,
        },
    });
};

const store = async (recipeData: RecipesModel & { Categories?: any }) => {
    const castedData = cast.castData(recipeData, casts);
    return await prisma.recipes.create({
        data: {
            ...castedData,
            Categories: {
                connectOrCreate: castedData.Categories?.map((cat: any) => ({
                    where: { name: cat.name },
                    create: { name: cat.name },
                })) || [],
            }
        },
        include: {
            Categories: true,
        },
    });
}

const update = async (id: number, updateData: RecipesModel & { Categories?: any }) => {
    const recipe = await show(id); // Ensure recipe exists
    if (!recipe) {
        console.error(`Recipe with id ${id} not found for update.`);
        throw new Error("Recipe not found");
    }

    const castedData = cast.castData(updateData, casts);

    const updatedRecipe = await prisma.recipes.update({
        where: { id: id },
        data: {
            ...castedData,
            Categories: {
                set: [],
                connectOrCreate: castedData.Categories?.map((cat: any) => ({
                    where: { name: cat.name },
                    create: { name: cat.name },
                })) || [],
            }
        },
        include: {
            Categories: true,
        },
    });

    await cleanupUnusedCategories();

    return updatedRecipe;
}

const del = async (id: number) => {
    const deletedRecipe = await prisma.recipes.delete({
        where: { id: id }
    });

    await cleanupUnusedCategories();

    return deletedRecipe;
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

const cleanupUnusedCategories = async () => {
    await prisma.categories.deleteMany({
        where: {
            Recipes: {
                none: {} // This selects categories that have NO recipes linked
            }
        }
    });
};

export default { list, show, store, update, delete: del, scrape };