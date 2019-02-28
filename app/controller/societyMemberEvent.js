const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const SocietyMemberEvent = db.societyMemberEvent;

exports.create = async (req, res, next) => {
    try {
        console.log("creating Society member event");
        let body = req.body;
        const societyMemberEvent = await SocietyMemberEvent.findOne({
            where: {
                societyMemberEventName: body.societyMemberEventName
            }
        })
        if (societyMemberEvent) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Society Member Event already Exists" })
        }
        body.userId = req.userId;
        const event = await SocietyMemberEvent.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Society Member event created successfully",
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const event = await SocietyMemberEvent.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
        });
        if (event) {
            return res.status(httpStatus.CREATED).json({
                message: "Society Member Event Content Page",
                event
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}