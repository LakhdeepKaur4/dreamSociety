const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');
const passwordGenerator = require('generate-password');
const shortId = require('short-id');
const path = require('path');
const fs= require('fs');
const Op = db.Sequelize.Op;

const Tenant = db.tenant;
const TenantMembersDetail = db.tenantMembersDetail;

function saveToDisc(name,fileExt,base64String, callback){
    console.log("HERE ",name,fileExt);
    let d = new Date();
    let pathFile = "../../public/profilePictures/"+shortId.generate()+name+d.getTime()+Math.floor(Math.random()*1000)+"."+fileExt;
    let fileName = path.join(__dirname,pathFile);
    let dataBytes = Buffer.from(base64String,'base64');
    // console.log(base64String);
    fs.writeFile(fileName,dataBytes , function(err) {
        if(err) {
            callback(err);
        } else {
            callback(null,pathFile);
        }
    });
}  

exports.create = async (req, res, next) => {
    try {
        console.log("creating tenant");
        let tenantBody = req.body;
        let memberBody = req.body;
        let memberId = [];
        tenantBody.userId = req.userId;
        let customVendorName = tenantBody.tenantName;
        const userName = customVendorName + 'T' + tenantBody.towerId + tenantBody.flatDetailId;
        tenantBody.userName = userName;
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        tenantBody.password = password;
        const tenant = await Tenant.create(tenantBody);
        const tenantId = tenant.tenantId;
        if(req.body.profilePicture){
            saveToDisc(tenantBody.fileName,tenantBody.fileExt,tenantBody.profilePicture,(err,resp)=>{
                if(err){
                    console.log(err)
                }
                console.log(resp)
                    const updatedImage = {
                        picture: resp
                    };
                    Tenant.update(updatedImage, { where: { tenantId: tenantId}});
            });
            }
         if (tenantBody.noOfMembers) {
            memberBody.userId = req.userId;
            memberBody.tenantId = tenantId;
            const tenantMember =await TenantMembersDetail.bulkCreate(tenantBody.member, { returning: true },
                {
                    fields: ["memberName", "memberDob", "relationId","gender"],
                })
                tenantMember.forEach(item =>{
                    memberId.push(item.memberId)
                });
                const bodyToUpdate = {
                    userId: req.userId
                }
                const updatedMember = await TenantMembersDetail.update(bodyToUpdate, { where: { memberId: {[Op.in]:memberId}}});

    }
        return res.status(httpStatus.CREATED).json({
            message: "Tenant successfully created",
            tenant
        });
    } catch (error) {
        console.log("error==>", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async (req, res, next) => {
    try {
        const tenant = await Tenant.findAll({
            // where: { isActive: true },
            order: [['createdAt', 'DESC']],
            // include: [{
            //     model: User,
            //     as: 'organiser',
            //     attributes: ['userId', 'userName'],
            // }]
        });                
        if (tenant) {
            return res.status(httpStatus.OK).json({
                message: "Tenant Content Page",
                tenant
            });
        }
    } catch (error) {
        console.log("error==>", error)
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
        const updatedTenant= await Tenant.update(update, { where: { tenantId: { [Op.in]: deleteSelected } } })
        if (updatedTenant) {
            return res.status(httpStatus.OK).json({
                message: "Tenant deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
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
        const updatedTenant = await Tenant.find({ where: { tenantId: id } }).then(tenant => {
            return tenant.updateAttributes(update)
        })
        if (updatedTenant) {
            return res.status(httpStatus.OK).json({
                message: "Tenant deleted successfully",
                tenant: updatedTenant
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}