const db = require('../config/db.config.js');

const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const CommonAreaDetail = db.commonAreaDetail;
const MachineDetail = db.machineDetail;
const CommonArea = db.commonArea;

exports.create = (req, res, next) => {
    const body = req.body;
    console.log('Body ===>', body);

    CommonAreaDetail.create(body)
        .then(commonArea => {
            if (commonArea !== null) {
                res.status(httpStatus.CREATED).json({
                    message: 'Machine added to common area succesfully'
                })
            } else {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'Machine not added to common area. Please try again!'
                })
            }
        })
        .catch(err => {
            console.log('Error ===>', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.update = (req, res, next) => {
    const commonAreaDetailId = req.params.id;
    const body = req.body;
    console.log('Body ===>', body);

    CommonAreaDetail.findOne({
        where: {
            machineDetailId: machineDetailId,
            commonAreaId: commonAreaId,
            isActive: true,
            commonAreaDetailId: {
                [Op.ne]: commonAreaDetailId
            }
        }
    })
        .then(commonAreaExisting => {
            if (commonAreaExisting !== null) {
                res.status(httpStatus.NOT_MODIFIED).json({
                    message: 'Machine already exist for another common area'
                })
            } else {
                CommonAreaDetail.findOne({
                    where: {
                        isActive: true,
                        commonAreaDetailId: commonAreaDetailId
                    }
                })
                    .then(commonArea => {
                        if (commonArea !== null) {
                            commonArea.updateAttributes(body);
                            res.status(httpStatus.CREATED).json({
                                message: 'Updated successfully'
                            })
                        } else {
                            res.status(httpStatus.NOT_MODIFIED).json({
                                message: 'Not updated. Please try again!'
                            })
                        }
                    })
                    .catch(err => {
                        console.log('Error ===>', err);
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
                    })
            }
        })
        .catch(err => {
            console.log('Error ===>', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.get = (req, res, next) => {
    CommonAreaDetail.findAll({
        where: {
            isActive: true
        },
        includes: [
            { model: CommonArea, where: { isActive: true }, attributes: ['commonAreaId', 'commonArea'] },
            { model: MachineDetail, where: { isActive: true }, attributes: ['machineDetailId', 'machineActualId'] }
        ]
    })
        .then(commonAreas => {
            if (commonAreas.length !== 0) {
                res.status(httpStatus.OK).json({
                    commonAreas: commonAreas
                })
            } else {
                res.status(httpStatus.NO_CONTENT).json({
                    message: 'No data available!'
                })
            }
        })
        .catch(err => {
            console.log('Error ===>', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.delete = (req, res, next) => {
    const commonAreaDetailId = req.params.id;
    console.log('ID ===>', commonAreaDetailId);

    CommonAreaDetail.findOne({
        where: {
            commonAreaDetailId: commonAreaDetailId,
            isActive: true
        }
    })
        .then(commonArea => {
            if (commonArea !== null) {
                commonArea.updateAttributes({ isActive: false });
                res.status(httpStatus.OK).json({
                    message: 'Deleted successfully'
                })
            } else {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'Not deleted'
                })
            }
        })
        .catch(err => {
            console.log('Error ===>', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.deleteSelected = (req, res, next) => {
    const commonAreaDetailIds = req.body.ids;
    console.log('IDs ===>', commonAreaDetailIds);

    CommonAreaDetail.findAll({
        where: {
            commonAreaDetailId: {
                [Op.in]: commonAreaDetailIds
            },
            isActive: true
        }
    })
        .then(commonAreas => {
            if (commonAreas.length !== 0) {
                commonAreas.map(item => {
                    item.updateAttributes({ isActive: false })
                })
                res.status(httpStatus.OK).json({
                    message: 'Deleted successfully'
                })
            } else {
                res.status(httpStatus.NO_CONTENT).json({
                    message: 'No data found'
                })
            }
        })
        .catch(err => {
            console.log('Error ===>', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}