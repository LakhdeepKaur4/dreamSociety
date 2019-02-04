const db = require('../config/db.config.js');
const config = require('../config/config.js');

const City = db.city;

exports.create = (req,res) => {
    console.log("creating city");

    City.create({
        cityName:req.body.cityName,
        countryId:req.body.countryId,
        stateId:req.body.stateId,
    }).then(city =>{
        res.json({message:"City added successfully!",city:city});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    City.findAll()
      .then(cities => {
        res.json(cities);
      });
    }

exports.getById = (req,res) => {
   City.findAll({
       where: {stateId: req.params.id},
   }).then(city => {
    res.status(200).json(
         city
     );
}).catch(err => {
    res.status(500).json({
        "description": "Can not city Page",
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
    City.find({
        where: { cityId: id }
      })
      .then(city => {
        return city.updateAttributes(updates)
      })
      .then(updatedCity => {
        res.json({message:"City updated successfully!",updatedCity:updatedCity});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    City.destroy({
      where: { cityId: id }
    })
      .then(deletedCity => {
        res.json({message:"City deleted successfully!",deletedCity:deletedCity});
      });
}


