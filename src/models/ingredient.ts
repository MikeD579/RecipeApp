import type { IngredientsModel } from "../../generated/prisma/models";
import { prisma } from '../../lib/prisma.js';
import cast from "../utils/cast";

const casts: { [key: string]: (val: any) => any } = {
    // Add any necessary type casts here
    id: (val: any) => parseInt(val),
    recipeId: (val: any) => parseInt(val),
    amount: (val: any) => parseFloat(val),
};

const list = async () => {
    return await prisma.ingredients.findMany();
};

const show = async (id: number) => {
    return await prisma.ingredients.findUnique({
        where: { id: id }
    });
};

const store = async (ingredientData: IngredientsModel) => {
    return await prisma.ingredients.create({
        data: cast.castData(ingredientData, casts)
    });
}

const update = async (id: number, updateData: IngredientsModel) => {
    const ingredient = await show(id); // Ensure ingredient exists
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }

    return await prisma.ingredients.update({
        where: { id: id },
        data: cast.castData(updateData, casts)
    });
}

const del = async (id: number) => {
    return await prisma.ingredients.delete({
        where: { id: id }
    });
}


export default { list, show, store, update, delete: del };