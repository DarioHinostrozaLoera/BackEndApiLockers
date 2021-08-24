import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'

//import mqttClient from './mqtt/mqttConect'

import administradorRoute from './routes/administrador.route'
import alumnosRoute from './routes/alumnos.route'
import aperturaRoute from './routes/apertura.route'
import cat_accionRouter from './routes/cat_accion.route'
import catStaMobRoute from './routes/cat_estatus_mobiliario.route'
import ceuRouter from './routes/cat_estatus_user.router'
import cat_gradoRoute from './routes/cat_grado.route'
import cat_rolRoute from './routes/cat_rol.route'
import cat_turnoRoute from './routes/cat_turno.route'
import comunicadoRoute from './routes/comunicado.route'
import comunicado_aluRoute from './routes/comunicado_alumnos.route'
import divisionRoute from './routes/division.route'
//import gavetaRouter from './routes/gaveta.route'
import grupoRoute from './routes/grupo.route'
import grupo_en_curso from './routes/grupo_en_curso.route'
import historicoRoute from './routes/historico.route'
import lockerRouter from './routes/locker.route'
import periodo_escolar from "./routes/periodo_escolar";
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'

const app = express()

app.set('port', config.listenPort)

app.use(cors(config.corsOptions))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/admin', administradorRoute)
app.use('/api/students', alumnosRoute)
app.use('/api/apertura', aperturaRoute)
app.use('/api/accion', cat_accionRouter)
app.use('/api/cat-sta-mob', catStaMobRoute)
app.use('/api/ceu', ceuRouter) // f
app.use('/api/cat-grado', cat_gradoRoute)
app.use('/api/cat-rol', cat_rolRoute)
app.use('/api/cat-turn', cat_turnoRoute)
app.use('/api/studen-release', comunicado_aluRoute)
app.use('/api/release', comunicadoRoute)
app.use('/api/division', divisionRoute) //Falta corregir AU
//app.use('/api/gabeta', gavetaRouter)
app.use('/api/grupo', grupoRoute)
app.use('/api/grupo-en-curso', grupo_en_curso)
app.use('/api/historico', historicoRoute)
app.use('/api/locker', lockerRouter)
app.use('/api/periodo-escolar', periodo_escolar)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

export default app
