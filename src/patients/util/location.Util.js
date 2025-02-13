const { getLocalgovernment } = require("../../location/services/localGovernment.Services");
const { getState } = require("../../location/services/state.Services");

const getPatientLocation = async (user) => {

    const data = [];

    for (let i = 0; i < user.length; i++) {
        
        const state = await getState(user[i].stateId);
        const lga = await getLocalgovernment(user[i].localGovernmentId);
        let option = { ...user[i]._doc, state: state.state, lga: lga.lg}

        data.push(option)
    }

    return data;
}

module.exports = getPatientLocation