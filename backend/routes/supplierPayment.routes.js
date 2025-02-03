const express = require('express');
const router = express.Router();
const supplierPaymentController = require('../controllers/supplierPayment.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     SupplierPayment:
 *       type: object
 *       required:
 *         - supplierId
 *         - amount
 *         - paymentDate
 *         - paymentMode
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         supplierId:
 *           type: string
 *           description: ID of the supplier
 *         amount:
 *           type: number
 *           description: Payment amount
 *         paymentDate:
 *           type: string
 *           format: date
 *           description: Date of payment
 *         paymentMode:
 *           type: string
 *           enum: [cash, cheque, online]
 *           description: Mode of payment
 *         referenceNumber:
 *           type: string
 *           description: Reference number for the payment (cheque number, transaction ID, etc.)
 *         remarks:
 *           type: string
 *           description: Additional remarks about the payment
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the payment record
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the payment record
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/supplierpayment:
 *   post:
 *     summary: Create a new supplier payment
 *     tags: [Supplier Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierId
 *               - amount
 *               - paymentDate
 *               - paymentMode
 *             properties:
 *               supplierId:
 *                 type: string
 *                 description: ID of the supplier
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 description: Date of payment
 *               paymentMode:
 *                 type: string
 *                 enum: [cash, cheque, online]
 *                 description: Mode of payment
 *               referenceNumber:
 *                 type: string
 *                 description: Reference number for the payment
 *               remarks:
 *                 type: string
 *                 description: Additional remarks about the payment
 *     responses:
 *       201:
 *         description: Supplier payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     supplierPayment:
 *                       $ref: '#/components/schemas/SupplierPayment'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.createSupplierPayment);

/**
 * @swagger
 * /api/supplierpayment:
 *   get:
 *     summary: Get all supplier payments
 *     tags: [Supplier Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         description: Filter by supplier ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: List of all supplier payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: number
 *                 data:
 *                   type: object
 *                   properties:
 *                     supplierPayments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SupplierPayment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, supplierPaymentController.getAllSupplierPayments);

/**
 * @swagger
 * /api/supplierpayment/{id}:
 *   get:
 *     summary: Get supplier payment by ID
 *     tags: [Supplier Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier Payment ID
 *     responses:
 *       200:
 *         description: Supplier payment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     supplierPayment:
 *                       $ref: '#/components/schemas/SupplierPayment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, supplierPaymentController.getSupplierPaymentById);

/**
 * @swagger
 * /api/supplierpayment/{id}:
 *   patch:
 *     summary: Update supplier payment
 *     tags: [Supplier Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: New payment amount
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 description: New payment date
 *               paymentMode:
 *                 type: string
 *                 enum: [cash, cheque, online]
 *                 description: New payment mode
 *               referenceNumber:
 *                 type: string
 *                 description: New reference number
 *               remarks:
 *                 type: string
 *                 description: New remarks
 *     responses:
 *       200:
 *         description: Supplier payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     supplierPayment:
 *                       $ref: '#/components/schemas/SupplierPayment'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.updateSupplierPayment);

/**
 * @swagger
 * /api/supplierpayment/{id}:
 *   delete:
 *     summary: Delete supplier payment
 *     tags: [Supplier Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier Payment ID
 *     responses:
 *       204:
 *         description: Supplier payment deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierPaymentController.deleteSupplierPayment);

module.exports = router;
