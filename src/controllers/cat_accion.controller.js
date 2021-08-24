import sequelize from '../database'
import initModels from '../models/init-models'

const models = initModels(sequelize)

// Create and save new Accion
exports.create = async (req, res) => {
    const { categoryAccion } = req.body;
    const createCatAccion = await models.cat_accion.create({
        desc_accion: categoryAccion
    })
        .then(createCatAccion => {
            res.status(201).json({
                data: createCatAccion,
                accion: 1,
                message: 'Category Accion Create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to create Category Accion "
            })
        })
}; 

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    const catAccions = await models.cat_accion.findAll({})
        .then(catAccions => {
            res.status(200).json({
                data: catAccions,
                message: 'Categorie Accions Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to find all Category Accions"
            })
        })
};

// Find a single Accion with an id 
exports.findOne = async (req, res) => {
    const { idCategoryAccion } = req.params;
    const catAccion = await models.cat_accion.findAll({
        attributes: ['id_accion', 'desc_accion'],
        where: {
            id_accion: idCategoryAccion
        }
    })
        .then(catAccion => {
            res.status(200).json({
                data: catAccion,
                meesage: 'Accion found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error bringing accion by id"
            })
        })
};

// Update an Accion 
exports.update = async (req, res) => {
    const { idCategoryAccion, categoryAccion} = req.body;
    const updateCatAccion = await models.cat_accion.update(
        {
            desc_accion: categoryAccion
        }, {
        where: { id_accion: idCategoryAccion }
    })
        .then(updateCatAccion => {
            res.status(200).json({
                data: updateCatAccion,
                accion: 1,
                message: 'Accion Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Accion"
            })
        })
};

// Delete an Accion
exports.delete = async (req, res) => {
    const { idCategoryAccion } = req.params;
    const deleteCatAccion = await models.cat_accion.destroy(
        {
            where: { id_accion: idCategoryAccion }
        }
    )
        .then(deleteCatAccion => {
            res.status(200).json({
                data: deleteCatAccion,
                message: 'Accion deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The Accion could not be deleted'
            })
        })
};
