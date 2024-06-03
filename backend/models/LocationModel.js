const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema(
    {
        locationId: {
            type: String, 
            unique: true
        },
        locationName: {
            type: String,
            required: true
        },
        locationType: {
            type: String,
            required: true,
            enum: ['Northern', 'Eastern'] // Adjusted enum values  need to change 
        },
        locationContactNumber: {
            type: String,
            required: true,
            match: [/^\d+$/, 'Phone number must contain only numeric characters'],
            validate: {
                validator: function(value) {
                    // Check if the contact number starts with  "07"
                    return /^(07)/.test(value);
                },
                message: 'Phone number must start with  "07"'
            },
            minlength:10,
            maxlenth:12
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to customize location ID generation
LocationSchema.pre('save', function(next) {
    if (!this.isModified('locationId') || !this.isNew) {
        return next();
    }

    // Generate location ID based on the first letter of location type
    const firstLetter = this.locationType.charAt(0).toUpperCase();
    const secondLetter = this.locationType.charAt(1).toUpperCase();
    const idCount = this.constructor.countDocuments({ locationType: this.locationType });

    idCount.then(count => {
        const paddedCount = (count + 1).toString().padStart(3, '0');
        this.locationId = `${firstLetter}${secondLetter}${paddedCount}`;
        next();
    }).catch(err => {
        next(err);
    });
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
