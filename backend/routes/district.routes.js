const express = require('express');
const router = express.Router();
const districtController = require('../controllers/district.controller');
const authMiddleware = require('../middleware/auth');

// District routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.createDistrict);
router.get('/', authMiddleware.protect, districtController.getAllDistricts);
router.get('/:id', authMiddleware.protect, districtController.getDistrictById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.updateDistrict);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.deleteDistrict);

module.exports = router;
