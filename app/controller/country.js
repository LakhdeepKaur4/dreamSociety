const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Country = db.country;

exports.create = (req,res) => {
    console.log("creating country");
    console.log("body",req.body)
    let body = req.body;
    body.userId = req.userId;
    Country.create({
        countryName:body.countryName,
        code:body.code,
        currency:body.currency,
        phoneCode:body.phoneCode,
        userId:body.userId
    }).then(country =>{
        res.status(200).json({message:"Country added successfully!",country:country});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Country.findAll({where:{isActive:true}})
      .then(country => {
        res.json(country);
      });
    }

exports.getById = (req,res) => {
    Country.findOne({
       where: {id: req.userId},
   }).then(country => {
    res.status(200).json({
        "description": "Country Content Page",
        "country": country
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not Country Page",
        "error": err
    });
})
}

exports.update = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    const updates = req.body.updates;
    Country.find({
        where: { countryId: id }
      })
      .then(country => {
        return country.updateAttributes(updates)
      })
      .then(updatedCountry => {
        res.json({message:"Country updated successfully!",updatedCountry:updatedCountry});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    Country.destroy({
      where: { countryId: id }
    })
      .then(deletedCountry => {
        res.json({message:"Country deleted successfully!",deletedCountry:deletedCountry});
      });
}


