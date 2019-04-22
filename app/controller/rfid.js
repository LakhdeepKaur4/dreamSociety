const db = require('../config/db.config.js');

const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const RFID = db.rfid;

exports.create = (req, res, next) => {
    const body = req.body;
    console.log('Body ===>', body);

    RFID.findOne({
        where: {
            rfid: body.rfid,
            isActive: true
        }
    })
        .then(rfid => {
            if (rfid !== null) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'Already exist'
                })
            } else {
                RFID.create(body)
                    .then(rfid => {
                        if (rfid !== null) {
                            res.status(httpStatus.CREATED).json({
                                message: 'Created'
                            })
                        } else {
                            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                                message: 'Not created'
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

exports.get = (req, res, next) => {
    RFID.findAll({
        where: {
            isActive: true
        }
    })
        .then(rfids => {
            if (rfids.length !== 0) {
                res.status(httpStatus.OK).json({
                    RFIDs: rfids
                })
            } else {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'No data available'
                })
            }
        })
        .catch(err => {
            console.log('Error', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}