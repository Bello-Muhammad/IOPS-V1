const { createLocalGovernment, getLocalGovernments, getLocalgovernment, updateOneLocalGovernment, deleteLocalGovernment } = require("../services/localGovernment.Services");

/**
 * @description class will implement functionality for location
 * @class Location
 */
class LocalGovController {

    /**
     * @description create local government
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async addLocalGoventment (req, res) {
        try {
            const { body: { localGovernment, state } } = req;
            
            const data = await createLocalGovernment(localGovernment, state);

            return res.status(201).json({
                status: 'success',
                message: 'local government added successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    /**
     * @description fetching all local government in a state
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getAllLocalGovernment (req, res) {
        try {
            const { params: { stateId }} = req;
            const data = await getLocalGovernments(stateId);

            return res.status(200).json({
                status: 'success',
                message: 'all local government fetched successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    /**
     * @description fetch a localgovernment
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async getOneLocalGovernment (req, res) {
        try {
            const { lgId } = req.params;
            const data = await getLocalgovernment(lgId);

            return res.status(200).json({
                status: 'success',
                message: 'local government fetched successfully',
                data
            })
        } catch (err) {
            return res.status(400).send(err.message) 
        }
    }

    /**
     * @description edit a local government
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async editLocalGovernment (req, res) {
        try {
            const { params: { lgId }, body: { localGovernment } } = req;
            const data = await updateOneLocalGovernment(lgId, localGovernment);

            return res.status(201).json({
                status: 'success',
                message: 'local government updated successfully',
                data
            })
        } catch (err) {
            return res.status(400).send('internal error: ', err.message)
        }
    }

    /**
     * @description delete a local government
     * @param {object} req - Request object created by express for the route
     * @param {object} res - Response object created by express for the route
     * @returns {object} response object sent to the user
     */
    static async deleteoneLocalGovernment (req, res) {
        try {
            const { lgId  } = req.params;
            const data = await deleteLocalGovernment(lgId);

            return res.status(201).json({
                status: 'success',
                message: 'local government delete successfully',
                data
            })
        } catch (err) {
            return res.status(400).send('internal error: ', err.message)
        }
    }
}

module.exports = LocalGovController