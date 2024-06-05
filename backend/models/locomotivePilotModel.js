// locomotivePilotModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

function generatepassword(length = 8) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
      password += charset[bytes[i] % charset.length];
    }
    return password;
  }
  


// Define the schema for locomotive pilot
const locomotivePilotSchema = new mongoose.Schema({
    locomotivePilotID: {
        type: String,
        unique: true,
        match: [/^LID\d{3}$/, 'LD_ID must match the format "AD###"']
    },
    locomotiveName: {
        type: String,
        required: true,
        unique:true
    },
    
    locomotiveEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: false,
        unique: true 

    },
    locomotivePhoneNo: {
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
// Function to generate locomotivePilotID before saving
locomotivePilotSchema.statics.generatelocomotivePilotID = async function() {
    const count = await this.countDocuments({});
    return `LID${(count + 1).toString().padStart(3, '0')}`;
  };
  
  // Pre-save hook to generate locomotivePilotID before saving
  locomotivePilotSchema.pre('save', async function(next) {
    if (!this.locomotivePilotID) {
      try {
        this.locomotivePilotID = await this.constructor.generatelocomotivePilotID();
      } catch (err) {
        return next(err);
      }
    }
  
    // Generate a password if not provided
    if (!this.password) {
      this.password = generatepassword();
    }
  
    next();
  });
  

// Create and export the model
const LocomotivePilot = mongoose.model('LocomotivePilot', locomotivePilotSchema);
module.exports = LocomotivePilot;
