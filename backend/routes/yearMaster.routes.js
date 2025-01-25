const express = require('express');
const router = express.Router();
const yearMasterController = require('../controllers/yearMaster.controller');
const authMiddleware = require('../middleware/auth');

// YearMaster routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearMasterController.createYearMaster);
router.get('/', authMiddleware.protect, yearMasterController.getAllYearMasters);
router.get('/:id', authMiddleware.protect, yearMasterController.getYearMasterById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearMasterController.updateYearMaster);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), yearMasterController.deleteYearMaster);

module.exports = router;
