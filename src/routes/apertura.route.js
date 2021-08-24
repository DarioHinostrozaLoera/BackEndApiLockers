import {Router} from 'express';
import * as apertura from '../controllers/apertura.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, apertura.findAll);
router.get('/:idApertura', token.authenticateToken, apertura.findOne);
router.post('/', token.authenticateToken, apertura.create);
router.put('/', token.authenticateToken, apertura.update);
router.delete('/:idApertura', token.authenticateToken, apertura.delete);

export default router