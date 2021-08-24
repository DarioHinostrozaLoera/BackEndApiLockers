import {Router} from 'express';
import * as comunicado_alu from '../controllers/comunicado_alumnos.controller';
import * as token from '../middlewares/token.middleware';
const router = Router();

router.get('/', token.authenticateToken, comunicado_alu.findAll);
router.get('/:idUser', token.authenticateToken, comunicado_alu.findOne);
router.post('/', token.authenticateToken, comunicado_alu.create);
router.put('/', token.authenticateToken, comunicado_alu.update);
router.delete('/:idUser', token.authenticateToken, comunicado_alu.delete);

export default router
