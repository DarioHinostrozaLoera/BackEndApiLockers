import sequelize from '../database'
import initModels from '../models/init-models'

const models = initModels(sequelize)


// Create and save new Accion
exports.create = async (req, res) => {
    const {body: accion} = req;
    const createAccionId = await models.accion.create( accion )
    .then(createAccionId =>{
        res.status(201).json({
            data: createAccionId,
            message: 'Accion Creada' 
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al Crear la Accion"
            })
        })
    })
};

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    const accions = await models.accion.findAll({})
        .then(accions => {
            res.status(200).json({
                data: accions,
                message: 'Accions Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al Traer a la Accion"
            })
        })
};

// Find a single Accion with an id 
exports.findOne = async (req, res) => {
    const { id_accion } = req.params;
    const accion = await models.accion.findByPk( id_accion )
    .then(accion => {
        res.status(200).json({
            data: accion,
            meesage: 'Accion found'
        })
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error al traer la accion por id"
        })
    })
};

// Update an Accion 
exports.update = async (req, res) => {
    const { id_accion } = req.params;
//    const { body: accion } = req.body;
    const updateAccion = await models.accion.update( req.body, {
        where: { id_accion: id_accion }
    })
    .then(updateAccion => {
        res.json({
            data: updateAccion,
            message: 'Accion Actualizada'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error al actualizar la accion"
        })
    })
};

// Delete an Accion
exports.delete = async (req, res) => {
    const { id_accion } = req.params;
    const deleteAccion = await models.accion.destroy(
        {
            where: {id_accion: id_accion}
        }
    )
    .then(deleteAccion => {
        res.status(200).json({
            data: deleteAccion,
            message: 'Accion eliminada'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error al eliminar la accion'
        })
    })
};
