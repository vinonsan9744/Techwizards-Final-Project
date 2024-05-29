const administrativeOfficerModel = require ("../models/administrativeOfficerModel");

// to create a post method 
const createTask = async(req,res)=>{
    const { AD_ID,Name,Email,Password} =req.body;
    try{
        const AdministrativeOfficer=await administrativeOfficerModel.create({AD_ID,Name,Email,Password})
        res.status(200).json(AdministrativeOfficer)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};