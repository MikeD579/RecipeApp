import express from "express";
import recipeRoutes from './recipeRoutes.js';
import categoryRoutes from "./categoryRoutes.js";

const router = express.Router();

// Use recipe routes
router.use('/recipes', recipeRoutes);
router.use('/categories', categoryRoutes);

export default router;