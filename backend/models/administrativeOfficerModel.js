const mongoose = require('mongoose');
const { Schema } = mongoose;

const administrativeOfficerSchema = new mongoose.Schema({
    AD_ID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
}, { timestamps: true });

const AdministrativeOfficer = mongoose.model('AdministrativeOfficer', administrativeOfficerSchema);

module.exports = AdministrativeOfficer;
