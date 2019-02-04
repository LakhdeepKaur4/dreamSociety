const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Size = db.size;

exports.create = (req,res) => {
    console.log("creating size");

    Size.create({
        sizeType:req.body.sizeType,
    }).then(size =>{
        res.json({message:"Size added successfully!",size:size});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Size.findAll({where:{isActive:false}})
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

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    Size.destroy({
      where: { sizeId: id }
    })
      .then(deletedSize => {
        res.json({message:"Size deleted successfully!",deletedSize:deletedSize});
      });
}

