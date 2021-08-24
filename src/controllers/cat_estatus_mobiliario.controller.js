import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { categoryStatusMobiliario } = req.body;
    const createCatStaMob = await models.cat_estatus_mobiliario.create({
        desc_estatus_mobiliario: categoryStatusMobiliario
    })
        .then(createCatStaMob => {
            res.status(201).json({
                data: createCatStaMob,
                accion: 1,
                message: 'Category Status Furniture created'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Category Status Furniture'
            })
        })
};

exports.findAll = async (req, res) => {
    const catStaMobs = await models.cat_estatus_mobiliario.findAll({})
        .then(catStaMobs => {
            res.status(200).json({
                data: catStaMobs,
                message: 'Category Status Furniture Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Category Status Furniture'
            })
        })
};

exports.findOne = async (req, res) => {
    const { idCategoryStatusMobiliario } = req.params;
    const catStaMob = await models.cat_estatus_mobiliario.findAll({
        attributes: ['id_estatus_mobiliario', 'desc_estatus_mobiliario'],
        where: {
            id_estatus_mobiliario: idCategoryStatusMobiliario
        }
    })
        .then(catStaMob => {
            res.status(200).json({
                data: catStaMob,
                message: 'Category Status Furniture found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing Category Status Furniture by id'
            })
        })
};

exports.update = async (req, res) => {
    const { idCategoryStatusMobiliario, categoryStatusMobiliario } = req.body;
    const catStaMobUpdated = await models.cat_estatus_mobiliario.update(
        {
            desc_estatus_mobiliario: categoryStatusMobiliario
        },
        {
            where: {id_estatus_mobiliario: idCategoryStatusMobiliario}
        })
        .then(catStaMobUpdated => {
            res.status(200).json({
                data: catStaMobUpdated,
                accion: 1,
                message: 'Category Status Furniture Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Category Status Furniture'
            })
        })
};

exports.delete = async (req, res) => {
    const { idCategoryStatusMobiliario } = req.params;
    const catStaMobDeleted = await models.cat_estatus_mobiliario.destroy(
        {
            where: {id_estatus_mobiliario: idCategoryStatusMobiliario}
        }
    )
    .then(catStaMobDeleted => {
        res.status(200).json({
            data: catStaMobDeleted,
            message: 'Category Status Furniture deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The Category Status Furniture could not be deleted'
        })
    })
};