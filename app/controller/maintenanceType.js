const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const MaintenanceType = db.maintenanceType;

exports.create = async (req, res, next) => {
    try {
        console.log("creating maintenance");
        let body = req.body;
        body.userId = req.userId;
        const maintenanceType = await MaintenanceType.create(body);
        if(maintenanceType){
            return res.status(httpStatus.CREATED).json({
                message: "Maintenance Type successfully created",
                maintenanceType
            });
        }
    }catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const maintenanceType = await MaintenanceType.findAll({where:{isActive:true}});
        if(maintenanceType){
            return res.status(httpStatus.CREATED).json({
                message: "Maintenance Type Content Page",
                maintenanceType:maintenanceType
            });
        }
    }catch(error){
        console.log("error==>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}