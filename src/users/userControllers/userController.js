const { createUser, allUsers, getUser, updateOneUser, removeUser, changeUserPassword, userPost } = require("../userServices/userService");

class UserController {

    static async registerUser (req, res) {
        try {
            const { body } = req;
            const data = await createUser(body);
            if (body.role !== 'official')
                req.session.user = data;

           return res.status(201).json({
                status: 'success',
                message: 'account created successfully',
                data
            });
        } catch( err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to create account',
                err: err.message
            })
        }
        
    }

    static async getAllUsers (req, res) {
        try {
            const { query, session: { user }} = req;
            const data = await allUsers(query, user);

            return res.status(200).json({
                status: 'success',
                message: 'all users fetched successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to fetch users',
                err: err.message
            })
        }
    };

    static async getOneUser (req, res) {
        try {
            const { params: { userId }} = req;
            const data = await getUser(userId);
        
            return res.status(200).json({
                status: 'success',
                message: 'user fetched successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to fetch user',
                err: err.message
            })
        }
    };

    static async postUser (req, res) {
        const { body, params: { userId }} = req;
        try {

            const data = await userPost(body, userId);

            return res.status(201).json({
                status: 'success',
                message: 'user posted successfully',
                data
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                status: 'failed',
                message: 'failed to fetch user',
                err: err.message
            })
        } 
    }

    static async updateUser (req, res) {
        const { body, params: { userId }} = req;
        try {

            
            const data = await updateOneUser(body, userId);

            return res.status(201).json({
                status: 'success',
                message: 'user data updated successfully',
                data
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                status: 'failed',
                message: 'failed to update user',
                err: err.message
            })
        }
    }

    static async changePassword (req, res) {
        try {
            const { body, params: { userId}} = req;

            await changeUserPassword(body, userId);

            return res.status(201).json({
                status: 'success',
                message: 'user password changed successfully'
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to change user password',
                err: err.message
            })
        }
    }

    static async removeUser (req, res) {
        const { params: { userId }} = req;
        try {

            const data = await removeUser(userId);
            return res.status(201).json({
                status: 'success',
                message: 'user ppassword changed successfully',
                data
            });
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to remove user',
                err: err.message
            })
        }
    }
}

module.exports = UserController;