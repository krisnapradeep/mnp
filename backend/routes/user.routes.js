const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');

// Protect all routes after this middleware
router.use(authController.protect);

// Profile routes
router.get('/profile', authController.protect, authController.getProfile);
router.patch('/profile', userController.updateProfile);

// User routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.createUser);
router.get('/', authMiddleware.protect, userController.getAllUsers);
router.get('/:id', authMiddleware.protect, userController.getUser);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.updateUser);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.deleteUser);

// Admin only routes
router.use(authController.restrictTo('admin'));
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUser);
// router.patch('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
