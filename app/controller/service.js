const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Service = db.service;
const ServiceDetail = db.serviceDetail;

exports.create = (req,res) => {
    let body = req.body;
    body.userId = req.userId;
    console.log("req.body===>",req.body)
    console.log("creating service");
    if(!body.serviceName && !body.serviceDetailId){
      return res.status(422).json({message:"Parameters Missing"})
    }
    Service.create({
        serviceName:req.body.serviceName,
        serviceDetailId:req.body.serviceDetailId,
    }).then(service =>{
        // console.log("service==>",service)
        res.json({message:"Service added successfully!",service:service});
    }).catch(err => {
        console.log("service error==>",err)
    res.status(500).send("Fail! Error -> " + err);
})
}

exports.get = (req, res) => {
    Service.findAll({
        where:{
            isActive:true
        },	include: [{
			model: ServiceDetail,
			attributes: ['serviceDetailId','service_detail'],
		}]
    })
      .then(service => {
        res.json(service);
      });
    }

exports.getById = (req,res) => {
   Service.findOne({
       where: {id: req.userId},
   }).then(service => {
    res.status(200).json({
        "description": "Service Content Page",
        "service": service
    });
}).catch(err => {
    res.status(500).json({
        "description": "Can not service Page",
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
    Service.find({
        where: { serviceId: id }
      })
      .then(service => {
        return service.updateAttributes(updates)
      })
      .then(updatedService => {
        res.json({message:"Service updated successfully!",updatedService:updatedService});
      });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    if(!id){
        res.json("Please enter id");
    }
    Service.destroy({
      where: { serviceId: id }
    })
      .then(deletedService => {
        res.json({message:"Service deleted successfully!",deletedService:deletedService});
      });
}


