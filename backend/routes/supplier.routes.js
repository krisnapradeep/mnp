const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const authMiddleware = require('../middleware/auth');

// Supplier routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.createSupplier);
router.get('/', authMiddleware.protect, supplierController.getAllSuppliers);
router.get('/:id', authMiddleware.protect, supplierController.getSupplierById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.updateSupplier);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.deleteSupplier);

module.exports = router;
