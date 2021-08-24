import crypto from 'crypto'
import sequelize from '../database'
import initModels from '../models/init-models'

const models = initModels(sequelize)

function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}

function generaPassword() {
    const hoy = new Date()
    const password = "UTNLock".concat(hoy.getFullYear()).concat(hoy.getMonth()).concat(hoy.getDay()).concat(hoy.getHours()).concat(hoy.getMinutes()).concat(hoy.getMilliseconds()).concat(randomNumber(0, 100))
    return password
}

function generaSalt() {
    return "".concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9))
}

exports.administradores = async (req, res) => {

    await models.user.findAll({
        attributes: ['id_user', 'username', 'nombre', 'ap_paterno', 'ap_materno', 'id_rol', 'id_cat_estatus', 'num_empleado'],
        where: {
            id_user_superior: 1
        }
    }).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al traer a los usuarios"
        })
    })

};

exports.createAdmin = async (req, res) => {

    const password = generaPassword()
    const salt = generaSalt()

    const key = crypto.createHash('sha1').update(password + salt).digest('hex')

    const user = await models.user.create({
        username: req.body.usuario,
        password: key,
        salt: salt,
        usertoken_refresh: null,
        nombre: req.body.nombre,
        ap_paterno: req.body.apPaterno,
        ap_materno: req.body.apMaterno,
        id_cat_estatus: 2,
        id_rol: 2,
        matricula: null,
        num_empleado: req.body.numEmpleado,
        id_user_superior: 1

    }).catch(err => {
        return res.status(404).send({
            idError: 2,
            message: err.message || "error al crear usuario"
        }) 
    })

    if (user) {
        res.status(200).json({
            accion: 1,
            message: "Usuario creado"
        })
    } else {
        res.status(401).json({
            message: "Error al crear usuario"
        })
    }

};

exports.deleteAdmin = async (req, res) => {

    await models.user.destroy({
        where: {
            id_user: req.params.idUser
        }
    }).then(data => {


        res.status(200).json({
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al traer a los usuarios"
        })
    })

};

exports.updateAdmin = async (req, res) => {

    const userUpdate = await models.user.update(
        {
            nombre: req.body.nombre,
            ap_paterno: req.body.apPaterno,
            ap_materno: req.body.apMaterno,
            num_empleado: req.body.numEmpleado
        },
        {
            where: { id_user: req.body.idUser }
        })

    if (userUpdate.length === 1)
        return res.json({
            accion: 1,
            message: "cambio realizado correctamente"
        });

    return res.status(404).send({
        idError: 3,
        message: "error al actualizar"
    })

};

/**************Students */
exports.students = async (req, res) => {
    await models.user.findAll({
        attributes: ['id_user', 'username', 'nombre', 'ap_paterno', 'ap_materno', 'id_rol', 'id_cat_estatus', 'matricula'],
        where: {
            id_user_superior: 2
        }
    }).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al traer a los estudiantes"
        })
    })
};

exports.createStudent = async (req, res) => {

    const password = generaPassword()
    const salt = generaSalt()

    const key = crypto.createHash('sha1').update(password + salt).digest('hex')

    const user = await models.user.create({
        username: req.body.usuario,
        password: key,
        salt: salt,
        usertoken_refresh: null,
        nombre: req.body.nombre,
        ap_paterno: req.body.apPaterno,
        ap_materno: req.body.apMaterno,
        id_cat_estatus: 2,
        id_rol: 3,
        matricula: req.body.matricula,
        num_empleado: null,
        id_user_superior: 2

    }).catch(err => {
        return res.status(404).send({
            idError: 2,
            message: err.message || "error al crear el estudiante"
        })
    })

    if (user) {
        res.status(200).json({
            accion: 1,
            message: "Estudiante creado"
        })
    } else {
        res.status(401).json({
            message: "Error al crear Estudiante"
        })
    }

};

