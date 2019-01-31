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
    Location.findAll({where:{isActive:true}})
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

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    Location.destroy({
      where: { locationId: id }
    })
      .then(deletedLocation => {
        res.json({message:"Location deleted successfully!",deletedLocation:deletedLocation});
      });
}


