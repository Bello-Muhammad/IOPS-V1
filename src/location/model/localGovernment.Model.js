const mongoose = require('mongoose');

const localGovernmentSchema = new mongoose.Schema({
    localGovernment: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
},
{
    timestamps: true
});

localGovernmentSchema.virtual('patient', {
    ref: 'Patient',
    localField: '_id',
    foreignField: 'localGovernmentId'
});

localGovernmentSchema.virtual('assignLocation', {
    ref: 'AssignLocation',
    localField: '_id',
    foreignField: 'localGovernmentId'
});

const LocalGovernment = mongoose.model('LocalGovernment', localGovernmentSchema);

module.exports = LocalGovernment;