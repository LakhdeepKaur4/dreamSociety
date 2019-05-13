const db = require("../config/db.config.js");
const config = require("../config/config.js");
const httpStatus = require("http-status");

const fs = require("fs");
const Op = db.Sequelize.Op;
const path = require("path");
const Vendor = db.vendor;
const PurchaseOrder = db.purchaseOrder;
const PurchaseOrderDetails = db.purchaseOrderDetails;
const pdf = require('html-pdf');
const pdfTemplate = require('../../public/documents/pdftemplate');


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
                fields: ["purchaseOrderDetailId","purchaseOrderType", "rate","quantity","amount","serviceStartDate","serviceEndDate", "issuedBy", "expDateOfDelievery", "relationId","memberRfId","flatDetailId","purchaseOrderId" ]
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
                fields: ["purchaseOrderDetailId","purchaseOrderType", "rate","quantity","amount","serviceStartDate","serviceEndDate", "issuedBy", "expDateOfDelievery", "relationId","memberRfId","flatDetailId","purchaseOrderId" ]
                // updateOnDuplicate: ["name"]
              }
        );
        purchaseOrderService.forEach(x => x.updateAttributes(update));

        pdf.create(pdfTemplate(purchaseOrderAssets.purchaseOrderService,purchaseOrder.issuedBy,purchaseOrder.expDateOfDelievery),{}).toFile('result.pdf',() => {
            if(err){
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            }
        })



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