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
const Rate =db.rate;
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
        console.log("body===>",body);
        let customVendorName = body.vendorName;
        const userName = customVendorName += Math.floor((Math.random() * 100) + 1);
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
            // document: body.document
        });
        const vendorId = vendor.vendorId;
        if (body.rate1) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                rateId: body.rateId1,
                rate: body.rate1,
                userId: req.userId,
                serviceId: body.serviceId1
            })
        }
        if (body.rate2) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                rateId: body.rateId2,
                rate: body.rate2,
                userId: req.userId,
                serviceId: body.serviceId2
            })
        }

        if (body.rate3) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                rateId: body.rateId3,
                rate: body.rate3,
                userId: req.userId,
                serviceId: body.serviceId3
            })
        }
        console.log("req.files===>",req.files)
        if (req.files) {
            // for (let i = 0; i < req.files.profilePicture.length; i++) {
                profileImage = req.files.profilePicture[0].path;
            // }
            const updateImage = {
                picture: profileImage
            };
            const imageUpdate = await Vendor.find({ where: { vendorId: vendorId } }).then(vendor => {
                return vendor.updateAttributes(updateImage)
            })
            documentOne = req.files.documentOne[0].path;
            documentTwo = req.files.documentTwo[0].path;
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
            { model: Vendor },
            {model:Rate},
            {model:Service}]
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
        console.log("updating vendor");
        console.log(":::::req.body==>",req.body)
        const id = req.params.id;
        console.log(":::::id",id)
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;
        // const empty = isEmpty(update)
        // console.log(empty)
        
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

