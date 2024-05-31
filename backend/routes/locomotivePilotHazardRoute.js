const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/locomotivePilotHazardController")


router.post("/",createTask);


module.exports = router;