const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const Employee = db.employee;
// const EmployeeType =db.employeeType;
// const EmployeeWorkType =db.employeeWorkType;
const Country = db.country;
const City = db.city;
const State = db.state;
const Location = db.location;

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        console.log("body::::::==>",body)
        body.userId = req.userId;
        const employee = await Employee.create(body);
        const employeeId = employee.employeeId;
        if (req.files) {
            for (let i = 0; i < req.files.profilePicture.length; i++) {
                profileImage = req.files.profilePicture[i].filename;
            }
            const updateImage = {
                picture: profileImage
            };
            const imageUpdate = await Employee.find({ where: { employeeId: employeeId } }).then(employee => {
                return employee.updateAttributes(updateImage)
            })
            documentOne = req.files.document[0].filename;
            documentTwo = req.files.document[1].filename;
            const updateDocument = {
                documentOne: documentOne,
                documentTwo: documentTwo
            };

            const documentUpdate = await Employee.find({ where: { employeeId: employeeId } }).then(employee => {
                return employee.updateAttributes(updateDocument)
            })
        }
        return res.status(httpStatus.CREATED).json({
            message: "Employee successfully created",
            employee
        });
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const employee = await Employee.findAll({
            where: { isActive: true },
            order: [['createdAt', 'DESC']],
            include: [
                { model: Country },
                { model: State },
                { model: Location },
                { model: City },
            ]
        });
        if (employee) {
            return res.status(httpStatus.OK).json({
                message: "Employee Detail Content Page",
                employee
            });
        }
    } catch (error) {
        console.log(error)
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
        const updatedEmployee = await Employee.update(update, { where: { employeeId: { [Op.in]: deleteSelected } } })
        if (updatedEmployee) {
            return res.status(httpStatus.OK).json({
                message: "Employees deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}