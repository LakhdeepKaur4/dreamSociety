const db = require('../config/db.config.js');
const httpStatus = require('http-status');
var userNameGenerator = require('random-username-generator');
var passwordGenerator = require('generate-password');

const Vendor = db.vendor;
const Service = db.service;
const vendorService = db.vendorService;

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
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}
exports.createVendor = async(req,res,next) => {
try{
let body = req.body;
body.userId = req.userId;
const userName = userNameGenerator.generate();
console.log("username--->",userName);
body.userName = userName;
const password = generator.generate({
    length: 10,
    numbers: true
});
console.log("password--->",password);
body.password = password;
const vendor = await Vendor.create({
    vendorName:body.vendorName,
    permanentAddress:body.permanentAddress,
    currentAddress:body.currentAddress,
    picture:body.picture,
    contact:body.contact,
});
const vendorId = vendor.vendorId;
if(body.rate1){
    const vendorService = await VendorService.create({
     vendorId:vendorId,
     serviceDetailId:body.serviceDetailId,
     rateTypeId:body.rateTypeId,
     rate:body.rate1
    })
}
if(body.rate2){
    const vendorService = await VendorService.create({
     vendorId:vendorId,
     serviceDetailId:body.serviceDetailId,
     rateTypeId:body.rateTypeId,
     rate:body.rate2
    })
}
if(body.rate3){
    const vendorService = await VendorService.create({
     vendorId:vendorId,
     serviceDetailId:body.serviceDetailId,
     rateTypeId:body.rateTypeId,
     rate:body.rate3
    })
}
return res.status(httpStatus.CREATED).json({
    message: "Vendor successfully created",
    vendor
});
}catch(error){
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
}
}

exports.get = async(req,res,next) => {
    try{
        const vendor = await Vendor.findAll({where:{isActive:true},	include: [{
			model: Service,
			attributes: ['serviceId','serviceName'],
		}]});
        if(vendor){
            return res.status(httpStatus.CREATED).json({
                message: "Vendor Content Page",
                vendor:vendor
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async(req,res,next) => {
    try{
        console.log("updating vendor")
        const id = req.params.id;
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;

        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedVendor = await Vendor.find({where:{vendorId:id}}).then(vendor => {
            return vendor.updateAttributes(update)
          })
        if(updatedVendor){
            return res.status(httpStatus.OK).json({
                message: "Vendor Updated Page",
                vendor:updatedVendor
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.delete = async(req,res,next) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;
        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedVendor = await Vendor.find({where:{vendorId:id}}).then(vendor => {
            return vendor.updateAttributes(update)
          })
        if(updatedVendor){
            return res.status(httpStatus.OK).json({
                message: "Vendor deleted successfully",
                vendor:updatedVendor
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}