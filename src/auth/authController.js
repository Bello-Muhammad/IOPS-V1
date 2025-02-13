const { userLogin } = require("./authServices");

class AuthController {

    static async authUserLogin (req, res) {
        try {
            const { email, password } = req.body;
            const data = await userLogin(email, password);

            req.session.user = data;

            return res.status(200).json({
                status: 'success',
                message: 'user logged in successfully',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: 'failed',
                message: 'failed to login user',
                err: err.message
            })
        }
    }

    static async authUserLogOut (req, res) {
        try {
            const { user } = req.session;

            if(!user) throw new Error('no active session');
    
            await req.session.destroy;
    
            return res.status(200).json({
                status: 'success',
                message: 'user logged out successfully',
                user
            })
        } catch (error) {
            console.log(req)
            return res.status(400).json({
                status: 'failed',
                message: 'failed to login user',
                err: err.message
            })
        }
    }
}

module.exports = AuthController;