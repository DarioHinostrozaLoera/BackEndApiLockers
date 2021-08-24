import crypto from 'crypto'
import * as jwt from '../middlewares/token.middleware'
import sequelize from '../database'
import initModels from '../models/init-models'

const models = initModels(sequelize)

// Login app movil and web
exports.login = async (req, res) => {

    console.log(req.body)
    const { username, password } = req.body

    console.log('username:', username)
    console.log('password:', password)

    if (username === undefined || password === undefined)
        return res.status(404).send({
            idError: 0,
            message: "usuario y/o password incorrecto"
        })

    const users = await models.user.findAll(
        {
            where: { username: username },
            raw: true
        }
    ).catch(err => {
        return res.status(404).send({
            idError: 1,
            message: err.message || "usuario y/o password incorrecto"
        })
    })

    if (users.length !== 1)
        return res.status(404).send({
            idError: 2,
            message: "usuario y/o password incorrecto"
        })

    const userFind = users[0]
    var key = crypto.createHash('sha1').update(password + userFind.salt).digest('hex')

    if (userFind.password !== key)
        return res.status(404).send({
            idError: 3,
            message: "usuario y/o password incorrecto"
        })

    let valoresToken = null

    //validar si es alumno 
    if (userFind.id_rol === 3) {
        //si es alumno validar si esta en periodo activo

        const query = "select periodo_escolar.id_periodo"
            + " from alumnos, user, grupo_en_curso, periodo_escolar"
            + " where alumnos.id_user = user.id_user"
            + " and alumnos.id_grupo_curso = grupo_en_curso.id_grupo_curso"
            + " and grupo_en_curso.id_periodo = periodo_escolar.id_periodo"
            + " and periodo_escolar.activo = 1"
            + " and user.username = :username"

        const data = await sequelize.query(query,
            {
                replacements: {
                    username: username
                },
                type: sequelize.QueryTypes.SELECT
            }
        ).catch(err => {
            return res.status(500).send({
                message: err.message || "Usuario y/o password incorrecto"
            })
        })

        console.log(data)

        if (data.length === 1)
            valoresToken = {
                username: username,
                idPeriodo: data[0].id_periodo,
                rol: userFind.id_rol
            }
        else
            return res.status(404).send({
                idError: 4,
                message: "Usuario y/o password incorrecto"
            })
    }else{
        //traer el ultimo periodo activo
        const query = "select periodo_escolar.id_periodo"
            + " from periodo_escolar"
            + " where periodo_escolar.activo = 1"

        const data = await sequelize.query(query,
            {
                type: sequelize.QueryTypes.SELECT
            }
        ).catch(err => {
            return res.status(500).send({
                message: err.message || "Usuario y/o password incorrecto"
            })
        })

        if (data.length === 1)
            valoresToken = {
                username: username,
                idPeriodo: data[0].id_periodo,
                rol: userFind.id_rol
            }
        else
            return res.status(404).send({
                idError: 4,
                message: "Usuario y/o password incorrecto"
            })
    }

    

    const accessToken = jwt.generateAccessToken(valoresToken);
    const refreshToken = jwt.generateTokenRefresh(valoresToken);

    const userUpdate = await models.user.update(
        {
            token_refresh: refreshToken
        },
        {
            where: { username: username }
        }
    ).catch(err => {
        return res.status(404).send({
            idError: 5,
            message: err.message || "Usuario y/o password incorrecto"
        })
    })

    if (userUpdate.length === 1)
        return res.json({
            accessToken,
            refreshToken
        });

    return res.status(404).send({
        idError: 6,
        message: "Usuario y/o password incorrecto"
    })
};

// Actualiza el token access y crea nuevo token_refresh
exports.tRefresh = async (req, res) => {

    //obtenemos el refreshToken
    const { token_refresh } = req.body

    //validar token estructura y firma
    jwt.authenticateTokenRefresh(req, token_refresh.trim())

    if (typeof req.userInToken === 'undefined')
        return res.status(404).send({
            idError: 1,
            message: "Token invalid"
        })

    const username = req.userInToken.username

    //vamos por el token de la base
    const tokenRefreshUser = await models.user.findAll({
        attributes: ['token_refresh', 'id_rol'],
        where: { username: username },
        raw: true
    }
    ).catch(err => {
        return res.status(404).send({
            idError: 2,
            message: err.message || "token invalid"
        })
    })

    console.log("***tokenUserFind:", tokenRefreshUser)

    if (tokenRefreshUser.length !== 1)
        return res.status(404).send({
            idError: 3,
            message: "token invalid"
        })

    //si token refresh es null en base de datos no se refresca el token
    if (tokenRefreshUser[0].token_refresh === null)
        return res.status(401).send({
            idError: 4,
            message: "token invalid"
        })

    //si el token_refresh enviado no es el mismo que el de la base marcarlo como invalido
    if (tokenRefreshUser[0].token_refresh !== token_refresh)
        return res.status(401).send({
            idError: 5,
            message: "token invalid"
        })

    let valoresToken = { username: username, rol: tokenRefreshUser[0].id_rol }

    //validar si es alumno o administrativo 
    if (tokenRefreshUser[0].id_rol === 2) {
        //si es alumno validar si esta en periodo activo

        const query = "select periodo_escolar.id_periodo"
            + " from alumnos, user, grupo_en_curso, periodo_escolar"
            + " where alumnos.id_user = user.id_user"
            + " and alumnos.id_grupo_curso = grupo_en_curso.id_grupo_curso"
            + " and grupo_en_curso.id_periodo = periodo_escolar.id_periodo"
            + " and periodo_escolar.activo = 1"
            + " and user.username = :username"

        const data = await sequelize.query(query,
            {
                replacements: {
                    username: username
                },
                type: sequelize.QueryTypes.SELECT
            }
        ).catch(err => {
            return res.status(500).send({
                message: err.message || "Token invalido"
            })
        })

        console.log(data)
        console.log(data.length)

        if (data.length === 1)
            valoresToken = {
                username: username,
                idPeriodo: data[0].id_periodo,
                rol: tokenRefreshUser[0].id_rol
            }
        else
            return res.status(404).send({
                idError: 6,
                message: "Token invalido"
            })
    }

    //todo esta bien, se crea nuevos accessToken y refreshToken
    const accessToken = jwt.generateAccessToken(valoresToken);
    const refreshToken = jwt.generateTokenRefresh(valoresToken);

    const userUpdate = await models.user.update(
        {
            token_refresh: refreshToken
        },
        {
            where: { username: username }
        }
    ).catch(err => {
        return res.status(401).send({
            idError: 7,
            message: err.message || "token invalid"
        })
    })

    if (userUpdate.length === 1)
        return res.json({
            accessToken,
            refreshToken
        });

    return res.status(401).send({
        idError: 8,
        message: "token invalid"
    })
};

// Eliminar token_refresh
exports.logout = async (req, res) => {

    const userToken = req.user

    const userUpdate = await models.user.update(
        {
            token_refresh: null
        },
        {
            where: { username: userToken.username }
        }
    ).catch(err => {
        return res.status(404).send({
            idError: 4,
            message: err.message || "usuario y/o password incorrecto"
        })
    })

    if (userUpdate.length === 1)
        return res.status(200).send({
            accion: 1
        })

    return res.status(404).send({
        idError: 5,
        message: "usuario y/o password incorrecto"
    })
};



