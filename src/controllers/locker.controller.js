import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);


// Retrieve all groups from the database
exports.findAll = async (req, res) => {
    
    const lockers = await models.locker.findAll({
        relations: ['locker']
    })
        .then(locker => {
            res.status(200).json({
                data: locker,
                message: 'Groups Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all groups'
            })
        })
};