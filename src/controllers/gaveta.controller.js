import sequelize from '../database'
import initModels from '../models/init-models'
import mqttClient from '../mqtt/mqttConect'

const models = initModels(sequelize)

// Create and Save a new gabeta
exports.create = async (req, res) => {
    const { idLocker, idEstatusMobiliario, letra } = req.body;
    const createGabeta = await models.gabeta.create({
        id_locker: idLocker,
        id_estatus_mobiliario: idEstatusMobiliario,
        letra: letra
    })
    .then(createGabeta => {
        res.status(201).json({
            data: createGabeta,
            accion: 1,
            message: 'Gabeta Created'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the Gabeta in Progress'
        })
    })
};

// Retrieve all gabetas from the database.
exports.findAll = async (req, res) => {
    await models.gabeta.findAll({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer las gabetas"
            })
        })

};

// Find a single gabeta with an id
exports.findOne = async (req, res) => {

    await models.gabeta.findByPk(req.params.idgabeta)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer la gabeta"
            })
        })
};

// Update a gabeta by the id in the request
exports.update = async (req, res) => {
    const { idGabeta,idLocker, idEstatusMobiliario, letra } = req.body;
    const updateGabeta = await models.historico.update(
        {
            id_gabeta: idGabeta,
            id_locker: idLocker,
            id_estatus_mobiliario: idEstatusMobiliario,
            letra: letra
        },
        {
            where: {id_gabeta: idGabeta}
        })
        .then(updateGabeta => {
            res.status(200).json({
                data: updateGabeta,
                accion: 1,
                message: 'Gabeta Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Gabeta'
            })
        })
};

// Delete a gabeta with the specified id in the request
exports.delete = async (req, res) => {
     const { idGabeta } = req.params;
    const deleteGabeta = await models.historico.destroy(
        {
            where: {id_gabeta: idGabeta}
        }
    )
    .then(deleteGabeta => {
        res.status(200).json({
            data:deleteGabeta,
            message: 'Gabeta Deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The gabeta could not be deleted'
        })
    })
};

// Retrieve all gabetas from the database.
exports.findByUsername = async (req, res) => {

    console.log("**** En funcion findByUsername ***")

    const query = "select locker.num_local, gabeta.letra"
        + " from locker, gabeta, alumnos, user, grupo_en_curso, periodo_escolar"
        + " where locker.id_locker = gabeta.id_locker"
        + " and gabeta.id_gabeta = alumnos.id_gabeta"
        + " and alumnos.id_user = user.id_user"
        + " and alumnos.id_grupo_curso = grupo_en_curso.id_grupo_curso"
        + " and grupo_en_curso.id_periodo = periodo_escolar.id_periodo"
        + " and periodo_escolar.activo = 1"
        + " and user.username = :username"
        + " and periodo_escolar.id_periodo = :idPeriodo"

    sequelize.query(query,
        {
            replacements: {
                username: req.user.username,
                idPeriodo: req.user.idPeriodo
            },
            type: sequelize.QueryTypes.SELECT
        }
    ).then(function (data) {
        console.log(data)
        if (data.length === 1)
            res.json(data[0])
        else
            res.json({})
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al traer las gabetas"
            })
        })

};


// Abrir gabeta
exports.abrir = async (req, res) => {

    //Traer datos de la gabeta
    const query = "select locker.num_serie, gabeta.letra"
        + " from locker, gabeta, alumnos, user, grupo_en_curso, periodo_escolar"
        + " where locker.id_locker = gabeta.id_locker"
        + " and gabeta.id_gabeta = alumnos.id_gabeta"
        + " and alumnos.id_user = user.id_user"
        + " and alumnos.id_grupo_curso = grupo_en_curso.id_grupo_curso"
        + " and grupo_en_curso.id_periodo = periodo_escolar.id_periodo"
        + " and periodo_escolar.activo = 1"
        + " and user.username = :username"
        + " and periodo_escolar.id_periodo = :idPeriodo"

    const data = await sequelize.query(query,
        {
            replacements: {
                username: req.user.username,
                idPeriodo: req.user.idPeriodo
            },
            type: sequelize.QueryTypes.SELECT
        }
    ).catch(err => {
        return res.status(500).send({
            message: err.message || "Error al abrir la gabeta"
        })
    })

    console.log(data)

    if (data.length === 1) {

        //MQTT
        if (mqttClient) {
            if (mqttClient.isConnected) {

                const menssage = {
                        "numserie":data[0].num_serie,
                        "accion":1,
                        "gabeta":data[0].letra
                    }

                mqttClient.sendMessage(JSON.stringify(menssage));

                res.status(200).send({
                    message: "Accion enviada correctamente"
                })
            } else {
                res.status(500).send({
                    idError: 1,
                    message: "Error al mandar la acción"
                })
            }
        } else {
            res.status(500).send({
                idError: 2,
                message: "Error al mandar la acción"
            })
        }
    }else{
        res.status(500).send({
            idError: 2,
            message: "error al mandar la acción"
        })
    }

};