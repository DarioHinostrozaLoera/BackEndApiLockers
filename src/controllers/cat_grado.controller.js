import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

//Create and save new ' Category grade'
exports.create = async (req, res) => {
    const { categoryGrado, numPref } = req.body;
    const createCatGrado = await models.cat_grado.create({
        desc_grado: categoryGrado,
        num_pref: numPref
    })
        .then(createCatGrado => {
            res.status(201).json({
                data: createCatGrado,
                accion: 1,
                message: 'Category Grade Created'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Category Grade'
            })
        })
};

// Retrieve all category grade from the database
exports.findAll = async (req, res) => {
    const catGrades = await models.cat_grado.findAll({})
        .then(catGrades => {
            res.status(200).json({
                data: catGrades,
                message: 'Categories grade Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Categories Grades'
            })
        })
};

//// Find a single category grade with an id
exports.findOne = async (req, res) => {
    const { idCategoryGrado } = req.params;
    const catGrade = await models.cat_grado.findAll({
        attributes: ['id_grado', 'desc_grado', 'num_pref'],
        where: {
            id_grado: idCategoryGrado
        }
    })
        .then(catGrade => {
            res.status(200).json({
                data: catGrade,
                message: 'Category grade found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing Category Grade by id'
            })
        })
};

// Update an Category Grade
exports.update = async (req, res) => {
    const { idCategoryGrado, categoryGrado, numPref} = req.body;
    const catGradeUpdated = await models.cat_grado.update(
        {
            desc_grado: categoryGrado,
            num_pref: numPref
        },
        {
            where: { id_grado: idCategoryGrado }
        })
        .then(catGradeUpdated => {
            res.status(200).json({
                data: catGradeUpdated,
                accion: 1,
                message: 'Category Grade Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Category Grade'
            })
        })
};

// Delete an Category Grade
exports.delete = async (req, res) => {
    const { idCategoryGrado } = req.params;
    const catGradeDeleted = await models.cat_grado.destroy(
        {
            where: {id_grado: idCategoryGrado }
        })
            .then(catGradeDeleted => {
                res.status(200).json({
                    data: catGradeDeleted,
                    message: 'Category Grade deleted'
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'The Category Grade could not be deleted'
                })
            })
};