const db = require('../config/db.config.js');
const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const UserFacility = db.userFacility;

exports.create = (req, res, next) => {
    const facilitiesUpdated = [];
    const facilities = req.body.facilities;
    console.log('Facilities ===>', facilities);

    const userId = req.userId || 73370;
    console.log('ID ===>', userId);

    facilities.map(item => {
        item.userId = userId;
        facilitiesUpdated.push(item);
    })

    UserFacility.bulkCreate(facilitiesUpdated, {returning: true})
    .then(userFacilitiesCreated => {
        res.status(httpStatus.CREATED).json({
            message: 'Facilities added successfully'
        })
    })
}