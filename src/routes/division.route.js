import {Router} from 'express';
import * as division from '../controllers/division.controller';
const router = Router();
import * as token from '../middlewares/token.middleware';

router.get('/', token.authenticateToken, division.findAll);
router.get('/select/:idUser', token.authenticateToken, division.llenarSelectDivision);
router.get('/:divisionId', token.authenticateToken, division.findOne);
router.post('/', token.authenticateToken, division.create);
router.put('/:divisionId', token.authenticateToken, division.update);
router.delete('/:divisionId', token.authenticateToken, division.delete);

export default router
