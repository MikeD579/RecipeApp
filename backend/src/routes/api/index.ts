import express from "express";
import recipeRoutes from './recipeRoutes';
import ingredientRoutes from './ingredientRoutes';

const router = express.Router();

// Use recipe routes
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);

export default router;