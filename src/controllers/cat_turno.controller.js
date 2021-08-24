import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    //const { body: catTurn } = req;
    const createCatTurn = await models.cat_turno.create({
        desc_turno: req.body.categoryTurno,
        inicial: req.body.inicial
    })
        .then(createCatTurn => {
            res.status(201).json({
                data: createCatTurn,
                accion: 1,
                message: 'Category Turn created'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Category Turn'
            })
        })
};

exports.findAll = async (req, res) => {
    const catTurns = await models.cat_turno.findAll({})
        .then(catTurns => {
            res.status(200).json({
                data: catTurns,
                message: 'Categories Turns Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Categories Turns'
            })
        })
};

exports.findOne = async (req, res) => {
    const { catTurnId } = req.params;
    //const catTurn = await models.cat_turno.findByPk(catTurnId)
    const catTurn = await models.cat_turno.findAll({
        attributes: ['id_turno', 'desc_turno', 'inicial'],
        where: {
            id_turno: req.params.idCategoryTurno
        }
    })
        .then(catTurn => {
            res.status(200).json({
                data: catTurn,
                message: 'Category Turn founded by Id'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing Category Turn by id'
            })
        })
};

exports.update = async (req, res) => {

    const catTurnUpdated = await models.cat_turno.update(
        {
          desc_turno: req.body.categoryTurno,
          inicial: req.body.inicial
        },
        {
            where: {id_turno: req.body.idCategoryTurno }
        })
        .then(catTurnUpdated => {
            res.status(200).json({
                data: catTurnUpdated,
                accion: 1,
                message: 'Category Turn Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Category Turn'
            })
        })
};

exports.delete = async (req, res) => {
    const { idCategoryTurno } = req.params;
    const catTurnDelete = await models.cat_turno.destroy(
        {
            where: { id_turno: idCategoryTurno }
        }
    )
        .then(catTurnDelete => {
            res.status(200).json({
                data: catTurnDelete,
                message: 'Category Turn deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The Category Turn could not be deleted'
            })
        })
};