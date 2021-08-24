import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { fechaInicio, fechaFin, activo } = req.body;
    const createSchoPer = await models.periodo_escolar.create({
        f_inicio: fechaInicio,
        f_fin: fechaFin,
        activo: activo
    })
    .then(createSchoPer => {
        res.status(201).json({
            data: createSchoPer,
            accion: 1,
            message: 'School Period create'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the School Period'
        })
    })
};

exports.findAll = async (req, res) => {
    const schoPeriods = await models.periodo_escolar.findAll({})
    .then(schoPeriods => {
        res.status(200).json({
            data: schoPeriods,
            message: 'School Periods Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all School Periods'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idPeriodoEscolar } = req.params;
    const schoPeriod = await models.periodo_escolar.findAll({
        attributes: ['id_periodo', 'f_inicio', 'f_fin', 'activo'],
        where: {
            id_periodo: idPeriodoEscolar
        }
    })
    .then(schoPeriod => {
        res.status(200).json({
            data: schoPeriod,
            message: 'School Period found'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error bringing school period by id'
        })
    })
};

exports.update = async (req, res) => {
    const { idPeriodoEscolar, fechaInicio, fechaFin, activo } = req.body;
    const updateSchoPer = await models.periodo_escolar.update(
        {
            f_inicio: fechaInicio,
            f_fin: fechaFin,
            activo: activo
        },
        {
            where: {id_periodo: idPeriodoEscolar}
        })
        .then(updateSchoPer => {
            res.status(200).json({
                data: updateSchoPer,
                accion: 1,
                message: 'School Period Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating School Period'
            })
        })
};

exports.delete = async (req, res) => {
    const { idPeriodoEscolar } = req.params;
    const deleteSchoPer = await models.periodo_escolar.destroy(
        {
            where: {id_periodo: idPeriodoEscolar}
        })
    .then(deleteSchoPer => {
        res.status(200).json({
            data:deleteSchoPer,
            message: 'School Period deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The School Period could not be deleted'
        })
    })
};