import Sequelize from 'sequelize'
import configDB from './configDB'

const sequelize = new Sequelize(configDB.dbSchema, configDB.dbUser, configDB.dbPassword, {
    host: configDB.dbHost,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })

export default sequelize