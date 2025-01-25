const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
    userTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true,
        auto:true
    },
    userType: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    modifiedBy: String,
    modifiedOn: Date
});

const UserType = mongoose.model('UserType', userTypeSchema);
module.exports = UserType;
