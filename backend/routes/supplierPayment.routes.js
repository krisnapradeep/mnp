const express = require('express');
const router = express.Router();
const supplierPaymentController = require('../controllers/supplierPayment.controller');
const authMiddleware = require('../middleware/auth');

// SupplierPayment routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.createSupplierPayment);
router.get('/', authMiddleware.protect, supplierPaymentController.getAllSupplierPayments);
router.get('/:id', authMiddleware.protect, supplierPaymentController.getSupplierPaymentById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.updateSupplierPayment);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.deleteSupplierPayment);

module.exports = router;
