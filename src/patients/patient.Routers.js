const express = require('express');
const {
    addPatient,
    getAllPatient,
    getOnePatient,
    updatePatient,
    removeOnePatient,
} = require('./patient.Controllers');

const patientRouter = express.Router();

patientRouter.post('/add', addPatient);
patientRouter.get('/', getAllPatient);
patientRouter.get('/:patientId', getOnePatient);
patientRouter.patch('/:patientId', updatePatient);
patientRouter.delete('/:patientId', removeOnePatient);

module.exports = patientRouter;