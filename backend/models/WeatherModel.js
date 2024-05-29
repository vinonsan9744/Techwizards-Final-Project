const mongoose = require('mongoose');
const { Schema } = mongoose;

const WeatherSchema = new Schema(
    {
        
        WeatherID: {
            type: Schema.Types.ObjectId,
            auto: true,
            primary: true
        },
        temperature: {
            type: Number,
            required: true
        },
        windSpeed: {
            type: Number,
            required: true
        },
        precipitation: {
            type: Number,
            required: true
        },
        visibility: {
            type: String,
            required: true
        },
        current_location: {
            type: String,
            required: true
        },
        next_location: {
            type: String,
            required: true
        }
       
    },
   
    {
        timestamps: true
    }
);


const Weather = mongoose.model('Weather', WeatherSchema);


module.exports = Weather;

