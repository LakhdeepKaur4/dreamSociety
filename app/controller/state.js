const db = require('../config/db.config.js');
const config = require('../config/config.js');

const State = db.state;
const Country = db.country;

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
    State.findAll({where:{isActive:true},
        include:[{model:Country,attributes: ['countryId', 'countryName']}]
    })
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
        const updatedState = await State.find({where:{stateId:id}}).then(state => {
            return state.updateAttributes(update)
          })
        if(updatedState){
            return res.status(httpStatus.OK).json({
                message: "State deleted successfully",
                state:updatedState
            });
        }
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}


