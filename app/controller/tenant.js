const db = require('../config/db.config.js');
const config = require('../config/config.js');
const httpStatus = require('http-status');
var passwordGenerator = require('generate-password');

const Tenant = db.tenant;
const TenantMembersDetail = db.tenantMembersDetail;

exports.create = async (req, res, next) => {
    try {
        console.log("creating owner");
        let tenantBody = req.body;
        let memberBody = req.body;
        tenantBody.userId = req.userId;
        let customVendorName = req.body.ownerName;
        const userName = customVendorName + 'T' + req.body.towerId + req.body.flatDetailId;
        console.log("userName==>", userName);
        tenantBody.userName = userName;
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        tenantBody.password = password;
        const tenant = await Tenant.create(tenantBody);
        const tenantId = tenant.tenantId;
        if (req.files) {
            profileImage = req.files.profilePicture[0].path;
            // }
            const updatedImage = {
                picture: profileImage
            };
            const imageUpdate = await Tenant.find({ where: { tenantId: tenantId } }).then(tenant => {
                return tenant.updateAttributes(updatedImage)
            })
        }
         if (tenantBody.noOfMembers) {
            // memberBody.userId = req.userId;
            // memberBody.tenantId = tenantId;
            const tenantMember = TenantMembersDetail.bulkCreate(req.body.member, { returning: true },
                {
                    fields: ["memberName", "memberDob", "relationId"],
                    // updateOnDuplicate: ["name"] 
                })
            console.log("ownerMember==>", tenantMember);
            const bodyToUpdate = {
                ownerId: req.body.ownerId,
                userId: req.userId
            }
            const tenantMemberUpdate = await TenantMembersDetail.find({ where: { memberId: tenantMember.memberId } }).then(ownerMember => {
                return tenantMember.updateAttributes(bodyToUpdate);
            })
            // const tenantMember = await OwnerMembersDetail.create(memberBody);
        //    }
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
            return res.status(httpStatus.CREATED).json({
                message: "Tenant Content Page",
                owner
            });
        }
    } catch (error) {
        console.log("error==>", error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}