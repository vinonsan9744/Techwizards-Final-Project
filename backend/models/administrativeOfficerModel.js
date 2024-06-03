const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
        required: true
    }
}, { timestamps: true });

// Pre-save hook to hash the password
administrativeOfficerSchema.pre('save', async function(next) {
    if (this.isModified('Password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.Password = await bcrypt.hash(this.Password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

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
