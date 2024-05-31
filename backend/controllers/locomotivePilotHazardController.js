const locomotivePilotHazardModel = require ("../models/locomotivePilotHazardModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {hazardID,locomotivePilotID,Location,typeOfHazard,Time ,locomotivePilotEmail } =req.body;
    try{
        const locomotivePilotHazard=await locomotivePilotHazardModel.create({hazardID,locomotivePilotID,Location,typeOfHazard,Time,locomotivePilotEmail })
        res.status(200).json(locomotivePilotHazard)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};