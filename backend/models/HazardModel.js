const mongoose = require('mongoose');
const { Schema } = mongoose;

const HazardSchema = new Schema(
    {
        
        hazardId: {
            type: String, 
            unique: true
        },
        hazardType: {
            type: String,
            required: true,
            enum : ['Elephant','Bull','Potancial Hazard'] // need to  change
        },
        time: {
            type: Date,
            default: Date.now
        },
        location: {
            type: String,
            required: true,
            // enum:['jaffna'] // need to change
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
// Pre-save hook to customize hazard ID generation
HazardSchema.pre('save', function(next) {
    if (!this.isModified('hazardId') || !this.isNew) {
        return next();
    }

    // Generate hazard ID based on the first letter of location type
    const firstLetter = this.hazardType.charAt(0).toUpperCase();
    const secondLetter = this.hazardType.charAt(1).toUpperCase();
    const idCount = this.constructor.countDocuments({ hazardType: this.hazardType });

    idCount.then(count => {
        const paddedCount = (count + 1).toString().padStart(3, '0');
        this.hazardId = `${firstLetter}${secondLetter}${paddedCount}`;
        next();
    }).catch(err => {
        next(err);
    });
});



const Hazard = mongoose.model('Hazard', HazardSchema);


module.exports = Hazard;

