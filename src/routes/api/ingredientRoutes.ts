import express from 'express';
const router = express.Router();
import ingredientController from '../../controllers/ingredientController';

router.get('/', ingredientController.list);
router.get('/:id', ingredientController.show);
router.post('/', ingredientController.create);
router.put('/:id', ingredientController.update);
router.delete('/:id', ingredientController.del);

export default router;