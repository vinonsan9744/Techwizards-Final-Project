const mongoose = require('mongoose');
const { Schema } = mongoose;

const crypto = require('crypto');

function generatePassword(length = 16) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += charset[bytes[i] % charset.length];
  }
  return password;
}




const administrativeOfficerSchema = new mongoose.Schema({
    AD_ID: {
        type: String,
        unique: true,
        match: [/^AID\d{3}$/, 'AD_ID must match the format "AD###"']
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    Password: {
        type: String,
        require : true

    }
    
}, { timestamps: true });



// Function to generate AD_ID before saving
administrativeOfficerSchema.statics.generateAD_ID = async function() {
    const count = await this.countDocuments({});
    return `AID${(count + 1).toString().padStart(3, '0')}`;
};

// Pre-save hook to generate AD_ID before saving
administrativeOfficerSchema.pre('save', async function(next) {
    if (!this.AD_ID) {
        try {
            this.AD_ID = await this.constructor.generateAD_ID();
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const AdministrativeOfficer = mongoose.model('AdministrativeOfficer', administrativeOfficerSchema);

module.exports = AdministrativeOfficer;
