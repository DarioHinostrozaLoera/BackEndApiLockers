import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

//Create and save new 'cat_estatus_user'
exports.create = async (req, res) => {
    const { categoryStatusUser } = req.body;
    const createCeu = await models.cat_estatus_user.create({
        desc_estatus: categoryStatusUser
    })
        .then(createCeu => {
            res.status(201).json({
                data: createCeu,
                accion: 1,
                message: 'Category Status User create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Category Status User'
            })
        })
};

// Retrieve all CEU from the database
exports.findAll = async (req, res) => {
    const ceus = await models.cat_estatus_user.findAll({})
        .then(ceus => {
            res.status(200).json({
                data: ceus,
                message: 'Category Status User Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Category Status'
            })
        })
};

// Find a single ceu with an id
exports.findOne = async (req, res) => {
    const { idCategoryStatusUser } = req.params;
    const ceu = await models.cat_estatus_user.findAll({
        attributes: ['id_cat_estatus', 'desc_estatus'],
        where: {
            id_cat_estatus: idCategoryStatusUser
        }
    })
        .then(ceu => {
            res.status(200).json({
                data: ceu,
                message: 'Category Status User Found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing Category Status User by id'
            })
        })
};

// Update an Ceu
exports.update = async (req, res) => {
    const { idCategoryStatusUser, categoryStatusUser } = req.body;
    const updateCeu = await models.cat_estatus_user.update(
        {
            desc_estatus: categoryStatusUser
        },
        {
            where: { id_cat_estatus: idCategoryStatusUser }
        })
        .then(updateCeu => {
            res.status(200).json({
                data: updateCeu,
                accion: 1,
                message: 'Category Status User Updated',
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating ceu'
            })
        })
};

// Delete an Ceu
exports.delete = async (req, res) => {
    const { idCategoryStatusUser } = req.params;
    const deleteCeu = await models.cat_estatus_user.destroy(
        {
            where: { id_cat_estatus: idCategoryStatusUser }
        })
        .then(deleteCeu => {
            res.status(200).json({
                data: deleteCeu,
                message: 'Category Status User Deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The Category Status User could not be deleted'
            })
        })
};
