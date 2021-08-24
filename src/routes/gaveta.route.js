import {Router} from 'express'
import * as gaveta from '../controllers/gaveta.controller'
import * as token from '../middlewares/token.middleware'

const router = Router() 

router.get('/findByUsername/', token.authenticateToken, gaveta.findByUsername)
router.post('/abrir/', token.authenticateToken, gaveta.abrir)

router.get('/', token.authenticateToken, gaveta.findAll)
router.get('/:idGabeta', token.authenticateToken, gaveta.findOne)
router.post('/', token.authenticateToken, gaveta.create)
router.put('/', token.authenticateToken, gaveta.update)
router.delete('/:idGabeta', token.authenticateToken, gaveta.delete)






export default router