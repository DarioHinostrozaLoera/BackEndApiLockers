import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { idApertura, fechaHora, idGabeta, idPeriodo, idUser } = req.body;
    const createApertura = await models.apertura.create({
        id_apertura: idApertura,
        fecha_hora: fechaHora,
        id_gabeta: idGabeta,
        id_periodo: idPeriodo,
        id_user: idUser
    })
    .then(createApertura => {
        res.status(201).json({
            data: createApertura,
            accion: 1,
            message: 'Apertura Created'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the apertura in Progress'
        })
    })
};

exports.findAll = async (req, res) => {
    const aperturas = await models.apertura.findAll({})
    .then(aperturas => {
        res.status(200).json({
            data: aperturas,
            message: 'Aperturas Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all Aperturas'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idApertura } = req.params;
    const Apertura = await models.apertura.findAll({
        attributes: ['id_apertura', 'fecha_hora', 'id_gabeta', 'id_periodo', 'id_user'],
        where: {
            id_apertura: idApertura
        }
    })
    .then(Apertura => {
        res.status(200).json({
            data: Apertura,
            message: 'Apertura found'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error bringing Apertura by id'
        })
    })
};

exports.update = async (req, res) => {
    const { idApertura, fechaHora, idGabeta, idPeriodo, idUser } = req.body;
    const updateApertura = await models.apertura.update(
        {
            fecha_hora: fechaHora,
            id_gabeta: idGabeta,
            id_periodo: idPeriodo,
            id_user: idUser
        },
        {
            where: {id_apertura: idApertura}
        })
        .then(updateApertura => {
            res.status(200).json({
                data: updateApertura,
                accion: 1,
                message: 'Apertura Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Apertura'
            })
        })
};

exports.delete = async (req, res) => {
    const { idApertura } = req.params;
    const deleteApertura = await models.apertura.destroy(
        {
            where: {id_apertura: idApertura}
        }
    )
    .then(deleteApertura => {
        res.status(200).json({
            data:deleteApertura,
            message: 'Apertura Deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The Apertura could not be deleted'
        })
    })
};