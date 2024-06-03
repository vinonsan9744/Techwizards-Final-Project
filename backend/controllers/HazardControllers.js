const HazardModel = require ("../models/HazardModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {hazardId,type,time,location,description} =req.body;
    try{
        const Hazard=await HazardModel.create({hazardId,type,time,location,description})
        res.status(200).json(Hazard)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};





module.exports = {createTask};