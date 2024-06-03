const express=require('express')

const router=express.Router();

const{createTask
}=require("../controllers/HazardControllers")


router.post("/",createTask);


module.exports = router;