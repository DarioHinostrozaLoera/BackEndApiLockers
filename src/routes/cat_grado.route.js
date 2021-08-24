import {Router} from 'express';
import * as cat_grado from '../controllers/cat_grado.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, cat_grado.findAll);
router.get('/:idCategoryGrado', token.authenticateToken, cat_grado.findOne);
router.post('/', token.authenticateToken, cat_grado.create);
router.put('/', token.authenticateToken, cat_grado.update);
router.delete('/:idCategoryGrado', token.authenticateToken, cat_grado.delete);

export default router