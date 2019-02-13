const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');

const Maintenance = db.maintenance;

exports.create = async (req, res, next) => {
    try {
        console.log("creating maintenance");
        let body = req.body;
        body.userId = req.userId;

        const maintenanceExists = await Maintenance.findOne({
            where: {
                category: req.body.category
            }
         })
         if(maintenanceExists){
             return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Maintenance Name already Exists"})
         }
        const maintenance = await Maintenance.create(body);
        if(maintenance){
            return res.status(httpStatus.CREATED).json({
                message: "Maintenance successfully created",
                maintenance
            });
        }
    } catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const maintenance = await Maintenance.findAll({where:{isActive:true}});
        if(maintenance){
            return res.status(httpStatus.CREATED).json({
                message: "Maintenance Content Page",
                maintenance:maintenance
            });
        }
    }catch(error){
        console.log("error==>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}
