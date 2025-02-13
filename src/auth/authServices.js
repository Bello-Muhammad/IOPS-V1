const LocalGovernment = require("../location/model/localGovernment.Model");
const State = require("../location/model/state.Model");
const { Role } = require("../users/usersModel/role.Model");
const User = require("../users/usersModel/users.Model");

class AuthServices {
    static async userLogin(email, password) {
        if(!email || !password) throw new Error('email or password not provided');

        const user = await User.findByCridentials(email, password);
        const role = await Role.findOne({ _id: user.roleId});
        const state = await State.findOne({ _id: user.stateId })
        const lg = await LocalGovernment.findOne({ _id: user.localGovernmentId})

        return { ...user._doc, role: role.role, lg: lg || '', state: state || '' };

    };

}

module.exports = AuthServices;