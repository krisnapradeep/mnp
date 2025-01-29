const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    userType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType',
        required: [true, 'Please provide a user type'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'default.jpg'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        console.log('Hashing password...');
        this.password = await bcrypt.hash(this.password, 12);
        console.log('Password hashed successfully');
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});

// Compare password method
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    try {
        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(candidatePassword, userPassword);
        console.log('Password match:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};
const collectionName = 'users';
const User = mongoose.model('User', userSchema, collectionName);
module.exports = User;
