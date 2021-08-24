import {Router} from 'express';
import * as alumnos from '../controllers/alumnos.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, alumnos.findAll);//
router.get('/:idGrupoCurso', token.authenticateToken, alumnos.findOne);
router.post('/', token.authenticateToken, alumnos.create);
router.put('/', token.authenticateToken, alumnos.update);
router.delete('/:idGrupoCurso', token.authenticateToken, alumnos.delete);

export default router
