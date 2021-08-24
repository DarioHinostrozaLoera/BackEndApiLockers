import {Router} from 'express';
import * as cat_rol from '../controllers/cat_rol.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, cat_rol.findAll);
router.get('/:idCategoryRol', token.authenticateToken, cat_rol.findOne);
router.post('/', token.authenticateToken, cat_rol.create);
router.put('/', token.authenticateToken, cat_rol.update);
router.delete('/:idCategoryRol', token.authenticateToken, cat_rol.delete);

export default router
