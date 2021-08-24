import {Router} from 'express';
import * as historico from '../controllers/historico.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, historico.findAll);
router.get('/:idHistorico', token.authenticateToken, historico.findOne);
router.post('/', token.authenticateToken, historico.create);
router.put('/', token.authenticateToken, historico.update);
router.delete('/:idHistorico', token.authenticateToken, historico.delete);

export default router