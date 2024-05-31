const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/locomotivePilotController")


router.post("/",createTask);


module.exports = router;