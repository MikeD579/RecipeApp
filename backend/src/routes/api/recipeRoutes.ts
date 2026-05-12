import express from 'express';
const router = express.Router();
import recipeController from '../../controllers/recipeController.js';

router.get('/', recipeController.list);
router.get('/:id', recipeController.show);
router.post('/', recipeController.create);
router.put('/:id', recipeController.update);
router.delete('/:id', recipeController.del);

router.post('/scrape', recipeController.scrape);

export default router;