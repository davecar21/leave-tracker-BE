const mongoose = require('../config/db');
const config = require('../config/config');
const Schema = mongoose.Schema;

const UserInfoModel = require('../model/userInfoModel');

let LeaveMethod = {}

let leaveSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    userInfoID: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo',
        required: true
    },
    leaveDate: {
        type: Date,
        required: true
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['SL', 'VL', 'EL']
    },
    leaveHours: {
        type: Number,
        required: true,
        enum: [4, 8]
    },
    leaveNotes: {
        type: String,
        required: true
    },
    leaveDateReturnWork: {
        type: Date,
        required: true
    },
    leaveStatus: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo'
    }
}, {
    timestamps: true
});

let Leave = mongoose.model('Leave', leaveSchema);

LeaveMethod.getLeave = async () => {
    const result = await Leave.find().populate('userInfoID');
    return result;
}

LeaveMethod.getLeaveByUserInfoID = async (id) => {
    const result = await Leave.find({
        userInfoID: id
    }).populate('userInfoID');
    return result;
}

LeaveMethod.postLeave = async (leave) => {
    leave._id = new mongoose.Types.ObjectId();
    const leaveData = new Leave(leave);
    const result = await leaveData.save();
    return result;
}

LeaveMethod.Leave = Leave;
module.exports = LeaveMethod;