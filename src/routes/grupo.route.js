import {Router} from 'express';
import * as group from '../controllers/grupo.controller';
import * as token from '../middlewares/token.middleware';
const router = Router();

router.get('/', token.authenticateToken, group.findAll);
router.get('/select/:idDivision', token.authenticateToken, group.llenarSelectGrupo);
router.get('/:idGrupo', token.authenticateToken, group.findOne);
router.post('/', token.authenticateToken, group.create);
router.put('/', token.authenticateToken, group.update);
router.delete('/:idGrupo', token.authenticateToken, group.delete);

export default router