const db = require('../config/db.config.js');
const config = require('../config/config.js');

const City = db.city;

exports.create = (req,res) => {
    console.log("creating city");

    City.create({
        cityName:req.body.cityName,
        cityId:req.body.cityId,
        stateId:req.body.stateId,
    }).then(city =>{
        res.json({message:"City added successfully!",city:city});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.create = (req,res) => {
    console.log("creating city");

    City.create({
        cityName:req.body.cityName,
        cityId:req.body.cityId,
        stateId:req.body.stateId,
    }).then(city =>{
        res.json({message:"City added successfully!",city:city});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
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
        const updatedCity = await City.find({where:{cityId:id}}).then(city => {
            return city.updateAttributes(update)
          })
        if(updatedCity){
            return res.status(httpStatus.OK).json({
                message: "City deleted successfully",
                city:updatedCity
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

