import {Router} from 'express'
import * as locker from '../controllers/locker.controller';
const router = Router();

router.get('/', locker.findAll); //token.authenticateToken,

export default router