exports.deleteStudent = async (req, res) => {

    await models.user.destroy({
        where: {
            id_user: req.params.idUser
        }
    }).then(data => {


        res.status(200).json({
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al traer a los estudiantes"
        })
    })
};

exports.findOneStudent = async (req, res) => {

    await models.user.findAll({
        attributes: ['id_user', 'username', 'nombre', 'ap_paterno', 'ap_materno', 'id_rol', 'id_cat_estatus', 'matricula'],
        where: {
            id_user: req.params.idUser
        }
    })
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer a los estudiantes"
            })
        })
};

exports.updateSudent = async (req, res) => {

    const studentUpdate = await models.user.update(
        {
            nombre: req.body.nombre,
            ap_paterno: req.body.apPaterno,
            ap_materno: req.body.apMaterno,
            matricula: req.body.matricula
        },
        {
            where: { id_user: req.body.idUser }
        })

    if (studentUpdate.length === 1)
        return res.json({
            accion: 1,
            message: "cambio realizado correctamente"
        });

    return res.status(404).send({
        idError: 3,
        message: "error al actualizar"
    })

};

exports.traerIdAluInsertado = async (req, res) => {
    const query = " SELECT MAX(user.id_user) AS idUser"
                    + " FROM user"
    const datos = await sequelize.query(query,
         {
                replacements: {},
                type: sequelize.QueryTypes.SELECT
         })
        .then(datos => {
            res.status(200).json({
                data: datos,
                meesage: 'id alumno obtenido'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'No se pudo completar la operacion  '
            })
        })
}

/**************Users */

exports.createUser = async (req, res) => {

}

exports.llenarSelectUser = async (req, res) => {
    const { idGrupo } = req.params;
    const query = " select user.id_user, user.username, user.nombre, user.ap_paterno"
                    + " from user, alumnos, grupo_en_curso, grupo"
                    + " where user.id_user = alumnos.id_user"
                    + " and alumnos.id_grupo_curso = grupo_en_curso.id_grupo_curso"
                    + " and grupo_en_curso.id_grupo_curso = grupo.id_grupo"
                    + " and grupo.id_grupo = :id_grupo;"
    const datos = await sequelize.query(query,
         {
                replacements: {
                     id_grupo: idGrupo
                },
                type: sequelize.QueryTypes.SELECT
         })
        .then(datos => {
            res.status(200).json({
                data: datos,
                meesage: 'Usuarios por Id de Grupo Listados:'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'No se pudo completar la operacion D: '
            })
        })
}

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

    await models.user.findAll({})
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer a los usuarios"
            })
        })

};

// Find a single User with an id
exports.findOne = async (req, res) => {

    await models.user.findAll({
        attributes: ['id_user', 'username', 'nombre', 'ap_paterno', 'ap_materno', 'id_rol', 'id_cat_estatus', 'num_empleado'],
        where: {
            id_user: req.params.idUser
        }
    })
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer a los usuarios"
            })
        })
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const userToken = req.user
    console.log("**** update user ****", userToken)
    console.log("**** password user ****", req.body.password)

    const userFind = await models.user.findAll({ where: { username: userToken.username } })

    res.status(200)
};

// Update a User by the id in the request
exports.updatePassword = async (req, res) => {
    const userToken = req.user
    const users = await models.user.findAll({ where: { username: userToken.username } })

    if (users.length !== 1)
        return res.status(404).send({
            idError: 1,
            message: "error al actualizar la contraseña"
        })

    const userFind = users[0]
    var key = crypto.createHash('sha1').update(req.body.password + userFind.salt).digest('hex')

    const userUpdate = await models.user.update(
        {
            password: key
        },
        {
            where: { username: userFind.username }
        }
    ).catch(err => {
        return res.status(404).send({
            idError: 2,
            message: err.message || "error al actualizar la contraseña"
        })
    })

    if (userUpdate.length === 1)
        return res.json({
            accion: 1,
            message: "cambio realizado correctamente"
        });

    return res.status(404).send({
        idError: 3,
        message: "error al actualizar la contraseña"
    })
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

