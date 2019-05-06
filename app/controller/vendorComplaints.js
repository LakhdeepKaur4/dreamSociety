const db = require('../config/db.config.js');

const httpStatus = require('http-status');

const Op = db.Sequelize.Op;

const VendorComplaints = db.vendorComplaints;
const Complaint = db.complaint;
const FlatDetail = db.flatDetail;
const Tower = db.tower;
const Floor = db.floor;
const User = db.user;

exports.getById = (req, res, next) => {
    const id = req.userId;
    console.log('Vendor ID ===>', id);
    const complaintIds = [];

    VendorComplaints.findAll({
        where: {
            vendorId: id,
            isActive: true
        }
    })
        .then(complaints => {
            complaints.map(item => {
                complaintIds.push(item.complaintId);
            })
            Complaint.findAll({
                where: {
                    complaintId: {
                        [Op.in]: complaintIds
                    },
                    isActive: true
                },
                include: [
                    { model: FlatDetail, where: { isActive: true }, include: [
                        { model: Tower, where: { isActive: true } },
                        { model: Floor, where: { isActive: true } },
                        { model: User, where: { isActive: true } }
                    ] },
                ]
            })
            .then(complaints => {
                // complaints.map(item => {
                //     complaints.user
                // })
                res.status(httpStatus.OK).json({
                    complaints 
                })
            })
        })
}