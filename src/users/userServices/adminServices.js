const State = require("../../location/model/state.Model");
const { getStates } = require("../../location/services/state.Services");
const { Role } = require("../usersModel/role.Model");
const Admin = require("../usersModel/users.Model");
const User = require("../usersModel/users.Model");
const { getCount } = require("../util/dashBoardDataCount");

class AdminServices {
    static async newAdmin (body) {
        const { firstName, lastName, email, password, role } = body;

        if (!firstName || !lastName || !email || !password || !role ) {
            throw new Error('all input required');
        }

        const isUser = await User.findOne({ email: {$regex: email, $options: 'i' }});

        if(isUser) {
            throw new Error('user exist');
        }

        if(role !== 'admin') {
            throw new Error(`please input a correct role: ${role}`);
        }

        const isRole = await Role.findOne({ role: { $regex: role }});

        if(!isRole) {
            throw new Error(`${role} do not exist`);
        }
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            roleId: isRole._id
        });

        return await newUser.save();
    };

    static async adminDashboard () {
        const state = await getStates();
        const count = await getCount();

        return { ...count, state };
    }

    static async getAllAdmin () {
        const user = await User.find()

        let data = user || "no admin add yet";

        return data;
    }

    static async getOneAdmin (id) {
        const admin = await Admin({ _id: id });

        if(!admin) {
            throw new Error('user account do not exist');
        }

        return admin;
    }

    static async editAdmin (body, id) {
        const { firstName, lastName, email, state, password } = body;
        const admin = await Admin.findById({ _id: id });

        if(!admin) {
            throw new Error('admin user do not exist');
        }

        let modifiedData = {
            firstName: firstName || admin.firstName,
            lastName: lastName || admin.lastName,
            email: email || admin.email
        }

        return await Admin.findByIdAndUpdate(modifiedData, { new: true });
    }

    // static async changePassword (body, Id) {
    //     const { currentPassword, newPassword } = body;

    // }

    static async removeAdmin () {}
}

module.exports = AdminServices;