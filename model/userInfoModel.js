const mongoose = require('../config/db');
const Schema = mongoose.Schema;
const _ = require('lodash');


let UserInfoMethod = {}

let userInfoSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        default: 'default'
    },
    lastName: {
        type: String,
        required: true,
        default: 'default'
    }
}, {
    timestamps: true
});

let UserInfo = mongoose.model('UserInfo', userInfoSchema);

UserInfoMethod.getUserInfo = async () => {
    const result = await UserInfo.find();
    return result;
}

UserInfoMethod.findUserInfo = async (userInfoId) => {
    const result = await User.find({
        _id: userInfoId
    });
    return result;
}

UserInfoMethod.postUserInfo = async (userInfo={}) => {
    userInfo._id = new mongoose.Types.ObjectId();
    const userInfoData = new UserInfo(userInfo);
    const result = await userInfoData.save();
    return result;
}

UserInfoMethod.putUserInfo = async (userInfo) => {
    const result = await UserInfo.findOneAndUpdate({
            _id: userInfo._id
        },
        userInfo, {
            new: true,
            runValidators: true
        });
    return result;
}

UserInfoMethod.deleteUserInfo = async (id) => {
    const result = await UserInfo.deleteOne({
            _id: id
        });
    return result;
}

UserInfoMethod.UserInfo = UserInfo;
module.exports = UserInfoMethod;