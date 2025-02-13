const { newAdmin, getAllAdmin, editAdmin, getOneAdmin, adminDashboard } = require("../userServices/adminServices");

class AdminController {
    static async registerAdmin (req, res ) {
        try {
            const { body } = req;
            const data = await newAdmin(body);

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
    };

    static async getAdminDashBoard (req, res) {

        try {
        
            const data = await adminDashboard();
        
            res.status(200).json({
                status: 'success',
                message: 'admin dashboard data fetched successfully',
                data
            });    
        } catch (err) {
            return res.status(400).json({
                message: 'failed to fetch admin dashboard',
                err: err.message
            }) 
        }
    };

    static async allAdmin ( req, res) {
        try {
            
            const data = await getAllAdmin();

            return res.status(200).json({
                status: 'success',
                message: 'All admin data fetch sucessfully',
                data
            })
        } catch (err) {
            return res.status(400).json({
                message: 'failed to fetch all admin',
                err: err.message
            }) 
        }
    }

    static async getAdmin ( req, res) {
        try {
            const { params: { adminId }} = req;
            const data = await getOneAdmin(adminId);

            return res.status(200).json({
                status: 'success',
                message: 'admin data fetch sucessfully',
                data
            })
        } catch (err) {
            return res.status(400).json({
                message: 'failed to fetch admin',
                err: err.message
            }) 
        }
    }

    static async updateAdmin ( req, res ) {
        try {
            const { body, params: { adminId }} = req;
            const data = await editAdmin(body, adminId);

            return res.status(200).json({
                status: 'success',
                message: 'user data updated sucessfully',
                data
            })
        } catch (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to updateuser data',
                err: err.message
            })
        }
    }
}

module.exports = AdminController;