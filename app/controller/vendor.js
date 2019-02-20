const db = require('../config/db.config.js');
const httpStatus = require('http-status');
var passwordGenerator = require('generate-password');
const Nexmo = require("nexmo");
const config = require('../config/config.js');
const file = require('../handlers/fileSystem');

const nexmo = new Nexmo(
    {
        apiKey: config.api_key,
        apiSecret: config.api_secret
    },
    { debug: true }
);

const Vendor = db.vendor;
const Service = db.service;
const VendorService = db.vendorService;
const Op = db.Sequelize.Op;

exports.createVendor = async (req, res, next) => {
    try {
        let body = req.body;
        body.userId = req.userId;
        const vendor = await Vendor.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Vendor successfully created",
            vendor
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        const userName = req.body.vendorName += Math.floor((Math.random() * 100) + 1);
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        const vendor = await Vendor.create({
            userName: userName,
            password: password,
            vendorName: body.vendorName,
            permanentAddress: body.permanentAddress,
            currentAddress: body.currentAddress,
            picture: body.picture,
            contact: body.contact,
            userId: req.userId,
            document: body.document
        });
        const vendorId = vendor.vendorId;
        if (body.rate1) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                serviceDetailId: body.serviceDetailId1.serviceDetailId, 
                rateId: body.rateId1.rateId,
                rate: body.rate1,
                userId: req.userId,
                serviceId: body.serviceId1.serviceId
            })
        }
        if (body.rate2) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                serviceDetailId: body.serviceDetailId2.serviceDetailId,
                rateId: body.rateId2.rateId,
                rate: body.rate2,
                userId: req.userId,
                serviceId: body.serviceId2.serviceId
            })
        }

        if (body.rate3) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                serviceDetailId: body.serviceDetailId3.serviceDetailId,
                rateId: body.rateId3.rateId,
                rate: body.rate3,
                userId: req.userId,
                serviceId: body.serviceId3.serviceId
            })
        }
        if (req.files) {
            for (let i = 0; i < req.files.profilePicture.length; i++) {
                profileImage = req.files.profilePicture[i].filename;
            }
            const updateImage = {
                picture: profileImage
            };
            const imageUpdate = await Vendor.find({ where: { vendorId: vendorId } }).then(vendor => {
                return vendor.updateAttributes(updateImage)
            })
            documentOne = req.files.document[0].filename;
            documentTwo = req.files.document[1].filename;
            const updateDocument = {
                documentOne: documentOne,
                documentTwo: documentTwo
            };

            const documentUpdate = await Vendor.find({ where: { vendorId: vendorId } }).then(vendor => {
                return vendor.updateAttributes(updateDocument)
            })
        }
        const message = `Welcome to Dream society your username is ${userName} and password is ${password}.Do not share with anyone.`
        // nexmo.message.sendSms(config.number, body.contact, message, { type: 'text' }, (err, resp) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(resp);
        //     }
        // });
        return res.status(httpStatus.CREATED).json({
            message: "Please check mobile for details",
            vendor
        });
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const vendor = await VendorService.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
            include: [
            { model: Vendor }]
        });
        if (vendor) {
            return res.status(httpStatus.CREATED).json({
                message: "Vendor Content Page",
                vendor: vendor
            });
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        console.log("updating vendor")
        const id = req.params.id;
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;

        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedVendor = await Vendor.find({ where: { vendorId: id } }).then(vendor => {
            return vendor.updateAttributes(update)
        })
        if (updatedVendor) {
            return res.status(httpStatus.OK).json({
                message: "Vendor Updated Page",
                vendor: updatedVendor
            });
        }
    } catch (error) {
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
        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedVendor = await Vendor.find({ where: { vendorId: id } }).then(vendor => {
            return vendor.updateAttributes(update)
        })
        if (updatedVendor) {
            return res.status(httpStatus.OK).json({
                message: "Vendor deleted successfully",
                vendor: updatedVendor
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.uploadPicture = async (req, res, next) => {
    try {
        console.log("file info ", req.file);
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
		const updatedVendor = await Vendor.update(update, { where: { vendorId: { [Op.in]: deleteSelected } } })
		if (updatedVendor) {
			return res.status(httpStatus.OK).json({
				message: "Vendors deleted successfully",
			});
		}
	} catch (error) {
		console.log(error)
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
}

