const db = require('../config/db.config.js');
const config = require('../config/config');
const httpStatus = require('http-status');
const crypto = require('crypto');

const Employee = db.employee;
// const EmployeeType =db.employeeType;
// const EmployeeWorkType =db.employeeWorkType;
const Country = db.country;
const City = db.city;
const State = db.state;
const Location = db.location;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        console.log("body::::::==>", body);
        body.userId = req.userId;
        const employee = await Employee.create(body);
        const employeeId = employee.employeeId;
        // console.log("filess=====>",req.files);
        if (req.files) {
            // for (let i = 0; i < req.files.profilePicture.length; i++) {
            profileImage = req.files.profilePicture[0].path;
            // }
            const updateImage = {
                picture: profileImage
            };
            const imageUpdate = await Employee.find({ where: { employeeId: employeeId } }).then(employee => {
                return employee.updateAttributes(updateImage)
            })
            console.log(req.files.documentOne[0].path);
            documentOne = req.files.documentOne[0].path;
            documentTwo = req.files.documentTwo[0].path;
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
                message: "Employee Content Page",
                employee
            });
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("id==>", id);
        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;

        console.log("update", update);

        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        const updatedEmployee = await Employee.find({ where: { employeeId: id } }).then(employee => {
            return employee.updateAttributes(update)
        })
        if (updatedEmployee) {
            return res.status(httpStatus.OK).json({
                message: "Employee Updated Page",
                updatedEmployee
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}


exports.deletePhoto = function (req, res) {
    Photos.remove({ _id: req.params.id }, function (err, photo) {
        if (err) {
            return res.send({ status: "200", response: "fail" });
        }
        fs.unlink(photo.path, function () {
            res.send({
                status: "200",
                responseType: "string",
                response: "success"
            });
        });
    });
};

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
        const updatedEmployee = await EmployeeDetail.find({ where: { employeeId: id } }).then(employee => {
            return employee.updateAttributes(update)
        })
        if (updatedEmployee) {
            return res.status(httpStatus.OK).json({
                message: "Employee deleted successfully",
                updatedEmployee
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Mysql error' });
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


encrypt = (text) => {
    let key = config.secret;
    let algorithm = 'aes-128-cbc';
    let cipher = crypto.createCipher(algorithm, key);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
}

decrypt = (text) => {
    let key = config.secret;
    let algorithm = 'aes-128-cbc';
    let decipher = crypto.createDecipher(algorithm, key);
    let decryptedText = decipher.update(text, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

exports.createEncrypt = async (req, res, next) => {
    try {
        let body = req.body;
        console.log('Body ===>', body);
        body.userId = req.userId;
        let employee;
        let employeeId;
        await Employee
            .create({
                firstName: encrypt(body.firstName),
                middleName: encrypt(body.middleName),
                lastName: encrypt(body.lastName),
                CTC: encrypt(body.CTC),
                startDate: encrypt(body.startDate),
                endDate: encrypt(body.endDate),
                userId: body.userId,
                countryId: body.countryId,
                stateId: body.stateId,
                cityId: body.cityId,
                locationId: body.locationId
            })
            .then(emp => {
                // console.log(emp);
                employee = emp;
                // console.log(emp.employeeId);
                employeeId = emp.employeeId;
                // console.log(employeeId);
            })
            .catch(err => console.log('Creation Error ===>', err))

        if (req.files) {

            let profileImage;
            // console.log(req.files.profilePicture[0].path);
            profileImage = req.files.profilePicture[0].path;

            const updateImage = {
                picture: encrypt(profileImage)
            };
            // console.log(employeeId);
            Employee.find(
                {
                    where: {
                        employeeId: employeeId
                    }
                })
                .then(employee => {
                    // console.log(employeeId);
                    employee.updateAttributes(updateImage);
                })
                .catch(err => console.log(err))
            documentOne = req.files.documentOne[0].path;
            documentTwo = req.files.documentTwo[0].path;
            const updateDocument = {
                documentOne: encrypt(documentOne),
                documentTwo: encrypt(documentTwo)
            }
            Employee.find({
                where: {
                    employeeId: employeeId
                }
            })
                .then(employee => {
                    employee.updateAttributes(updateDocument)
                })
                .catch(err => console.log(err))
        }
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.getDecrypt = (req, res, next) => {
    try {
        const employee = [];
        Employee.findAll({
            where: {
                isActive: true
            },
            include: [
                { model: City },
                { model: State },
                { model: Location },
                { model: Country }
            ]
        })
        .then(emp => {
            emp.map(item => {
                item.firstName = decrypt(item.firstName);
                item.middleName = decrypt(item.middleName);
                item.lastName = decrypt(item.lastName);
                item.CTC = decrypt(item.CTC);
                item.startDate = decrypt(item.startDate);
                item.endDate = decrypt(item.endDate);
                item.picture = decrypt(item.picture);
                item.documentOne = decrypt(item.documentOne);
                item.documentTwo = decrypt(item.documentTwo);
                employee.push(item);
            })
            if (employee) {
                return res.status(httpStatus.OK).json({
                    message: "Employee Content Page",
                    employee
                });
            }
        })
        .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.updateEncrypt = (req, res, next) => {
    try {
        const id = req.params.id;

        console.log("ID ===>", id);

        if(!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Id is missing" });
        }
        const update = req.body;

        console.log("Update ===>", update);

        if (!update) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Please try again " });
        }
        // update.map(item => {
        //     item.firstName = encrypt(item.firstName)
        // })
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}