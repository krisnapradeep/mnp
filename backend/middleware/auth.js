const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware for protecting routes
exports.protect = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

        // Check if token exists
        if (!token) return res.status(401).json({ status: 'fail', message: 'You are not logged in!' });

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).populate('userType', 'userType');
        next();
    } catch (error) {
        res.status(401).json({ status: 'fail', message: 'Invalid token!' });
    }
};

// Middleware for restricting access based on roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if user role is included in roles
        if (!roles.includes(req.user.userType.userType)) {
            return res.status(403).json({ status: 'fail', message: 'You do not have permission to perform this action!' });
        }
        next();
    };
};
