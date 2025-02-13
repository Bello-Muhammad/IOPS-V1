const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    localGovernmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocalGovernment',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;