const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
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
    updatedBy: String,
    modifiedOn: Date
});
const collectionName = 'usertype';
const UserType = mongoose.model('UserType', userTypeSchema, collectionName);
module.exports = UserType;
