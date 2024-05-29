const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/LocationController")

router.post("/",createTask);

module.exports = router;