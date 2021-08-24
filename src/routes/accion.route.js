import {Router} from 'express'
import * as accion from '../controllers/accion.controller';
import * as token from '../middlewares/token.middleware'

const router = Router();

router.get('/', token.authenticateToken, accion.findAll)
router.get('/:idCategoryAccion', token.authenticateToken, accion.findOne);
router.post('/', token.authenticateToken, accion.create);
router.put('/', token.authenticateToken, accion.update);
router.delete('/:idCategoryAccion', token.authenticateToken, accion.delete);

export default router
