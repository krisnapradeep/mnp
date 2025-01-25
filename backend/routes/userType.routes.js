const express = require('express');
const router = express.Router();
const userTypeController = require('../controllers/userType.controller');
const authMiddleware = require('../middleware/auth');

// UserType routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), userTypeController.createUserType);
router.get('/', authMiddleware.protect, userTypeController.getAllUserTypes);
router.get('/:id', authMiddleware.protect, userTypeController.getUserTypeById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userTypeController.updateUserType);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userTypeController.deleteUserType);

module.exports = router;
