const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/administrativeOfficerController")


router.post("/",createTask);


module.exports = router;