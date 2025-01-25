const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiary.controller');
const authMiddleware = require('../middleware/auth');

// Beneficiary routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.createBeneficiary);
router.get('/', authMiddleware.protect, beneficiaryController.getAllBeneficiaries);
router.get('/:id', authMiddleware.protect, beneficiaryController.getBeneficiaryById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.updateBeneficiary);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.deleteBeneficiary);

module.exports = router;
