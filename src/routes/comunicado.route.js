import {Router} from 'express';
import * as comunicado from '../controllers/comunicado.controller';
const router = Router();

router.get('/', comunicado.findAll); //token.authenticateToken,
router.get('/:releaseId', comunicado.findOne); //token.authenticateToken,
router.post('/', comunicado.create); //token.authenticateToken,
router.put('/:releaseId', comunicado.update); //token.authenticateToken,
router.delete('/:releaseId', comunicado.delete); //token.authenticateToken,

export default router
