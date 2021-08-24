import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { idUser, idComunicado, leido } = req.body;
    const createComAlu = await models.comunicado_alumnos.create({
            id_user: idUser,
            id_comunicado: idComunicado,
            leido: leido
        })
        .then(createComAlu => {
            res.status(201).json({
                data: createComAlu,
                accion: 1,
                message: 'Student Release create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Student Release'
            })
        })
};

exports.findAll = async (req, res) => {
    const comAlus = await models.comunicado_alumnos.findAll({})
    .then(comAlus => {
        res.status(200).json({
            data: comAlus,
            message: 'Students Release Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all Student Release'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idUser } = req.params;
    const comAlus = await models.comunicado_alumnos.findAll({
        attributes: ['id_user', 'id_comunicado', 'leido'],
        where: {
            id_user: idUser
        }
    })
        .then(comAlus => {
            res.status(200).json({
                data: comAlus,
                message: 'Student Release found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing student release by id'
            })
        })
};

exports.update = async (req, res) => {
    const { idUser, idComunicado, leido } = req.params;
    const updateComAlu = await models.comunicado_alumnos.update(
        {
            id_user: idUser,
            id_comunicado: idComunicado,
            leido: leido
        },
        {
            where: {id_user: idUser}
        })
    .then(updateComAlu => {
        res.status(200).json({
            data: updateComAlu,
            accion: 1,
            message: 'Student Release Updated'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error updating Student Release'
        })
    })
};

exports.delete = async (req, res) => {
    const { idUser } = req.params;
    const deleteComAlu = await models.comunicado_alumnos.destroy(
        {
            where: {id_user: idUser}
        })
        .then(deleteComAlu => {
            res.status(200).json({
                data: deleteComAlu,
                message: 'Student Release deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The student release could not be deleted'
            })
        })
};