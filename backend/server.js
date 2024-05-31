const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
app.use(express.json());

// declare task name 
const taskRoutes=require('./routes/taskRoute');

const AdministrativeOfficerRoutes=require('./routes/AdministrativeOfficerRoute');
const LocationRoute=require('./routes/LocationRoute');
const weatherHazardRoute=require('./routes/weatherHazardRoute');
const locomotivePilotRoute=require('./routes/locomotivePilotRoute');
const locomotivePilotHazardRoute=require('./routes/locomotivePilotHazardRoute');


// app.get("/",(req, res) => {
//   res.send("Hello World vino saniyan madu mathgu fsdfsdfsdfsd vino mathu gdfgd fgsdf f");
// });


// app.listen("4000",() =>{
//     console.log("listening to 4000");
// });

//midleware
app.use((req,res,next)=>{
    console.log("path"+ req.path + "method" +req.method );
    next();
  });


// database connection 
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.port,() => {
    console.log("DB Connected Successfully listening to "+process.env.port);
});
})
.catch((error)=>console.log(error));

// connect route 
app.use("/api/tasks",taskRoutes);

app.use("/api/AdministrativeOfficer",AdministrativeOfficerRoutes);

app.use("/api/location",LocationRoute);
app.use("/api/weatherHazard",weatherHazardRoute);
app.use("/api/locomotivePilot",locomotivePilotRoute);
app.use("/api/locomotivePilotHazard",locomotivePilotHazardRoute);


