const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const Society = db.society;
const City = db.city;
const location = db.location;
const Country = db.country;
const State = db.state;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log("creating society");
    Society.create({
        societyName: req.body.societyName,
        cityId: req.body.cityId,
        countryId: req.body.countryId,
        locationId: req.body.locationId,
        stateId: req.body.stateId,
        societyAddress: req.body.societyAddress,
        contactNumber: req.body.contactNumber,
        registrationNumber: req.body.registrationNumber,
        totalBoardMembers: req.body.totalBoardMembers,
        bankName: req.body.bankName,
        accountHolder: req.body.accountHolder,
        accountNumber: req.body.accountNumber,
        userId: req.userId,
    }).then(society => {
        res.json({ message: "Society added successfully!", society: society });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

exports.get = (req, res) => {
    Society.findAll(
        {
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: City,
                    attributes: ['cityId', 'cityName']
                },
                {
                    model: Country,

                    attributes: ['countryId', 'countryName']
                },
                {
                    model: State,
                    attributes: ['stateId', 'stateName']
                },
                {
                    model: User,
                    attributes: ['userId', 'userName']
                },
                {
                    model: location,
                    attributes: ['locationId', 'locationName']
                },
            ]
        })
        .then(society => {
            if (society) {
                res.json(society);
            } else {
                res.json({ message: 'Society Data Not Found' });
            }
        });
}


exports.getById = (req, res) => {
    console.log("society===>", req.params.id)
    Society.findOne({
        where: { locationId: req.params.id },
        include: [
            {
                model: City,
                attributes: ['cityId', 'cityName']
            },
            {
                model: Country,
                attributes: ['countryId', 'countryName']
            },
            {
                model: State,
                attributes: ['stateId', 'stateName']
            },
            {
                model: User,
                attributes: ['userId', 'userName']
            },
            {
                model: location,
                attributes: ['locationId', 'locationName']
            },
        ]
    }).then(society => {
        res.status(200).json({
            "description": "Society Content Page",
            "society": society
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Society Page",
            "error": err
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.json("Please enter id");
    }
    const updates = req.body;
    Society.find({
        where: { societyId: id }
    })
        .then(society => {
            return society.updateAttributes(updates)
        })
        .then(updatedSociety => {
            res.json({ message: "State updated successfully!", updatedSociety: updatedSociety });
        });
}


exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedSociety = await Society.find({ where: { societyId: id } }).then(society => {
            return society.updateAttributes(update)
        })
        if (updatedSociety) {
            return res.status(httpStatus.OK).json({
                message: "State deleted successfully",
                society: updatedSociety
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
        const updatedSociety = await Society.update(update, { where: { societyId: { [Op.in]: deleteSelected } } })
        if (updatedSociety) {
            return res.status(httpStatus.OK).json({
                message: "Societies deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}