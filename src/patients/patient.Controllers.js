const { getState } = require("../location/services/state.Services");
const { newPatient, getPatients, getOnePatient, editPatient, removePatient } = require("./patient.Services");

class PatientController {

    /**
     * @description add a patient
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async addPatient ( req, res ) {
        try {
            const { body } = req;

            const data = await newPatient(body);

            return res.status(200).json({
                status: 'success',
                message: 'patient added successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                message: 'patient data not added',
                err: err.message
            })
        }
    };

    /**
     * @description fetch all patient
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getAllPatient ( req, res ) {
        try {
            const { session: { user }} = req;
            const data = await getPatients(user);

            return res.status(200).json({
                status: 'success',
                message: 'all patients fetch successfully',
                data
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                status: 'failed',
                message: 'patient data not added',
                err: err.message
            })
        }
    };

    /**
     * @description getting a patient details
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getOnePatient ( req, res ) {
        const { session: { user }, params: { patientId} } = req;
        try {
            const data = await getOnePatient(patientId);

            return res.status(200).json({
                status: 'success',
                message: 'patient details fetch successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'patient data not added',
                err: err.message
            })
        }
    };

    /**
     * @description updating a patient details
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async updatePatient ( req, res ) {
        try {
            const { body, params: { patientId } } = req;

            const data = await editPatient(body, patientId);

            return res.status(201).json({
                status: 'success',
                message: 'patient data updated successfully',
                data
            })
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'patient data not added',
                err: err.message
            })
        }
    };

    /**
     * @description remove patient details
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async removeOnePatient ( req, res ) {
        try {
            const { params: { patientId } } = req;

            const data = await removePatient(patientId);

            return res.status(201).json({
                status: 'success',
                message: 'patient remove successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'patient data not added',
                err: err.message
            })
        }
    };
}

module.exports = PatientController;