const db = require('../config/db.config.js');
const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const UserFacility = db.userFacility;

exports.create = (req, res, next) => {
    const facilitiesUpdated = [];
    const facilities = req.body;
    console.log('Facilities ===>', facilities);

    const userId = req.userId;
    console.log('ID ===>', userId);

    facilities.map(item => {
        item.userId = userId;
        facilitiesUpdated.push(item);
    })

    UserFacility.bulkCreate(facilitiesUpdated, {returning: true})
}