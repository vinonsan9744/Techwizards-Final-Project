const LocationModel = require ("../models/LocationModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {locationId,locationName,locationType,contactNumber} =req.body;
    try{
        const Location=await LocationModel.create({locationId,locationName,locationType,contactNumber})
        res.status(200).json(Location)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};