const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema(
    {
        
        locationId: {
            type: String, 
            required: true, 
            unique: true
        },
      
        locationName: {
            type: String,
            required: true
        },
        locationType: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
  
       
    },
    {
        timestamps: true
    }
);


const Location = mongoose.model('Location', LocationSchema);


module.exports = Location;

