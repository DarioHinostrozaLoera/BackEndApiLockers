import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
   // const { categoryRol } = req.body;
    const createCatRol = await models.cat_rol.create({
        desc_rol: req.body.categoryRol
    })
        .then(createCatRol => {
            res.status(201).json({
                data: createCatRol,
                accion: 1,
                message: 'Category Rol created'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Category Rol'
            })
        })
};

exports.findAll = async (req, res) => {
    const catRoles = await models.cat_rol.findAll({})
        .then(catRoles => {
            res.status(200).json({
                data: catRoles,
                message: 'Categories Roles Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Categories Roles'
            })
        })
};

exports.findOne = async (req, res) => {

      await models.cat_rol.findAll({
        attributes: ['id_rol', 'desc_rol'],
           where: {
            id_rol: req.params.idCategoryRol
          }
      })
        .then(data => {
            res.status(200).json({
                data: data,
                message: 'Category Rol founded by Id'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing Category Grade by id'
            })
        })
};

exports.update = async (req, res) => {

    const catRolUpdated = await models.cat_rol.update(
        {
          desc_rol: req.body.categoryRol
        },
        {
            where: {id_rol: req.body.idCategoryRol}
        })
        .then(catRolUpdated => {
            res.status(200).json({
                data: catRolUpdated,
                accion: 1,
                message: 'Category Rol Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Category Rol'
            })
        })
};

exports.delete = async (req, res) => {
    const { idCategoryRol } = req.params;
    const catRolDeleted = await models.cat_rol.destroy(
        {
            where: {id_rol: idCategoryRol}
        })
    .then(catRolDeleted => {
        res.status(200).json({
            data: catRolDeleted,
            message: 'Category grade deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The Category Rol could not be deleted'
        })
    })
};