const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Location = db.location;

exports.create = (req,res) => {
    console.log("creating city");
    let body = req.body;
    body.userId = req.userId;
    Location.create({
        locationName:body.locationName,
        countryId:body.countryId,
        stateId:body.stateId,
        cityId:body.cityId,
    }).then(location =>{
        res.json({message:"Location added successfully!",location:location});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Location.findAll({where:{isActive:true},
        include:[{model:State,attributes:['stateId','stateName']},
        {model:Country,attributes:['countryId','countryName']},
        {model:City,attributes:['cityId','cityName']},
    ]
    })
      .then(location => {
        res.json(location);
      });
    }

exports.getById = (req,res) => {
    Location.findAll({
       where: {cityId: req.params.id},
   }).then(location => {
    res.status(200).json(
       location
    );
}).catch(err => {
    res.status(500).json({
        "description": "Can not Location Page",
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
    Location.find({
        where: { locationId: id }
      })
      .then(location => {
        return location.updateAttributes(updates)
      })
      .then(updatedLocation => {
        res.json({message:"Location updated successfully!",updatedLocation:updatedLocation});
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
        const updatedLocation = await City.find({where:{locationId:id}}).then(location => {
            return location.updateAttributes(update)
          })
        if(updatedLocation){
            return res.status(httpStatus.OK).json({
                message: "Location deleted successfully",
                location:updatedLocation
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

