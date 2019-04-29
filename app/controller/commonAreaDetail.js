const db = require('../config/db.config.js');

const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const CommonAreaDetail = db.commonAreaDetail;
const MachineDetail = db.machineDetail;
const CommonArea = db.commonArea;
const AreaMachine = db.areaMachine;

exports.create = async (req, res) => {
    try {
        let body = req.body;
        body.userId = req.userId;
        console.log(body.userId)
        const commonAreaDetail = await CommonAreaDetail.create(body);

        const commonAreaDetailId = commonAreaDetail.commonAreaDetailId;

        const result = body.machines.map(function (element) { element.commonAreaDetailId = commonAreaDetailId });

        const updated = await AreaMachine.bulkCreate(body.machines, { returning: true }, {
            fields: ["machineDetailId", "commonAreaDetailId"],
        });

        if (updated) {
            return res.status(httpStatus.CREATED).json({
                message: "Created successfully"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

exports.create1 = (req, res, next) => {
    const body = req.body;
    console.log('Body ===>', body);
    let success = 0;
    let error = 0;
    // body.machineDetailId = body.machineDetailId.split(',');

    body.machineDetailId.map(item => {
        CommonAreaDetail.create({
            commonAreaId: body.commonAreaId,
            machineDetailId: item
        })
            .then(commonArea => {
                if (commonArea !== null) {
                    success += 1;
                }
                else {
                    error += 1;
                }
            })
    })
    if (error === 0) {
        res.status(httpStatus.CREATED).json({
            message: 'Machines added to common area succesfully'
        })
    } else {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
            message: 'Machine not added to common area. Please try again!'
        })
    }
}

exports.getAreaAndMachine = async (req, res) => {
    try {
        const commonAreaDetail = await CommonAreaDetail.findAll({
            where: { isActive: true },
            include: [{
                model: MachineDetail,
                as: 'Machine',
                attributes: ['machineDetailId', 'machineActualId'],
                through: {
                    attributes: ['machineDetailId', 'commonAreaDetailId'],
                }
            }
            ]
            , order: [['createdAt', 'DESC']]
        });
        if (commonAreaDetail) {
            res.status(httpStatus.OK).json({ message: 'Common Area with machine', commonAreaDetail })
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

exports.updateAreaAndMachine = async (req, res) => {
    try {
        const commonAreaDetailId = req.params.id;
        let body = req.body;

        // let machineDetailsIds = [];
        // const result = body.machineDetailId.map(function (element) { console.log(element.machineDetailId)});

        // const commonAreaExisting = AreaMachine.findAll({
        //     where: {
        //         machineDetailId: body.machineDetailId,
        //         // commonAreaId: body.commonAreaId,
        //         isActive: true,
        //         commonAreaDetailId: {
        //             // [Op.ne]: 
        //             commonAreaDetailId
        //         }
        //     }
        // })
        // if (commonAreaExisting) {
        //     if (commonAreaExisting !== null) {
        //         res.status(httpStatus.NOT_MODIFIED).json({
        //             message: 'Machine already exist for another common area'
        //         })
        //     }
        // } else {
            let commonAreaDetailIds = [];
            const areaMachine = await AreaMachine.findAll({ where: { isActive: true, commonAreaDetailId: commonAreaDetailId } });
            const areaMachineId = areaMachine.map(areaMachine => {
                commonAreaDetailIds.push(areaMachine.areaMachineId)
            });
            // console.log(towerIds);
            const deleteTowerFloor = await AreaMachine.destroy({ where: { areaMachineId: { [Op.in]: areaMachineId } } });

            const result = req.body.machineDetailId.forEach(function (element) {
                element.commonAreaDetailId = commonAreaDetailId
                console.log(element.commonAreaDetailId)
            });
            const updatedAreaMachine = await AreaMachine.bulkCreate(req.body.machineDetailId, { returning: true }, {
                fields: ["machineDetailId", "commonAreaDetailId"],
            },
            );

            res.json({ message: 'Updated Successfully' });
        // }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.update = (req, res, next) => {
    const commonAreaDetailId = req.params.id;
    const body = req.body;
    console.log('Body ===>', body);

    CommonAreaDetail.findAll({
        where: {
            machineDetailId: body.machineDetailId,
            commonAreaId: body.commonAreaId,
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
    // const commonAreaIds = [];
    CommonAreaDetail.findAll({
        where: {
            isActive: true
        },
        // group: ['common_area_detail_master.commonAreaId'],
        include: [
            { model: CommonArea, where: { isActive: true }, attributes: ['commonAreaId', 'commonArea'] },
            { model: MachineDetail, where: { isActive: true }, attributes: ['machineDetailId', 'machineActualId'] }
        ]
    })
        .then(commonAreas => {
            if (commonAreas.length !== 0) {
                // console.log(commonAreaIds);
                res.status(httpStatus.OK).json({
                    commonAreas: commonAreas.sort()
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