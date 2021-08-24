import sequelize from '../database';
import initModels from '../models/init-models';
import {Sequelize} from "sequelize";

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { idGrupo, idGrado, idTurno, idPeriodo, numGrupo } = req.body;
    const createGrupoCurso = await models.grupo_en_curso.create({
        id_grupo: idGrupo,
        id_grado: idGrado,
        id_turno: idTurno,
        id_periodo: idPeriodo,
        num_grupo: numGrupo
    })
    .then(createGrupoCurso => {
        res.status(201).json({
            data: createGrupoCurso,
            accion: 1,
            message: 'School Period create'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to create the group in Progress'
        })
    })
};

exports.findAll = async (req, res) => {
    const groupsInProgress = await models.grupo_en_curso.findAll({})
    .then(groupsInProgress => {
        res.status(200).json({
            data: groupsInProgress,
            message: 'Groups in Progress Listed'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error to find all Groups in Progress'
        })
    })
};

exports.findOne = async (req, res) => {
    const { idGrupoEnCurso } = req.params;
    const GroupInProgress = await models.grupo_en_curso.findAll({
        attributes: ['id_grupo_curso', 'id_grupo', 'id_grado', 'id_turno', 'id_periodo', 'num_grupo'],
        where: {
            id_grupo_curso: idGrupoEnCurso
        }
    })
    .then(GroupInProgress => {
        res.status(200).json({
            data: GroupInProgress,
            message: 'Group In Progress found'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error bringing Group In Progress by id'
        })
    })
};

exports.update = async (req, res) => {
    const { idGrupoEnCurso, idGrupo, idGrado, idTurno, idPeriodo, numGrupo } = req.body;
    const updateGroupInProgress = await models.grupo_en_curso.update(
        {
            id_grupo: idGrupo,
            id_grado: idGrado,
            id_turno: idTurno,
            id_periodo: idPeriodo,
            num_grupo: numGrupo
        },
        {
            where: {id_grupo_curso: idGrupoEnCurso}
        })
        .then(updateGroupInProgress => {
            res.status(200).json({
                data: updateGroupInProgress,
                accion: 1,
                message: 'Group In Progress Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating Group In Progress'
            })
        })
};

exports.delete = async (req, res) => {
    const { idGrupoEnCurso } = req.params;
    const deleteGroupInProgress = await models.grupo_en_curso.destroy(
        {
            where: {id_grupo_curso: idGrupoEnCurso}
        }
    )
    .then(deleteGroupInProgress => {
        res.status(200).json({
            data:deleteGroupInProgress,
            message: 'Group In Progress deleted'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'The Group In Progress could not be deleted'
        })
    })
};

exports.traerIdGrupCursoPeriodActivId = async (req, res) => {
    const query = " SELECT MAX(grupo_en_curso.id_grupo_curso) as idPeriodo"
                    + " FROM grupo_en_curso, periodo_escolar"
                    + " where grupo_en_curso.id_grupo_curso = periodo_escolar.id_periodo"
                    + " and periodo_escolar.activo = 1"
    const datos = await sequelize.query(query,
         {
                replacements: {},
                type: sequelize.QueryTypes.SELECT
         })
        .then(datos => {
            res.status(200).json({
                data: datos,
                meesage: 'ultimo periodo activo obtenido :'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'No se pudo completar la operacion  '
            })
        })
}