const taskModel = require ("../models/TaskModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {Name,Subjects} =req.body;
    try{
        const Task=await taskModel.create({Name,Subjects})
        res.status(200).json(Task)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};