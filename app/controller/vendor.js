const db = require('../config/db.config.js');
const httpStatus = require('http-status');
var userNameGenerator = require('random-username-generator');
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

exports.create = async (req, res, next) => {
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
exports.createVendor = async (req, res, next) => {
    try {
        let body = req.body;
        const userName = userNameGenerator.generate();
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
                serviceDetailId: body.serviceDetailId1,
                rateTypeId: body.rateTypeId,
                rate: body.rate1,
                userId: req.userId,
                serviceId: body.serviceId
            })
        }
        if (body.rate2) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                serviceDetailId: body.serviceDetailId2,
                rateTypeId: body.rateTypeId,
                rate: body.rate2,
                userId: req.userId,
                serviceId: body.serviceId
            })
        }

        if (body.rate3) {
            const vendorService = await VendorService.create({
                vendorId: vendorId,
                serviceDetailId: body.serviceDetailId3,
                rateTypeId: body.rateTypeId,
                rate: body.rate3,
                userId: req.userId,
                serviceId: body.serviceId
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
        const vendor = await Vendor.findAll({
            where: { isActive: true }, include: [{
                model: Service,
                attributes: ['serviceId', 'serviceName'],
            }]
        });
        if (vendor) {
            return res.status(httpStatus.CREATED).json({
                message: "Vendor Content Page",
                vendor: vendor
            });
        }
    } catch (error) {
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

exports.uploadPicture = async (req,res,next) => {
    try{
        console.log(req.body.pictures)
        console.log("request picture==>",req.files)
        let uploadFile = req.files.picture
        const fileName = req.files.file.name
        uploadFile.mv(
          `${__dirname}/public/profilePictures/${fileName}`,
          function (err) {
            if (err) {
              return res.status(500).send(err)
            }
      
            res.json({
              file: `public/${req.files.file.name}`,
            })
          },
        )
    }catch(error){
        console.log(error)
    }
}

function uploadFile(data, callback) {
    try {
        if (data.file) {
            file.upload(data.file, isFileUpload => {
                if (!isFileUpload) {
                    callback(false);
                }
            })
        }
        if (data.picture) {
            file.upload(data.picture, isFileUpload => {
                if (!isFileUpload) {
                    callback(false);
                }
            })
        }
        callback(true);
    } catch (err) {
        console.log(':: err in uploadFile ', err)
        callback(false);
    }
}

exports.upload =async(req,res,next) => {
    try{
        console.log(body.fileData);
        const fileUrl = `/profilePictures/`;
        // create file url from server directory
        url = `${process.env["PWD"]}/public${fileUrl}`;

        const documentFile = { url, fileData: body.fileData };
        console.log('fileUrl',fileUrl);
        console.log("filedocumentUrl===",documentFile);
        file.upload(documentFile, (isFileUpload) => {
            // check file upload on server successfully or not
            if (isFileUpload) {
                // update  file url in db
        console.log("successfully uploaded");
            }
            console.log("resp 2", resp)
        });
        // console.log("file info ", req.file);
        // var name = req.files.profileImage.name;
        // console.log("name===>",name);
        
    }catch(error){
        console.log(error)
    }
}

