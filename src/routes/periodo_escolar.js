import {Router} from 'express';
import * as periodo_escolar from '../controllers/periodo_escolar.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, periodo_escolar.findAll);
router.get('/:idPeriodoEscolar', token.authenticateToken, periodo_escolar.findOne);
router.post('/', token.authenticateToken, periodo_escolar.create);
router.put('/', token.authenticateToken, periodo_escolar.update);
router.delete('/:idPeriodoEscolar',token.authenticateToken,  periodo_escolar.delete);

export default router
