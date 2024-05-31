// locomotivePilotHazardModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for locomotive pilot hazard
const locomotivePilotHazardSchema = new mongoose.Schema({
    hazardID: {
        type: String,
        required: true
    },
    locomotivePilotID: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    typeOfHazard: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        default: Date.now
    },
    locomotivePilotEmail: {
        type: String,
        required: true
    }
});

// Create and export the model
const LocomotivePilotHazard = mongoose.model('LocomotivePilotHazard', locomotivePilotHazardSchema);
module.exports = LocomotivePilotHazard;
