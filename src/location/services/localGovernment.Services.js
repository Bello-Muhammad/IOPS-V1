const LocalGovernment = require("../model/localGovernment.Model");

class LocalGovernmentServices {

    static async createLocalGovernment (localGovernment, stateId) {

        if (!localGovernment) {
            throw new Error('local government can not be empty and should be string');
        }

        const checkLG = await LocalGovernment.findOne({ localGovernment: {$regex: localGovernment, $options: 'i'}, stateId });

        if (checkLG) {
            throw new Error('local government exist');
        }

        return await LocalGovernment.create({
            localGovernment,
            stateId
        });
    };

    static async getLocalGovernments (stateId) {
        const allLGA = await LocalGovernment.find({ stateId: stateId });
        let data = allLGA || 'no LGA added to this state yet';

        return data;
    }

    static async getLocalgovernment (id) {

        if (!id) {
            throw new Error('local government id not provided')
        }

        const data = await LocalGovernment.findOne({ _id: id }).populate('patient');

        if (!data) {
            throw new Error(`local government with the id: ${id} not found`)
        }

        let lg = data.localGovernment;
        let result = {
            id: id,
            lg,
            patients: data.patient
        }

        return result;
    }

    static async updateOneLocalGovernment (id, localGovernment) {
       if (!id || !localGovernment) {
            throw new Error('loca government Id and local government name can not be empty')
       }

       const isLGA = await LocalGovernment.findOne({ _id: id });

       if (!isLGA) {
        throw new Error(`local government with the id: ${id} not found`);
       }

       isLGA.localGovernment = localGovernment;
       await isLGA.save();

       return isLGA
    }

    static async deleteLocalGovernment (id) {
        if (!id) {
            throw new Error('local government id can not be empty')
       }

       const isDeleted = await LocalGovernment.findByIdAndDelete({ _id: id })

       if (!isDeleted) {
        throw new Error('local government to be deleted not found')
       }

       return isDeleted
    }
    //>>>end
}

module.exports = LocalGovernmentServices;