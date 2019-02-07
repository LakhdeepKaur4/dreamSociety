const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Flat = db.flat;
const Society = db.society;
const Size = db.size;

exports.create = (req,res) => {
console.log("creating flat");
let body = req.body;
body.userId = req.userId;
console.log("req.body==>",req.body)
    Flat.create({
        flatType:req.body.flatType,
        coverArea:req.body.coverArea,
        flatSuperArea:req.body.flatSuperArea,
        societyId:req.body.societyId,
        sizeId:req.body.sizeId,
        userId:req.userId
    }).then(flat =>{
        res.json({message:"Flat added successfully!",flat:flat});
    }).catch(err => {
        // console.log("error===>",err)
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Flat.findAll({
        where:{
            isActive:true
        },
        include:[
            {model:Society,
            attributes: ['societyId', 'societyName']},	
            {model:Size,
             attributes: ['sizeId', 'sizeType']},
    ]  
    })
      .then(flat => {
        res.json(flat);
      });
    }

exports.getById = (req,res) => {
    Flat.findOne({
       where: {id: req.userId},
   }).then(flat => {
    res.status(200).json({
        "description": "Flat Content Page",
        "flat": flat
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not Flat Page",
        "error": err
    });
})
}

exports.update = (req,res) => {
    const id = req.params.id;
    
    if(!id || id === undefined){
        res.status(422).json("Please enter id");
    }
    const updates = req.body;
    console.log("flat update ===>",updates)
    Flat.find({
        where: { flatId: id }
      })
      .then(flat => {
        return flat.updateAttributes(updates)
      })
      .then(updatedFlat => {
        res.json({message:"Flat updated successfully!",updatedFlat:updatedFlat});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    console.log("id==>",id)
    if(!id || id === undefined){
        res.json("Id missing");
    }
    const updates = req.body;
    console.log("update====>>>>",updates)
    Flat.find({
        where: { flatId: id }
      })
      .then(flat => {
        return flat.updateAttributes(updates)
      })
      .then(deletedFlat => {
        res.json({message:"Flat deleted successfully!",deletedFlat:deletedFlat});
      });
}


