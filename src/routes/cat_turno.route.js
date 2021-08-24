import {Router} from 'express';
import * as cat_turno from '../controllers/cat_turno.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, cat_turno.findAll);
router.get('/:idCategoryTurno', token.authenticateToken, cat_turno.findOne);
router.post('/', token.authenticateToken, cat_turno.create);
router.put('/', token.authenticateToken, cat_turno.update);
router.delete('/:idCategoryTurno', token.authenticateToken, cat_turno.delete);

export default router