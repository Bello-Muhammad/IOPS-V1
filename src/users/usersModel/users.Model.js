const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		lowercase:true,
		trim: true,
		unique: true
	},
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
		required: true
    },
	stateId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'State'
	},
    localGovernmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocalGovernment'
    },
	postTo: {
		state: String,
		localGovernment: String
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true
	}
},
{
	timestamps: true
});

userSchema.virtual('role', {
    ref: 'Role',
    localField: 'roleId',
    foreignField: '_id'
});

userSchema.virtual('assignLocation', {
    ref: 'AssignLocation',
    localField: '_id',
    foreignField: 'userId'
});

userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password

	return userObject;
};

userSchema.statics.findByCridentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('invalid email!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("invalid password")
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User;