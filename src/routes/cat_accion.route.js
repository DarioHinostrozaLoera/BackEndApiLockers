import {Router} from 'express'
import * as catAccion from '../controllers/cat_accion.controller';
import * as token from '../middlewares/token.middleware'

const router = Router();

router.get('/', token.authenticateToken, catAccion.findAll);
router.get('/:idCategoryAccion', token.authenticateToken, catAccion.findOne);
router.post('/', token.authenticateToken, catAccion.create);
router.put('/', token.authenticateToken, catAccion.update);
router.delete('/:idCategoryAccion', token.authenticateToken, catAccion.delete);

export default router
