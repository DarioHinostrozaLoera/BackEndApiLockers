import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { idGrupoCurso, idUser, idGabeta } = req.body;
    const createStudent = await models.alumnos.create({
         attributes: ['id_grupo_curso', 'id_user', 'id_gabeta'],
        id_grupo_curso: idGrupoCurso,
        id_user: idUser,
        id_gabeta: idGabeta
    })
        .then(createStudent => {
            res.status(201).json({
                data: createStudent,
                accion: 1,
                message: 'Student create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to create the Student'
            })
        })
};

exports.findAll = async (req, res) => {
    const students = await models.alumnos.findAll({
        attributes: ['id_grupo_curso', 'id_user', 'id_gabeta']
    })
    .then(students => {
        res.status(200).json({
            data: students,
            message: 'Students Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all Students'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idGrupoCurso } = req.params;
    const student = await models.alumnos.findAll({
        attributes: ['id_grupo_curso', 'id_user', 'id_gabeta'],
        where: {
            id_grupo_curso: idGrupoCurso
        }
    })
        .then(student => {
            res.status(200).json({
                data: student,
                message: 'Student found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing student by id'
            })
        })
};

exports.update = async (req, res) => {
    const { idGrupoCurso, idUser, idGabeta } = req.body;
    const updateStudent = await models.alumnos.update(
        {
            id_grupo_curso: idGrupoCurso,
            id_user: idUser,
            id_gabeta: idGabeta
        },
        {
            where: {id_grupo_curso: idGrupoCurso}
        })
        .then(updateStudent => {
            res.status(200).json({
                data: updateStudent,
                accion: 1,
                message: 'Student Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Student'
            })
        })
};

exports.delete = async (req, res) => {
    const { idGrupoCurso } = req.params;
    const deleteStudent = await models.alumnos.destroy(
        {
            where: {id_grupo_curso: idGrupoCurso}
        })
        .then(deleteStudent => {
            res.status(200).json({
                data: deleteStudent,
                message: 'Student deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'The student could not be deleted'
            })
        })
};

