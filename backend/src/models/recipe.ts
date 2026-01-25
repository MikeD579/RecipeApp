import type { RecipesModel } from "../../generated/prisma/models";
import { prisma } from '../../lib/prisma.js';
import cast from "../utils/cast";
import { scrapeRecipe } from "../services/scraper";

const casts: { [key: string]: (val: any) => any } = {
    // Add any necessary type casts here
    id: (val: any) => parseInt(val),
    servings: (val: any) => parseInt(val),
    prepTime: (val: any) => parseInt(val),
    cookTime: (val: any) => parseInt(val),
};

const list = async () => {
    return await prisma.recipes.findMany();
};

const show = async (id: number) => {
    return await prisma.recipes.findUnique({
        where: { id: id },
        include: { Ingredients: true },
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
        include: { Ingredients: true }
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
        image: string;
        servings: number;
        prepTime: number;
        cookTime: number;
        instructions: string;
    } = await scrapeRecipe(url) as any;

    // console.log("Scraped recipe:", recipe);
    return {
        name: recipe.title,
        sourceUrl: url,
        imageUrl: recipe.image,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        instructions: recipe.instructions
    };
}

export default { list, show, store, update, delete: del, scrape };