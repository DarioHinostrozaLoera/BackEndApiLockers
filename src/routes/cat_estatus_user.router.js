import {Router} from 'express';
import * as cat_estatus_user from '../controllers/cat_estatus_user.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, cat_estatus_user.findAll);
router.get('/:idCategoryStatusUser', token.authenticateToken, cat_estatus_user.findOne);
router.post('/', token.authenticateToken, cat_estatus_user.create);
router.put('/', token.authenticateToken, cat_estatus_user.update);
router.delete('/:idCategoryStatusUser',token.authenticateToken,  cat_estatus_user.delete);

export default router
