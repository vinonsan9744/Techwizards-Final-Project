// locomotivePilotHazardModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocomotivePilot = require('./locomotivePilotModel');

// Define the schema for locomotive pilot hazard
const locomotivePilotHazardSchema = new mongoose.Schema({
    hazardID: {
        type: String,
        unique: true,


    },
    locomotivePilotID: {
        type: String,
        required: false,
        match: [/^LID\d{3}$/, 'locomotivePilotID must match the format "LID###"']

    },
    Location: {
        type: String,
        required: true
    },
    typeOfHazard: {
        type: String,
        required: true,
        enum: ['Elephant', 'Bull', 'Potential Hazard', 'Others'] // corrected 'Potancial Hazard' to 'Potential Hazard'
        
    },
    Time: {
        type: Date,
        default: Date.now,
        required:true
    },
    locomotivePilotEmail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true //?? itha thookkina entha email m kudukkalm endu vanthirum

    }
});
// Pre-save hook to customize hazard ID generation
locomotivePilotHazardSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }

    // Generate hazard ID based on the first two letters of the hazard type
    const firstLetter = this.typeOfHazard.charAt(0).toUpperCase();
    const secondLetter = this.typeOfHazard.charAt(1).toUpperCase();
    
    // Count the number of hazards of the same type
    this.constructor.countDocuments({ typeOfHazard: this.typeOfHazard })
        .then(count => {
            const paddedCount = (count + 1).toString().padStart(3, '0');
            this.hazardID = `${firstLetter}${secondLetter}${paddedCount}`;
            next();
        })
        .catch(err => {
            next(err);
        });
});



// Create and export the model
const LocomotivePilotHazard = mongoose.model('LocomotivePilotHazard', locomotivePilotHazardSchema);
module.exports = LocomotivePilotHazard;
