const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');
var passwordGenerator = require('generate-password');
const key = config.secret;
const fs = require('fs');
const crypto = require('crypto')

const Owner = db.owner;
const OwnerMembersDetail = db.ownerMembersDetail;
const FlatDetail = db.flatDetail;
const Tower = db.tower;

function encrypt(key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

function decrypt(key, data) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

exports.create = async (req, res, next) => {
    try {
        console.log("creating owner");
        let ownerBody = req.body;
        let memberBody = req.body;
        ownerBody.userId = req.userId;
        let customVendorName = req.body.ownerName;
        const userName = customVendorName + 'O' + req.body.towerId + req.body.flatDetailId;
        console.log("userName==>", userName);
        ownerBody.userName = userName;
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        ownerBody.password = password;
        // userName: encrypt(key,userName),
        // let encryptedOwnerBody = {
        //     userName: encrypt(key, userName),
        //     password: password,
        //     ownerName: encrypt(key, ownerBody.ownerName),
        //     dob: encrypt(key, ownerBody.dob),
        //     email: encrypt(key, ownerBody.email),
        //     contact: encrypt(key, ownerBody.contact),
        //     picture: encrypt(key, ownerBody.picture),
        //     bankName: encrypt(key, ownerBody.bankName),
        //     accountHolderName: encrypt(key, ownerBody.accountHolderName),
        //     accountNumber: encrypt(key, ownerBody.accountNumber),
        //     IFSCCode: encrypt(key, ownerBody.IFSCCode),
        //     panCardNumber: encrypt(key, ownerBody.panCardNumber),
        // }
        const owner = await Owner.create(ownerBody);
        const ownerId = owner.ownerId;
        if (req.files) {
            profileImage = req.files.profilePicture[0].path;
            // }
            const updatedImage = {
                picture: profileImage
            };
            const imageUpdate = await Owner.find({ where: { ownerId: ownerId } }).then(owner => {
                return owner.updateAttributes(updatedImage)
            })
        }
        if (ownerBody.noOfMembers) {
            memberBody.userId = req.userId;
            memberBody.ownerId = ownerId;
            const ownerMember = OwnerMembersDetail.bulkCreate(req.body.memberArray, { returning: true },
                {
                    fields: ["memberName", "memberDob", "relationId"],
                    // updateOnDuplicate: ["name"] 
                })
            console.log("ownerMember==>", ownerMember);
            const bodyToUpdate = {
                ownerId: ownerId,
                userId: req.userId
            }
            const ownerMemberUpdate = await OwnerMembersDetail.find({ where: { memberId: ownerMember.memberId } }).then(ownerMember => {
                return ownerMember.updateAttributes(bodyToUpdate);
            })
            // }
            // let encryptedMemberBody = {
            //     memberName: encrypt(key, ownerBody.contact),
            //     memberDob: encrypt(key, ownerBody.picture),
            //     userId: req.userId,
            // }
            // const ownerMember = await OwnerMembersDetail.create(memberBody);
            //    }
        }
        return res.status(httpStatus.CREATED).json({
            message: "Owner successfully created",
            owner
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.test = async (req, res, next) => {
    try {
        console.log("creating owner");
        let ownerBody = req.body;
        let memberBody = req.body;
        ownerBody.userId = req.userId;
        let customVendorName = req.body.ownerName;
        const userName = customVendorName + 'O' + req.body.towerId + req.body.flatDetailId;
        console.log("userName==>", userName);
        ownerBody.userName = userName;
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        ownerBody.password = password;
        const owner = await Owner.create(ownerBody);
        const ownerId = owner.ownerId;
        if (req.files) {
            profileImage = req.files.profilePicture[0].path;
            // }
            const updatedImage = {
                picture: profileImage
            };
            const imageUpdate = await Owner.find({ where: { ownerId: ownerId } }).then(owner => {
                return owner.updateAttributes(updatedImage)
            })
        }
        if (ownerBody.noOfMembers) {

            // let result = [];
            // console.log("no of members===",ownerBody.noOfMembers);
            // result = Object.keys(ownerBody);
            // for (i = 1; i <= ownerBody.noOfMembers; i++) {
            //  result.forEach(item => {
            //      let memberName = item + [i];
            //      console.log(memberName);
            // if(item === 'memberName+[i]'){

            // }
            //      })
            // // let ownerMemberBody = {};
            // // let test = ownerBody.memberName1;
            // // console.log(test)
            // // console.log(test + [i])
            // // console.log(ownerBody.memberName+[i]);
            // // //  const body= {
            // // //         ownerId = ownerId,
            // // //         userId = req.userId,
            // //     }
            memberBody.userId = req.userId;
            memberBody.ownerId = ownerId;
            const ownerMember = await OwnerMembersDetail.create(memberBody);
            //    }
        }
        //    const ownerMember =  OwnerMembersDetail.bulkCreate(req.body.memberArray, 
        //         {
        //             fields:["memberName", "memberDob", "relationId"] ,
        //             // updateOnDuplicate: ["name"] 
        //         } )
        //         console.log("ownerMember==>",ownerMember);
        //         const bodyToUpdate = {
        //         ownerId :ownerId,
        //         userId:req.userId
        //         }
        //         const ownerMemberUpdate = await OwnerMember.find({ where: { memberId: ownerMember.memberId } }).then(ownerMember => {
        //             return ownerMember.updateAttributes(bodyToUpdate);
        //         })
        // }
        return res.status(httpStatus.CREATED).json({
            message: "Owner successfully created",
            owner
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const owner = await Owner.findAll({
            // where: { isActive: true },
            order: [['createdAt', 'DESC']],
            // include: [{
            //     model: User,
            //     as: 'organiser',
            //     attributes: ['userId', 'userName'],
            // }]
        });
        if (owner) {
            return res.status(httpStatus.CREATED).json({
                message: "Owner Content Page",
                owner
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.getFlat = async (req, res, next) => {
    try {
        console.log("req.param id==>", req.params.id)
        const owner = await Owner.findAll({
            where: { towerId: req.params.id },
            order: [['createdAt', 'DESC']],
            include: [{
                model: Tower,
                // include: [
                //     { model: Tower }
                // ]
            }]
        });
        if (owner) {
            return res.status(httpStatus.CREATED).json({
                message: "Owner Flat Content Page",
                owner
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}