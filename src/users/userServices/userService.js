const LocalGovernment = require("../../location/model/localGovernment.Model");
const State = require("../../location/model/state.Model");
const { getStates } = require("../../location/services/state.Services");
const { Role } = require("../usersModel/role.Model");
const User = require("../usersModel/users.Model");
const { getUserRoles } = require("../util/dashBoardDataCount");
const { emailNotification, postEmail } = require("../util/emailHandler");
const passwordGen = require("../util/passwordGen");
const bcrypt = require('bcrypt');

class UsersServices {
    static async createUser (body) {
        const { firstName, lastName, email, password, role, state, localGovernment } = body;

        if ( !firstName || !lastName || !email || !role || !state ) {
            throw new Error('all input required');
        }

        const user = await User.findOne({ email: email.toLowerCase()})

        if(user) {
            throw new Error('user already exist');
        }

        const isRole = await Role.findOne({ role });

        if(!isRole) {
            throw new Error(`${role} do not exist`);
        }

        const isState = await State.findOne({ _id: state });

        if(!isState) {
            throw new Error(`state: ${state} do not exist`);
        }

        const lg = await LocalGovernment.findOne({ _id: localGovernment });

        if (role === 'official') {
            const password = await passwordGen();
            console.log(password)
            const newUser = new User({
                firstName,
                lastName,
                email,
                stateId: isState._id,
                localGovernmentId: lg._id,
                password,
                roleId: isRole._id
            });

            emailNotification(email, firstName, lastName, password )
            let newU = await newUser.save();

            return { ...newU._doc, role: isRole.role}
        }

        if(!password) throw new Error('password can not be empty');

        const newUser = new User({
            firstName,
            lastName,
            email,
            stateId: isState._id,
            localGovernmentId: lg._id,
            password,
            roleId: isRole._id
        });

        let newU = await newUser.save();

        return { ...newU._doc, role: isRole.role}
    };

    static async allUsers (query, user) {
        const { staff } = query;

        if(!staff) {
            if(user.role === 'supervisor') {
                let role = 'official'

                const users = await User.find();
                return await getUserRoles(users, role);
            }
            const user = await User.find();
            return await getUserRoles(user);
        }
        
        const isRole = await Role.findOne({ role: staff });

        if(!isRole) throw new Error('role not found');

        if(user.role === staff) {
            throw new console.error('supervisor can not fetch suppervisor');
        }

        let objData = { roleId: isRole._id };
        let role = '';

        const users = await User.find(objData);
        return await getUserRoles(users, role);
    }

    static async getUser (id) {

        if(!id) throw new Error('invalid supervisor id');

        const user = await User.findOne({ _id: id });
        const role = await Role.findOne({ _id: user.roleId})
        const state = await getStates();

        return { ...user._doc, roleId: role._id, role: role.role, state};
    }

    static async userPost (body, userId) {
        
        const { state, lg } = body;

        const user = await User.findOne({ _id: userId });

        if(!user) throw new Error(`no user with the provided id: ${userId}`);

        const isState = await State.findOne({ _id: state });
    
        if(!isState) throw new Error('state do not exist')

        const isLg = await LocalGovernment.findOne({ _id: lg });

        if(!isLg) throw new Error('local government do not exist')

        let Istate = isState.state;
        let IlocalGovernment = isLg.localGovernment

       user.postTo.state = Istate;
       user.postTo.localGovernment = IlocalGovernment;

       postEmail(user.email, user.firstName, user.lastName,  Istate, IlocalGovernment)
       return await user.save();
    }

    static async updateOneUser (body, userId) {
        
        const { firstName, lastName, email, role, state, lg, postState, postLg } = body;

        const user = await User.findOne({ _id: userId });

        if(!user) throw new Error(`no user with the provided id: ${userId}`);

        const checkState = await State.findOne({ state: {$regex: state, $options: 'i'} });

        const checkLG = await LocalGovernment.findOne({ localGovernment: {$regex: localGovernment, $options: 'i'}, stateId });


        const Iuser = await User.findByIdAndUpdate({ _id: userId}, {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            stateId: state || user.stateId ,
            localGovernmentId: lg || user.localGovernmentId,
            postTo: {
                state: postState || user.postTo.state,
                localGovernment: postLg || user.postTo.localGovernment
            }
        }, { new: true })

       return Iuser;
    }

    static async changeUserPassword (body, id) {

        const {password, newPassword} = body;
        const user = await User.findById({ _id: id });

        if(!user) throw new Error('user not found');

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new Error('incorrect old password');

        user.password = newPassword;

        return await user.save();
    }

    static async removeUser (id) {

        const user = await User.findOne({ _id: id });

        if(!user) throw new Error(`no user with the provided id: ${id}`);

        return await User.findByIdAndDelete({ _id: id });
    }
}

module.exports = UsersServices;