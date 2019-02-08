const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Size = db.size;

exports.create = (req,res) => {
    console.log("creating size");
    let body = req.body;
    body.userId = req.userId;
    Size.create({
        sizeType:req.body.sizeType,
    }).then(size =>{
        res.json({message:"Size added successfully!",size:size});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Size.findAll({where:{isActive:true}})
      .then(size => {
        res.json(size);
      });
    }

exports.getById = (req,res) => {
   Size.findOne({
       where: {id: req.userId},
   }).then(size => {
    res.status(200).json({
        "description": "Size Content Page",
        "size": size
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not size Page",
        "error": err
    });
})
}

exports.update = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    const updates = req.body;
    Size.find({
        where: { sizeId: id }
      })
      .then(size => {
        return size.updateAttributes(updates)
      })
      .then(updatedSize => {
        res.json({message:"Size updated successfully!",updatedSize:updatedSize});
      });
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
        const updatedSize = await Size.find({where:{sizeId:id}}).then(size => {
            return size.updateAttributes(update)
          })
        if(updatedSize){
            return res.status(httpStatus.OK).json({
                message: "Size deleted successfully",
                event:updatedSize
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

