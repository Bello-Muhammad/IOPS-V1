const State = require("../model/state.Model");

class StateServices {

    //>>>sate
    static async createState (state) {

        if (!state) {
            throw new Error('state name can not be empty and should be string');
        }

        const checkState = await State.findOne({ state: {$regex: state, $options: 'i'} });

        if (checkState) {
            throw new Error('state name exist');
        }

        return await State.create({
            state
        })
    };

    static async getStates () {
        const allStates = await State.find()
        let data = allStates || 'no state added yet';

        return data;
    }

    static async getState (stateId) {

        // if (!stateId) {
        //     throw new Error('state id not provided')
        // }

        const stateData = await State.findOne({ _id: stateId }).populate('localGovernment');

        if (!stateData) {
            throw new Error(`state with the id: ${stateId} not found`)
        }

        let state = stateData.state;
        let result = {
            _id: stateId,
            state,
            lg: stateData.localGovernment
        }

        return result;
    }

    static async updateOneState (stateId, state) {
       if (!stateId || !state) {
            throw new Error('stateId and state name can not be empty')
       }

       const isState = await State.findOne({ _id: stateId });

       if (!isState) {
        throw new Error(`state with the id: ${stateId} not found`);
       }

       isState.state = state;
       await isState.save();

       return isState
    }

    static async deleteState (stateId) {
        if (!stateId) {
            throw new Error('stateId can not be empty')
       }

       const isDeleted = await State.findByIdAndDelete({ _id: stateId });

       if(!isDeleted) {
            throw new Error('state to be deleted not found')
       }

       return isDeleted;
    }
    //>>>end
}

module.exports = StateServices;