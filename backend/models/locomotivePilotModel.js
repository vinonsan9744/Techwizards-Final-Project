// locomotivePilotModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for locomotive pilot
const locomotivePilotSchema = new mongoose.Schema({
    locomotivePilotID: {
        type: String,
        required: true,
        unique: true
    },
    locomotiveName: {
        type: String,
        required: true
    },
    locomotivePhoneNo: {
        type: String,
        required: true
    },
    locomotiveEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the model
const LocomotivePilot = mongoose.model('LocomotivePilot', locomotivePilotSchema);
module.exports = LocomotivePilot;
