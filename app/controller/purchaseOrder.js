const db = require("../config/db.config.js");
const config = require("../config/config.js");
const httpStatus = require("http-status");


const fs = require("fs");
const key = config.secret;

const Op = db.Sequelize.Op;
const path = require("path");
const Vendor = db.vendor;
const PurchaseOrder = db.purchaseOrder;
const PurchaseOrderDetails = db.purchaseOrderDetails;
const pdf = require('html-pdf');
const pdfTemplate = require('../../public/documents/pdftemplate');
const mailjet = require('node-mailjet').connect('5549b15ca6faa8d83f6a5748002921aa', '68afe5aeee2b5f9bbabf2489f2e8ade2');


function decrypt(key, data) {
    var decipher = crypto.createDecipher('aes-128-cbc', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}


let mailToUser = (email, vendorId,purchaseOrder) => {
    const token = jwt.sign({
      data: 'foo'
    },
      'secret', {
        expiresIn: '24h'
      });
    vendorId = encrypt(key, vendorId.toString());
    const request = mailjet.post("send", {
      'version': 'v3.1'
    })
      .request({
        "Messages": [{
          "From": {
            "Email": "rohit.khandelwal@greatwits.com",
            "Name": "Greatwits"
          },
          "To": [{
            "Email": email,
            "Name": 'Atin' + ' ' + 'Tanwar'
          }],
          "Subject": "Purchase Order",
          "HTMLPart": `<b>Click on the given link to download your purchase order</b> <a href="http://mydreamsociety.com/login/tokenVerification?vendorId=${vendorId}&token=${token}&pdfDocument=purchaseOrder${purchaseOrder}">click here</a>`
        }]
      })
    request.then((result) => {
      console.log(result.body)
      // console.log(`http://192.168.1.105:3000/submitotp?userId=${encryptedId}token=${encryptedToken}`);
    })
      .catch((err) => {
        console.log(err.statusCode)
      })
  }

exports.create = async (req, res, next) => {
    try{
        let purchaseOrder = await PurchaseOrder.create({
            vendorId:req.body.vendorId,
            issuedBy:req.body.issuedBy,
            expDateOfDelievery:req.body.expectedDateOfDelievery
        });
        let purchaseOrderAssets = await PurchaseOrderDetails.bulkCreate(
            req.body.purchaseOrderAssetsArray, {
                returning: true
              }, {
                fields: ["purchaseOrderDetailId","purchaseOrderType","purchaseOrderName", "rate","quantity","amount","serviceStartDate","serviceEndDate", "issuedBy", "expDateOfDelievery","purchaseOrderId" ]
                // updateOnDuplicate: ["name"]
              }
        );
        let update = {
            purchaseOrderId:purchaseOrder.purchaseOrderId
        }
        purchaseOrderAssets.forEach(x => x.updateAttributes(update));




        let purchaseOrderService = await PurchaseOrderDetails.bulkCreate(
            req.body.purchaseOrderServiceArray, {
                returning: true
              }, {
                fields: ["purchaseOrderDetailId","purchaseOrderType", "rate","quantity","amount","serviceStartDate","serviceEndDate", "issuedBy", "expDateOfDelievery","purchaseOrderId" ]
                // updateOnDuplicate: ["name"]
              }
        );
        purchaseOrderService.forEach(x => x.updateAttributes(update));
        console.log("purchaseOrder =====> ", pdf)

        await pdf.create(pdfTemplate(purchaseOrderAssets,purchaseOrderService,purchaseOrder.issuedBy,purchaseOrder.expDateOfDelievery),{format: 'Letter'}).toFile(`./public/purchaseOrderPdfs/purchaseOrder${purchaseOrder.purchaseOrderId}.pdf`,(err,res) => {
            if(err){
               console.log("err ======>",err);
            }
            else if(res){
                console.log("res =======>", res);
            }

        });
        let vendor = Vendor.findOne({where:{isActive:true,vendorId:req.body.vendorId}})
        mailToUser(decrypt(key,vendor.email),vendor.vendorId,purchaseOrder.purchaseOrderId);
        console.log("dgsfhgsahjgfjah ===============>");
        return res.status(httpStatus.CREATED).json({
            message: "Purchase Order registered",
          });


    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);

    }
}

exports.get = async (req,res,next) => {
    try{
        let purchaseOrder = PurchaseOrder.findAll({where:{isActive:true},include:[{model:Vendor}]});
        return res.status(httpStatus.CREATED).json({
            message: "Purchase Order",
            purchaseOrder: purchaseOrder
          });

    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.delete = async (req,res,next) => {
    try{
        let id = req.params.id;

        if (!id) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
              message: "Id is missing"
            });
          }
          let update = {
            isActive: false
          };
        let purchaseOrder = await PurchaseOrder.findOne({where:{isActive:true,purchaseOrderId:id}});
        purchaseOrder.updateAttributes(update);
        const purchaseOrderDetails = await PurchaseOrderDetails.update(update, { where: { purchaseOrderId: id } })

        if (purchaseOrder && purchaseOrderDetails) {
            return res.status(httpStatus.OK).json({
              message: "PurchaseOrder deleted successfully",
            });
          }

    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}


exports.deleteSelected = async(req,res,next) => {
    try{
        const deleteSelected = req.body.ids;
        console.log("delete selected==>", deleteSelected);

        const update = { isActive: false };
        if (!deleteSelected) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "No id Found" });
        }
        const updatedPurchaseOrder = await PurchaseOrder.update(update, { where: { purchaseOrderId: { [Op.in]: deleteSelected } } });
        const updatedPurchaseOrderDetails = await PurchaseOrderDetails.update({where: { purchaseOrderId: { [Op.in]: deleteSelected } } });

        if (updatedPurchaseOrder && updatedPurchaseOrderDetails) {
            return res.status(httpStatus.OK).json({
              message: "PurchaseOrders deleted successfully",
            });
          }
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);

    }
}

exports.updatePurchaseOrder = async(req,res,next) => {
    try{
        let purchaseOrder = req.params.id;
        if(!purchaseOrder){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "No id Found" });
        };
        let update = req.body;
        let porder = await PurchaseOrder.findOne({where:{isActive:true,purchaseOrderId:id}});
        porder.updateAttributes(update);
        let purchaseOrderAssets = await PurchaseOrderDetails.findAll({where:{isActive:true,purchaseOrderId:id,purchaseOrderType:"Assets"}});
        let purchaseOrderService = await PurchaseOrderDetails.findAll({where:{isActive:true,purchaseOrderId:id,purchaseOrderType:"Service"}});
        await pdf.create(pdfTemplate(purchaseOrderAssets,purchaseOrderService,porder.issuedBy,porder.expDateOfDelievery),{format: 'Letter'}).toFile(`./public/purchaseOrderPdfs/purchaseOrder${porder.purchaseOrderId}.pdf`,(err,res) => {
            if(err){
               console.log("err ======>",err);
            }
            else if(res){
                console.log("res =======>", res);
            }

        });
        if(porder){
            return res.status(httpStatus.OK).json({
                message: "PurchaseOrders updated successfully",
              });
        }
    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);

    }
}

exports.updatePurchaseOrderDetails = async(req,res,next) => {
    try{

    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}