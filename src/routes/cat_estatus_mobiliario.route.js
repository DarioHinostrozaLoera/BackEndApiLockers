import {Router} from 'express';
import * as catStaMob from '../controllers/cat_estatus_mobiliario.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, catStaMob.findAll);
router.get('/:idCategoryStatusMobiliario', token.authenticateToken, catStaMob.findOne);
router.post('/', token.authenticateToken, catStaMob.create);
router.put('/', token.authenticateToken, catStaMob.update);
router.delete('/:idCategoryStatusMobiliario', token.authenticateToken, catStaMob.delete);

export default router