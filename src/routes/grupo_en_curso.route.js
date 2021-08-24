import {Router} from 'express';
import * as grupo_en_curso from '../controllers/grupo_en_curso.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, grupo_en_curso.findAll);
router.get('/periodoId/', token.authenticateToken, grupo_en_curso.traerIdGrupCursoPeriodActivId)
router.get('/:idGrupoEnCurso', token.authenticateToken, grupo_en_curso.findOne);
router.post('/', token.authenticateToken, grupo_en_curso.create);
router.put('/', token.authenticateToken, grupo_en_curso.update);
router.delete('/:idGrupoEnCurso', token.authenticateToken, grupo_en_curso.delete);

export default router