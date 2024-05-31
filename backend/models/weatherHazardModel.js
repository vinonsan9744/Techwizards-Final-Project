// weatherHazardModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for weather hazard
const weatherHazardSchema = new mongoose.Schema({
    HazardID: {
        type: String,
        required: true
    },
    WeatherID: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    visibility: {
        type: Number,
        required: true
    },
    typeofHazard: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const WeatherHazard = mongoose.model('WeatherHazard', weatherHazardSchema);
module.exports = WeatherHazard;
