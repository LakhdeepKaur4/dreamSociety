const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');
var passwordGenerator = require('generate-password');

const Owner = db.owner;
const OwnerMember =db.ownerMember;

exports.create = async (req, res, next) => {
    try {
        console.log("creating owner");
        let ownerBody = req.body;
        let memberBody = req.body;
        body.userId = req.userId;
        let customVendorName = req.body.ownerName;
        const userName = customVendorName + 'O' + req.body.towerId + req.body.flatDetailId;
        console.log("userName==>",userName);
        body.userName= userName;
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        body.password =password;
        console.log("password==>",password);
        console.log("body===>", body);
        const owner = await Owner.create(ownerbody);
        const ownerId = owner.ownerId;
        if(ownerBody.noOfMembers){
        for(i=0;i<ownerBody.noOfMembers;i++){
            memberBody.ownerId= ownerId;
            const ownerMember = await OwnerMember.create(memberBody);
        }
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