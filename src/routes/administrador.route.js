import {Router} from 'express';
import * as administrador from '../controllers/administrador.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, administrador.findAll);
router.get('/:idDivision', token.authenticateToken, administrador.findOne);
router.post('/', token.authenticateToken, administrador.create);
router.put('/', token.authenticateToken, administrador.update);
router.delete('/:idDivision', token.authenticateToken, administrador.delete);

export default router