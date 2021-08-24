import {Router} from 'express'
import * as user from '../controllers/user.controller'
import * as token from '../middlewares/token.middleware'

const router = Router() 

router.get('/administradores/', token.authenticateToken, user.administradores)
router.post('/administradores/', token.authenticateToken, user.createAdmin)
router.delete('/administradores/:idUser', token.authenticateToken, user.deleteAdmin)
router.get('/administradores/:idUser', token.authenticateToken, user.findOne)
router.put('/administradores/', token.authenticateToken, user.updateAdmin)

router.get('/alumno/', token.authenticateToken, user.students)
router.get('/alumnoId/', token.authenticateToken, user.traerIdAluInsertado)
router.post('/alumno/', token.authenticateToken, user.createStudent)
router.delete('/alumno/:idUser', token.authenticateToken, user.deleteStudent)
router.get('/alumno/:idUser', token.authenticateToken, user.findOneStudent)
router.put('/alumno/', token.authenticateToken, user.updateSudent)

router.get('/', token.authenticateToken, user.findAll)
router.get('/select/:idGrupo', token.authenticateToken, user.llenarSelectUser);
router.get('/:idUser', token.authenticateToken, user.findOne)
router.post('/', token.authenticateToken, user.createUser)
router.put('/', token.authenticateToken, user.update)
router.delete('/:idUser', token.authenticateToken, user.delete)

router.put('/updatePassword', token.authenticateToken, user.updatePassword)



export default router