const express = require('express');
const router = express.Router();
const beneficiaryTypeController = require('../controllers/beneficiaryType.controller');
const authMiddleware = require('../middleware/auth');

// BeneficiaryType routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.createBeneficiaryType);
router.get('/', authMiddleware.protect, beneficiaryTypeController.getAllBeneficiaryTypes);
router.get('/:id', authMiddleware.protect, beneficiaryTypeController.getBeneficiaryTypeById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.updateBeneficiaryType);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.deleteBeneficiaryType);

module.exports = router;
