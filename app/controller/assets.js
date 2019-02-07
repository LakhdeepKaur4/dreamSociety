const db = require('../config/db.config.js');
const httpStatus = require('http-status')

const Assets = db.assets;

exports.create = async (req, res, next) => {
    try {
        console.log("creating assets");
        console.log("userId==>",req.userId)
        let body = req.body;
        console.log("body===>",body)
        body.userId = req.userId;
        const assets = await Assets.create(body);
        return res.status(httpStatus.CREATED).json({
            message: "Assets successfully created",
            assets
        });
    } catch (error) {
        console.log("error==>",error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.get = async(req,res,next) => {
    try{
        // let limit = 10;
        // let offset = 0;
        // let page = req.params.page;
        // offset = limit * (page - 1);
        // const data = await Assets.findAndCountAll();
        // let pages = Math.ceil(data.count / limit);
        
        const assets = await Assets.findAll({where:{isActive:true}, 
            // limit: limit,
            // offset: offset,
            // $sort: { id: 1 }
        });
        if(assets){
            return res.status(httpStatus.CREATED).json({
                message: "Assets Content Page",
                assets:assets
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
        const updatedAssets = await Assets.find({where:{assetId:id}}).then(assets => {
            return assets.updateAttributes(update)
          })
        if(updatedAssets){
            return res.status(httpStatus.OK).json({
                message: "Assets Updated Page",
                assets:updatedAssets
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
        console.log("in asserts delete ==>",id)
        if(!id){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Id is missing"});
        }
        const update = req.body;
        if(!update){
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message:"Please try again "});
        }
        const updatedAssets = await Assets.find({where:{assetId:id}}).then(assets => {
            return assets.updateAttributes(update)
          })
        if(updatedAssets){
            return res.status(httpStatus.OK).json({
                message: "Assets deleted successfully",
                assets:updatedAssets
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}






