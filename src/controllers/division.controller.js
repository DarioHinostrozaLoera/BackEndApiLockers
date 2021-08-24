import sequelize from '../database';
import initModels from '../models/init-models';
import {Sequelize} from "sequelize";

const models = initModels(sequelize);

exports.create = async (req, res) => {
    //const { body: division } = req;
    const createDivision = await models.division.create({
        desc_division: req.body.division,
    })
        .then(createDivision => {
            res.status(201).json({
                data: createDivision,
                message: 'Division created'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Division'
            })
        })
};

exports.llenarSelectDivision = async (req, res) => {
    const { idUser } = req.params;
    const query = " select division.id_division, division.desc_division"
                    + " from division, administrador, user"
                    + " where division.id_division = administrador.id_division"
                    + " and administrador.id_division = administrador.id_user"
                    + " and administrador.id_user = user.id_user"
                    + " and user.id_user = :id_user"
    const datos = await sequelize.query(query,
         {
                replacements: {
                     id_user: idUser
                },
                type: sequelize.QueryTypes.SELECT
         })
        .then(datos => {
            res.status(200).json({
                data: datos,
                meesage: 'Division por ID de usuario Listada:'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'No se pudo completar la operacion '
            })
        })
}

exports.findAll = async (req, res) => {
    const divisions = await models.division.findAll({})
        .then(divisions => {
            res.status(200).json({
                data: divisions,
                message: 'Divisions Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Divisions'
            })
        })
};

exports.findOne = async (req, res) => {
    const { divisionId } = req.params;                               //{ include: ["grupo"] }
    const division = await models.division.findAll({
        attributes: ['id_division', 'desc_division'],
        where: {
            id_division: divisionId
        }
    })
        .then(division => {
            res.status(200).json({
                data: division,
                message: 'Division found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: res.message || 'Error bringing Division by id'
            })
        })
};

exports.update = async (req, res) => {
    const { divisionId } = req.params;
    const divisionUpdated = await models.division.updated( divisionId )
        .then(divisionUpdated => {
            res.status(200).json({
                data: divisionUpdated,
                message: 'Division Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Division'
            })
        })
};

exports.delete = async (req, res) => {
    const { divisionId } = req.params;
    const divisionDeleted = await models.division.destroy( divisionId )
        .then(divisionId => {
            res.status(200).json({
                data: divisionDeleted,
                message: 'Category grade deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The division could not be deleted'
            })
        })
};