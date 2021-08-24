import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { fecha, idAccion, historico, idUser } = req.body;
    const createHistorico = await models.historico.create({
        fecha: fecha,
        id_accion: idAccion,
        desc_evento: historico,
        id_user: idUser
    })
    .then(createHistorico => {
        res.status(201).json({
            data: createHistorico,
            accion: 1,
            message: 'Historico Created'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the apertura in Progress'
        })
    })
};

exports.findAll = async (req, res) => {
    const historico = await models.historico.findAll({})
    .then(historico => {
        res.status(200).json({
            data: historico,
            message: 'Historico Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all Historicos'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idHistorico } = req.params;
    const Historico = await models.historico.findAll({
        attributes: ['id_historico', 'fecha', 'id_accion', 'desc_evento', 'id_user'],
        where: {
            id_historico: idHistorico
        }
    })
    .then(Historico => {
        res.status(200).json({
            data: Historico,
            message: 'Historico found'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error bringing Historico by id'
        })
    })
};

exports.update = async (req, res) => {
    const { idHistorico ,fecha, idAccion, historico, idUser } = req.body;
    const updateHistorico = await models.historico.update(
        {
            fecha: fecha,
            id_accion: idAccion,
            desc_evento: historico,
            id_user: idUser
        },
        {
            where: {id_historico: idHistorico}
        })
        .then(updateHistorico => {
            res.status(200).json({
                data: updateHistorico,
                accion: 1,
                message: 'Historico Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Historico'
            })
        })
};

exports.delete = async (req, res) => {
    const { idHistorico } = req.params;
    const deleteHistorico = await models.historico.destroy(
        {
            where: {id_historico: idHistorico}
        }
    )
    .then(deleteHistorico => {
        res.status(200).json({
            data:deleteHistorico,
            message: 'Historico Deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The historico could not be deleted'
        })
    })
};