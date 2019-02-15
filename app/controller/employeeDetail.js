const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const EmployeeDetail = db.employeeDetail;
const EmployeeType =db.employeeType;
const EmployeeWorkType =db.employeeWorkType;

exports.create = async (req,res,next) => {
    try{
        let body = req.body;
        body.userId = req.userId;
        const employeeDetail= await EmployeeDetail.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Employee Detail successfully created",
            employeeDetail
        });
       } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const employeeDetail = await EmployeeDetail.findAll({where:{isActive:true},
        include:[
            {model:EmployeeType},
            {model:EmployeeWorkType}
        ]
        });
        if(employeeDetail){
            return res.status(httpStatus.OK).json({
                message: "Employee Detail Content Page",
                employeeDetail
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}
