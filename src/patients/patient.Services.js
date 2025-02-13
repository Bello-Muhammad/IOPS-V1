const Patient = require("./patient.Model.js");
const getPatientLocation = require("./util/location.Util.js");

class PatientServices {

    static async newPatient ( body ) {
        const { name, age, sex, maritalStatus, address, contact, lg, state} = body;

        if (!name || !age || !sex || !maritalStatus || !contact || !address || !lg || !state) {
            throw new Error(`all patient input required { name: ${name},  age: ${age}, sex: ${sex}, maritalStatus: ${maritalStatus}, contact: ${contact}, lga: ${lg}, state: ${state}`);
        }

        const newPatient = new Patient({ 
            name,
            age,
            sex,
            maritalStatus,
            address,
            contact,
            localGovernmentId: lg,
            stateId: state
        });
        
        return await newPatient.save();
    };

    static async getPatients (user) {

        if (user.role === 'admin') {
            const user = await Patient.find();
            if(user.length <= 0) {return;}
            return await getPatientLocation(user);
        }
        
        const patient = await Patient.find({ localGovernmentId: user.localGovernmentId });

        if(user.length <= 0) {return;}

        return await getPatientLocation(patient);
    };

    static async getOnePatient ( id ) {
        const patient = await Patient.findOne({ _id: id });

        if (!patient) {
            throw new Error('patient not found')
        }

        return patient;
    };

    static async editPatient ( body, id) {
        const { name,  age, sex, maritalStatus, address, contact } = body;

        const patient = await Patient.findOne({ _id: id });

        if (!patient) {
            throw new Error('patient not found')
        }
        
        return await Patient.findOneAndUpdate({ _id: id },{
            name: name || patient.name,
            sex: sex || patient.sex,
            age: age || patient.age,
            maritalStatus: maritalStatus || patient.maritalStatus,
            contact: contact || patient.contact,
            address: address || patient.address
        },{
            new: true
        })
    };

    static async removePatient ( id ) {
        const patient = await Patient.findOne({ _id: id });

        if (!patient) {
            throw new Error('patient not found')
        }

        return await Patient.findOneAndDelete({ _id: id });
    };
}

module.exports = PatientServices;