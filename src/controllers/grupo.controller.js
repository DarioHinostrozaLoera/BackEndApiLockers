import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

//Create and save new 'grupo'
exports.create = async (req, res) => {
    const { grupo, idDivision } = req.body;
    const createGroup = await models.grupo.create({
        desc_grupo: grupo,
        id_division: idDivision
    })
        .then(createGroup => {
            res.status(201).json({
                data: createGroup,
                accion: 1,
                message: 'Group create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the group'
            })
        })
};

exports.llenarSelectGrupo = async (req, res) => {
    const { idDivision } = req.params;
    const query = " select grupo.id_grupo, grupo.desc_grupo"
                    + " from grupo, division"
                    + " where division.id_division = grupo.id_division"
                    + " and division.id_division = :id_division"
    const datos = await sequelize.query(query,
         {
                replacements: {
                     id_division: idDivision
                },
                type: sequelize.QueryTypes.SELECT
         })
        .then(datos => {
            res.status(200).json({
                data: datos,
                meesage: 'Grupo por Id de Division Listada:'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'No se pudo completar la operacion D: '
            })
        })
}

// Retrieve all groups from the database
exports.findAll = async (req, res) => {
    const query = " select grupo.id_grupo, grupo.desc_grupo, division.desc_division"
                    + " from grupo"
                    + " left join division"
                    + " on division.id_division = grupo.id_division"
    const GroupsWhitDivisions = await sequelize.query(query, {
        replacements: {},
        type: sequelize.QueryTypes.SELECT
    })
        .then(GroupsWhitDivisions => {
            res.status(200).json({
                data: GroupsWhitDivisions,
                message: 'Groups whit Divisions Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all Groups Whit Divisions D:'
            })
        })
};

// Find a single group with an id
exports.findOne = async (req, res) => {
    const { idGrupo } = req.params;
    const group = await models.grupo.findAll({
        attributes: ['id_grupo', 'desc_grupo', 'id_division'],
        where: {
            id_grupo: idGrupo
        }
    })
            .then(group => {
            res.status(200).json({
                data: group,
                message: 'Group found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing group by id'
            })
        })
};

// Update a Group
exports.update = async (req, res) => {
    const { idGrupo, grupo, idDivision } = req.body;
    const updateGroup = await models.grupo.update(
        {
            desc_grupo: grupo,
            id_division: idDivision
        },
        {
            where: {id_grupo: idGrupo}
        })
        .then(updateGroup => {
            res.status(200).json({
                data: updateGroup,
                accion: 1,
                message: 'Group Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating group'
            })
        })
};

// Delete a Group
exports.delete = async (req, res) => {
    const { idGrupo } = req.params;
    const deleteGroup = await models.grupo.destroy(
        {
            where: { id_grupo: idGrupo }
        })
            .then(deleteGroup => {
                res.status(200).json({
                    data: deleteGroup,
                    message: 'Group deleted'
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'The group could not be deleted'
                })
            })
};
