const mongoose = require('mongoose');
const LocalGovernment = require('./localGovernment.Model');

const stateSchema = new mongoose.Schema({
    state: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    }
},
{
    timestamps: true
});

stateSchema.virtual('localGovernment', {
    ref: 'LocalGovernment',
    localField: '_id',
    foreignField: 'stateId'
});

stateSchema.virtual('assignLocation', {
    ref: 'AssignLocation',
    localField: '_id',
    foreignField: 'stateId'
});

const State = mongoose.model('State', stateSchema);

module.exports = State;