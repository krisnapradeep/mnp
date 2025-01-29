const express = require('express');
const router = express.Router();
const yearController = require('../controllers/year.controller');
const authMiddleware = require('../middleware/auth');

// Year routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearController.createYear);
router.get('/', authMiddleware.protect, yearController.getAllYears);
router.get('/:id', authMiddleware.protect, yearController.getYearById); 
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearController.updateYear);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearController.deleteYear);

module.exports = router;
