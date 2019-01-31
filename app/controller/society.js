const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Society = db.society;
const City = db.city;
const location = db.location;
const Country = db.country;
const State = db.state;
const User = db.user;

exports.create = (req,res) => {
console.log("creating society");
    Society.create({
        societyName:req.body.societyName,
        cityId:req.body.cityId,
        countryId:req.body.countryId,
        locationId:req.body.locationId,
        stateId:req.body.stateId,
        userId:req.body.userId,
    }).then(society =>{
        res.json({message:"Society added successfully!",society:society});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Society.findAll({
        include:[
            {model:City,
            attributes: ['cityId', 'cityName']},	
            {model:Country,
             attributes: ['countryId', 'countryName']},
            {model:State,
            attributes: ['stateId', 'stateName']},
            {model:User,
            attributes: ['userId', 'userId']},
            {model:location,
            attributes: ['locationId', 'locationId']}, 
    ]
    })
      .then(society => {
          if(society){
            res.json(society);
          }else{
            res.json({message:'Society Data Not Found'});
          }
      });
    }
    

exports.getById = (req,res) => {
    console.log("society===>",req.params.id)
     Society.findOne({
    where: {societyId: req.params.id},
    include:[
        {model:City,
        attributes: ['cityId', 'cityName']},
        {model:Country,
         attributes: ['countryId', 'countryName']},
        {model:State,
        attributes: ['stateId', 'stateName']},
        {model:User,
        attributes: ['userId', 'userId']},
        {model:location,
        attributes: ['locationId', 'locationId']}, 
]
}).then(society => {
    res.status(200).json({
        "description": "Society Content Page",
        "society": society
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not access Society Page",
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
    Society.find({
        where: { societyId: id }
      })
      .then(society => {
        return society.updateAttributes(updates)
      })
      .then(updatedSociety => {
        res.json({message:"State updated successfully!",updatedSociety:updatedSociety});
      });
}


exports.delete = (req,res) => {
    const id = req.params.id;
    console.log("id==>",id)
    if(!id){
        res.json("Please enter id");
    }
    Society.destroy({
      where: { societyId: id }
    })
      .then(deletedSociety => {
        res.json({message:"Society deleted successfully!",deletedSociety:deletedSociety});
      });
}

 