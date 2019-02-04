const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const AssetsType = db.assetsType;
const Assets = db.assets;

exports.create = async (req, res, next) => {
    try {
        console.log("userId==>",req.userId)
        let body = req.body;
        body.userId = req.userId;
        console.log("body==>",req.body)
        const assetsType = await AssetsType.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "AssetsType successfully created",
            assetsType
        });
    } catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        const assetsType = await AssetsType.findAll({where:{isActive:true},
        include:[{model:Assets,attributes:['assetId','assetName']}]
        });
        if(assetsType){
            return res.status(httpStatus.CREATED).json({
                message: "AssetsType Content Page",
                assetsType:assetsType
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
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;

        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedAssetsType = await AssetsType.find({where:{assetTypeId:id}, include:[{model:Assets,attributes:['assetId','assetName']}]},).then(assetsType => {
            return assetsType.updateAttributes(update)
          })
        if(updatedAssetsType){
            return res.status(httpStatus.OK).json({
                message: "AssetsType Updated Page",
                assetsType:updatedAssetsType
            });
        }
    }catch(error){
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
        const updatedAssetsType = await AssetsType.find({where:{assetTypeId:id}}).then(assetsType => {
            return assetsType.updateAttributes(update)
          })
        if(updatedAssetsType){
            return res.status(httpStatus.OK).json({
                message: "AssetsType deleted successfully",
                assetsType:updatedAssetsType
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}
