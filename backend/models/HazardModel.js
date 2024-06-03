const mongoose = require('mongoose');
const { Schema } = mongoose;

const HazardSchema = new Schema(
    {
        
      
        hazardId: {
        type: Schema.Types.ObjectId,
        auto: true,
        primary: true
        },
        type: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
  
       
    },
    {
        timestamps: true
    }
);


const Hazard = mongoose.model('Hazard', HazardSchema);


module.exports = Hazard;

