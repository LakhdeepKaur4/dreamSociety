const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const SocietyMember = db.societyMember;
const City = db.city;
const Location = db.location;
const Country = db.country;
const State = db.state;
const Designation = db.designation;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
    try {
        console.log("creating Society member");
        let body = req.body;
        body.userId = req.userId;
        const societyMember = await SocietyMember.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Society member registered successfully",
            societyMember
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const societyMember = await SocietyMember.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
            include: [
               {model:Country},
               {model:State},
               {model:City},
               {model:Location},
               {model:Designation},
            ]
        });
        if (societyMember) {
            return res.status(httpStatus.CREATED).json({
                message: "Society Member Content Page",
                societyMember: societyMember
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
        const updatedEvent = await Event.find({ where: { eventId: id } }).then(event => {
            return event.updateAttributes(update)
        })
        if (updatedEvent) {
            return res.status(httpStatus.OK).json({
                message: "Event Updated Page",
                event: updatedEvent
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}