import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { idDivision, idUser } = req.body;
    const createAdmin = await models.administrador.create({
        id_division: idDivision,
        id_user: idUser
    })
    .then(createAdmin => {
        res.status(201).json({
            data: createAdmin,
            accion: 1,
            message: 'Admin create'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the admin'
        })
    })
};

exports.findAll = async (req, res) => {
    const admins = await models.administrador.findAll({})
    .then(admins => {
        res.status(200).json({
            data: admins,
            message: 'Admins Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all admins'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idDivision } = req.params;
    const admin = await models.administrador.findAll({
        attributes: ['id_division', 'id_user'],
        where: {
            id_division: idDivision
        }
    })
        .then(admin => {
            res.status(200).json({
                data: admin,
                message: 'Admin found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing admin by id'
            })
        })
};

exports.update = async (req, res) => {
    const { idDivision, idUser } = req.body;
    const updateAdmin = await models.administrador.update(
        {
            id_division: idDivision,
            id_user: idUser
        },
        {
            where: {id_division: idDivision}
        })
        .then(updateAdmin => {
            res.status(200).json({
                data: updateAdmin,
                accion: 1,
                message: 'Admin Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating admin'
            })
        })
};

exports.delete = async (req, res) => {
    const { idDivision } = req.params;
    const deleteAdmin = await models.administrador.destroy(
        {
            where: {id_division: idDivision}
        })
        .then(deleteAdmin => {
            res.status(200).json({
                data: deleteAdmin,
                message: 'Admin deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: 'The admin could not be deleted'
            })
        })
};