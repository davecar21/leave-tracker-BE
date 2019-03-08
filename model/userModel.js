const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('../config/db');
const config = require('../config/config');
const Schema = mongoose.Schema;
const _ = require('lodash');

let UserMethod = {}

let userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: [true, 'userType is required.'],
        enum: ['admin', 'teamLead', 'teamMember'],
        default: 'teamMember'
    },
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
        default: 'default'
    },
}, {
    timestamps: true
});

let User = mongoose.model('User', userSchema);

UserMethod.getUser = async () => {
    const result = await User.find();
    return result;
}

UserMethod.findUser = async (userId) => {
    const result = await User.find({
        _id: userId
    });
    return result;
}

UserMethod.postUser = async (user) => {
    console.log(user)
    user._id = new mongoose.Types.ObjectId();
    user.password = await bcrypt.hash(user.password, config.saltRounds);
    const userData = new User(user);
    const result = await userData.save();
    return result;
}

UserMethod.putUser = async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, config.saltRounds);
    }

    const result = await User.findOneAndUpdate({
            _id: user._id
        },
        user, {
            new: true,
            runValidators: true
        });
    return result;
}

UserMethod.auth = async (user) => {
    const authUser = await User.findOne({
        employeeID: user.employeeID
    });
    if (!authUser) throw new Error('Auth failed!');;

    const compPassword = await bcrypt.compare(user.password, authUser.password);
    if (compPassword) {
        const payload = _.pick(authUser, ['_id', 'employeeID']);
        const token = await jwt.sign(payload, config.secret, {
            expiresIn: 21600 // expires in 6 hours
        });
        return token;
    } else {
        throw new Error('Auth failed!');
    }
}


UserMethod.User = User;
module.exports = UserMethod;