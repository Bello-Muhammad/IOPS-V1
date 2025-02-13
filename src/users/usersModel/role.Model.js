const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
	role: {
		type: String,
        required: true,
        trim: true,
		lowercase: true
	}
},
{
	timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

const createRoles = async () => {
	const data = [
		{ role: "admin"},
		{ role: "supervisor"},
		{ role: "official"}
	]

	const returnData = await Role.find();

	if (returnData.length === 0) {
		return await Role.insertMany(data);
	}

	return;
}

module.exports = { Role, createRoles };