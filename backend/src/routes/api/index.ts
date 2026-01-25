import express from "express";
import recipeRoutes from './recipeRoutes';
import categoryRoutes from "./categoryRoutes";

const router = express.Router();

// Use recipe routes
router.use('/recipes', recipeRoutes);
router.use('/categories', categoryRoutes);

export default router;