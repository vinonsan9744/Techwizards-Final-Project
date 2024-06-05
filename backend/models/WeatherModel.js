const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationModel = require('./LocationModel');

const WeatherSchema = new Schema(
    {
        
        WeatherID: {
            type:String,
            unique: true,
            match: [/^WID\d{3}$/, 'Weather_ID must match the format "AD###"']

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
        }
       
    },
   
    {
        timestamps: true
    }
);
// Function to generate AD_ID before saving
WeatherSchema.statics.generateWeatherID = async function() {
    const count = await this.countDocuments({});
    return `WID${(count + 1).toString().padStart(3, '0')}`;
  };
  // Pre-save hook to generate AD_ID before saving
  WeatherSchema.pre('save', async function(next) {
    if (!this.WeatherID) {
      try {
        this.WeatherID = await this.constructor.generateWeatherID();
      } catch (err) {
        return next(err);
      }
    }
});

// Pre-save hook to generate WeatherID and set next_location before saving
WeatherSchema.pre('save', async function(next) {
    if (!this.WeatherID) {
        try {
            this.WeatherID = await this.constructor.generateWeatherID();
        } catch (err) {
            return next(err);
        }
    }

    if (this.isNew || this.isModified('current_location')) {
        try {
            const currentLocation = await mongoose.model('Location').findById(this.current_location);
            if (!currentLocation) {
                return next(new Error('Current location not found'));
            }

            const nextLocation = await mongoose.model('Location').findOne({ 
                locationName: { $gt: currentLocation.locationName }
            }).sort({ locationId: 1 });

            if (!nextLocation) {
                return next(new Error('Next location not found'));
            }

            this.next_location = nextLocation._id;
        } catch (err) {
            return next(err);
        }
    }
    
    next();
});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;

