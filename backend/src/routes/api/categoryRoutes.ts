import express from 'express';
const router = express.Router();
import categoryController from '../../controllers/categoryController';

router.get('/', categoryController.list);
router.get('/:id', categoryController.show);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.del);
router.post('/:id/recipes', categoryController.connectRecipe);
router.delete('/:id/recipes/:recipeId', categoryController.removeRecipe);

export default router;