const { createState, getStates, getState, updateOneState, deleteState } = require("../services/state.Services");

/**
 * @description class will implement functionality for location
 * @class Location
 */
class StateController {

    /**
     * @description create state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async addState (req, res) {
        try {
            const { body: { state } } = req;
            const data = await createState(state);

            return res.status(201).json({
                status: 'success',
                message: 'state added successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    /**
     * @description fetching all state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getAllStates (req, res) {
        try {
            const data = await getStates();

            return res.status(200).json({
                status: 'success',
                message: 'states fetched successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    /**
     * @description fetch a state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getOneState (req, res) {
        try {
            const { stateId } = req.params;
            const data = await getState(stateId);

            return res.status(200).json({
                status: 'success',
                message: 'state fetched successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message) 
        }
    }

    /**
     * @description edit a state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async editState (req, res) {
        try {
            const { params: { stateId }, body: { state } } = req;
            const data = await updateOneState(stateId, state);

            return res.status(201).json({
                status: 'success',
                message: 'state updated successfully',
                data
            })
        } catch (err) {
            return res.status(400).send('internal error: ', err.message)
        }
    }

    /**
     * @description delete a state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async deleteOneState (req, res) {
        try {
            const { stateId  } = req.params;
            const data = await deleteState(stateId);

            return res.status(201).json({
                status: 'success',
                message: 'state delete successfully',
                data
            })
        } catch (err) {
            return res.status(400).send('internal error: ', err.message)
        }
    }
}

module.exports = StateController