import sequelize from '../database';
import initModels from '../models/init-models';

const models = initModels(sequelize);

exports.create = async (req, res) => {
    const { body: release } = req;
    const createRelease = await models.comunicado.create(release, 
        {relations: ['administrador','periodo_escolar']}
        )
        .then(createRelease => {
            res.status(201).json({
                data: createRelease,
                message: 'Release create'
            })
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || 'Error to create the admin'
            })
        })
};

exports.findAll = async (req, res) => {
    const releases = await models.comunicado.findAll(
        {
            relations: ['administrador','periodo_escolar']
        })
        .then(releases => {
            res.status(200).json({
                data: releases,
                message: 'Releases Listed'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error to find all releases'
            })
        })
};

exports.findOne = async (req, res) => {
    const { releaseId } = req.params;
    const release = await models.comunicado.findByPk(releaseId, 
        {
            relations: ['administrador','periodo_escolar']
        })
        .then(release => {
            res.status(200).json({
                data: release,
                message: 'Release found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error bringing release by id'
            })
        })
};

exports.update = async (req, res) => {
    const { releaseId } = req.params;
    const updateRelease = await models.comunicado.update(req.body, 
        {
            where: {releaseId: releaseId}
        },
        {
            relations: ['administrador','periodo_escolar']
        }
        )
        .then(updateRelease => {
            res.status(200).json({
                data: updateRelease,
                message: 'Release Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error updating admin'
            })
        })
};

exports.delete = async (req, res) => {
    const { releaseId } = req.params;
    const deleteRelease = await models.comunicado.destroy(releaseId,
        {
            where: {releaseId: releaseId}
        },
        {
            relations: ['administrador','periodo_escolar']
        })
        .then(deleteRelease => {
            res.status(200).json({
                data: deleteRelease,
                message: 'Release deleted'
            })
        })
        .catch(err => {
            res.status(500).sned({
                message: err.message || 'The release could not be deleted'
            })
        })
};