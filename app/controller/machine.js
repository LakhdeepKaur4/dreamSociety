const db = require('../config/db.config.js');

const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const Machine = db.machine;

exports.create = (req, res, next) => {
    const body = req.body;
    console.log('Body ===>', body);

    Machine.findOne({
        where: {
            machineActualId: body.machineActualId,
            isActive: true
        }
    })
        .then(machineExisting => {
            if (machineExisting !== null) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'Machine already in use for another flat'
                })
            } else {
                Machine.create(body)
                    .then(machine => {
                        if (machine !== null) {
                            res.status(httpStatus.CREATED).json({
                                message: 'Machine registered successfully'
                            })
                        } else {
                            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                                message: 'Machine registeration not successful'
                            })
                        }
                    })
                    .catch(err => {
                        console.log('Error', err);
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
                    })
            }
        })
        .catch(err => {
            console.log('Error', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}