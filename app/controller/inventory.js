const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const Inventory = db.inventory;
const Assets = db.assets;
const AssetsType = db.assetsType;

exports.create = async (req, res, next) => {
    try {
        console.log("creating inventory");
        console.log("userId==>",req.userId)
        let body = req.body;
        body.userId = req.userId;
        const inventory = await Inventory.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Inventory successfully created",
            inventory
        });
    } catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const inventory = await Inventory.findAll({where:{isActive:true},
        include:[
            {model:Assets},
            {model:AssetsType}
        ]
        });
        if(inventory){
            return res.status(httpStatus.OK).json({
                message: "Inventory Content Page",
                inventory:inventory
            });
        }
    }catch(error){
        console.log("error==>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.update = async(req,res,next) => {
    try{
        const id = req.params.id;
        console.log("id==>",id)
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;

        console.log("update",update)

        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedInventory = await Inventory.find({where:{inventoryId:id}}).then(inventory => {
            return inventory.updateAttributes(update)
          })
        if(updatedInventory){
            return res.status(httpStatus.OK).json({
                message: "Inventory Updated Page",
                updatedInventory
            });
        }
    }catch(error){
        console.log("error==>",error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.delete = async(req,res,next) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;
        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedInventory= await Inventory.find({where:{inventoryId:id}}).then(inventory => {
            return inventory.updateAttributes(update)
          })
        if(updatedInventory){
            return res.status(httpStatus.OK).json({
                message: "Inventory deleted successfully",
                updatedInventory
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}






