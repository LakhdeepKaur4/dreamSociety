const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const SocietyBoardMember = db.societyBoardMember;
const Society = db.society;
const Country = db.country;
const State = db.state;
const City = db.city;
const Location = db.location;
const Designation = db.designation;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
    try {
        console.log("creating Society member");
        let body = req.body;
        body.userId = req.userId;
        const societyBoardMember = await SocietyBoardMember.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Society Board Member registered successfully",
            societyBoardMember
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const societyBoardMember = await SocietyBoardMember.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
            include: [
               {model:Designation,attributes:['designationId','designationName']},
               {model:Country,attributes:['countryId','countryName']},
               {model:City,attributes:['cityId','cityName']},
               {model:State,attributes:['stateId','stateName']},
               {model:Location,attributes:['locationId','locationName']},
               {model:Society,attributes:['societyId','societyName']},
            ]
        });
        if (societyBoardMember) {
            return res.status(httpStatus.CREATED).json({
                message: "Society Board Member Content Page",
                societyBoardMember: societyBoardMember
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("id==>", id)
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        console.log("update==>", update)
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const societyBoardMember = await SocietyBoardMember.find({ where: { societyBoardMemberId: id } }).then(societyBoardMember => {
            return societyBoardMember.updateAttributes(update)
        })
        if (societyBoardMember) {
            return res.status(httpStatus.OK).json({
                message: "Society Member Updated Page",
                societyBoardMember
            });
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}


exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        console.log("::::::update",update);
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const societyBoardMember = await SocietyBoardMember.find({ where: { societyBoardMemberId: id } }).then(societyBoardMember => {
            return societyBoardMember.updateAttributes(update)
        })
        if (societyBoardMember) {
            return res.status(httpStatus.OK).json({
                message: "Society Member deleted successfully",
                societyBoardMember
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.deleteSelected = async (req, res, next) => {
    try {
        const deleteSelected = req.body.ids;
        console.log("delete selected==>", deleteSelected);
        const update = { isActive: false };
        if (!deleteSelected) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "No id Found" });
        }
        const updatedSocietyBoardMember = await SocietyBoardMember.update(update, { where: { SocietyBoardMemberId: { [Op.in]: deleteSelected } } })
        if (updatedSocietyBoardMember) {
            return res.status(httpStatus.OK).json({
                message: "Society Board Members deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}