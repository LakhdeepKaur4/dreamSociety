const db = require('../config/db.config.js');
const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const UserFacility = db.userFacility;
const Facilities = db.facilities;
const FacilitiesDetails = db.facilitiesDetails;

exports.create = (req, res, next) => {
    const facilitiesUpdated = [];
    const facilities = req.body.facilities;
    console.log('Facilities ===>', facilities);

    const userId = req.userId;
    console.log('ID ===>', userId);

    facilities.map(item => {
        item.userId = userId;
        if (duration === '1 Month') {
            item.startDate = new Date(Date.now());
            let dateToday = item.startDate;
            item.endDate = dateToday.setDate(dateToday.getDate() + 30);
        } else if (duration === '2 Months') {
            item.startDate = new Date(Date.now());
            let dateToday = item.startDate;
            item.endDate = dateToday.setDate(dateToday.getDate() + 60);
        } else if (duration === 'Quarterly') {
            item.startDate = new Date(Date.now());
            let dateToday = item.startDate;
            item.endDate = dateToday.setDate(dateToday.getDate() + 120);
        } else if (duration === 'Half Yearly') {
            item.startDate = new Date(Date.now());
            let dateToday = item.startDate;
            item.endDate = dateToday.setDate(dateToday.getDate() + 180);
        } else if (duration === 'Yearly') {
            item.startDate = new Date(Date.now());
            let dateToday = item.startDate;
            item.endDate = dateToday.setDate(dateToday.getDate() + 360);
        }
        facilitiesUpdated.push(item);
    })

    UserFacility.bulkCreate(facilitiesUpdated, { returning: true })
        .then(userFacilitiesCreated => {
            res.status(httpStatus.CREATED).json({
                message: 'Facilities added successfully'
            })
        })
        .catch(err => {
            console.log('Error ===>', err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.get = (req, res, next) => {
    const userId = req.userId;
    console.log('ID ===>', userId);
    UserFacility.findAll({
        where: {
            isActive: true,
            userId: userId
        },
        include: [
            { model: FacilitiesDetails, where: { isActive: true } }
        ]
    })
        .then(facilities => {
            res.json(facilities);
        })
}