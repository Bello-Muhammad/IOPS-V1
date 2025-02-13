const LocalGovernment = require("../../location/model/localGovernment.Model.js");
const State = require("../../location/model/state.Model.js");
const Patient = require("../../patients/patient.Model.js");
const { Role } = require("../usersModel/role.Model.js");
const User = require("../usersModel/users.Model.js")

const getCount = async () => {

    const supervisor = await Role.findOne({ role: 'supervisor' })
    const official = await Role.findOne({ role: 'official' })
    const supervisors = await User.countDocuments({ roleId: supervisor._id });
    const officials = await User.countDocuments({ roleId: official._id });
    const patients = await Patient.countDocuments({});
    const states = await State.countDocuments({})
    const isState = await State.find();

    const data = [];

    for (let i = 0; i < isState.length; i++) {


        let a_state = await LocalGovernment.countDocuments({ stateId: isState[i]._id});
        
        const { _id, state} = isState[i];
        let a_comp = { _id, state, lgCount: a_state};

        data.push(a_comp)
    }

    return { supervisors, officials, patients, states, data };
}

const getUserRoles = async (users, role) => {

    const data = [];

    for (let i = 0; i < users.length; i++) {

        const state = await State.findOne({ _id: users[i].stateId});
        const lga = await LocalGovernment.findOne({ _id: users[i].localGovernmentId });
        let a_state = await Role.findOne({ _id: users[i].roleId});

        let option = {
            ...users[i]._doc,
            role: a_state.role,
            state: state.state,
            lga: lga.localGovernment
        }

        data.push(option)
    }

    if(role) {
        return data.filter((user) => {
            user.role === role
        });
    }

    return data;
}

module.exports = {
    getCount,
    getUserRoles
}