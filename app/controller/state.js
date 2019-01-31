const db = require('../config/db.config.js');
const config = require('../config/config.js');

const State = db.state;

exports.create = (req,res) => {
    console.log("creating state");

    State.create({
        stateName:req.body.stateName,
        stateId:req.body.stateId,
        countryId:req.body.countryId,
        userId:req.body.userId
    }).then(state =>{
        res.json({message:"State added successfully!",state:state});
    }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    State.findAll()
      .then(state => {
        res.json(state);
      });
    }

exports.getById = (req,res) => {
    State.findOne({
       where: {id: req.userId},
   }).then(state => {
    res.status(200).json({
        "description": "State Content Page",
        "state": state
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not state Page",
        "error": err
    });
})
}

exports.getCountry = (req,res) => {
    State.findAll({
       where: {countryId: req.params.id},
   }).then(state => {
    res.status(200).json(state);
}).catch(err => {
    res.status(500).json({
        "description": "Can not state Page",
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
    State.find({
        where: { stateId: id }
      })
      .then(state => {
        return state.updateAttributes(updates)
      })
      .then(updatedState => {
        res.json({message:"State updated successfully!",updatedState:updatedState});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    State.destroy({
      where: { stateId: id }
    })
      .then(deletedState => {
        res.json({message:"State deleted successfully!",deletedState:deletedState});
      });
}


