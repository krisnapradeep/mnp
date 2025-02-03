const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - supplierName
 *         - address
 *         - contactNumber
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         supplierName:
 *           type: string
 *           description: Name of the supplier
 *         address:
 *           type: string
 *           description: Address of the supplier
 *         contactNumber:
 *           type: string
 *           description: Contact number of the supplier
 *         email:
 *           type: string
 *           description: Email address of the supplier
 *         gstNumber:
 *           type: string
 *           description: GST number of the supplier
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the supplier
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the supplier
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/supplier:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierName
 *               - address
 *               - contactNumber
 *             properties:
 *               supplierName:
 *                 type: string
 *                 description: Name of the supplier
 *               address:
 *                 type: string
 *                 description: Address of the supplier
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of the supplier
 *               email:
 *                 type: string
 *                 description: Email address of the supplier
 *               gstNumber:
 *                 type: string
 *                 description: GST number of the supplier
 *     responses:
 *       201:
 *         description: Supplier created successfully
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
 *                     supplier:
 *                       $ref: '#/components/schemas/Supplier'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.createSupplier);

/**
 * @swagger
 * /api/supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all suppliers
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
 *                     suppliers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Supplier'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, supplierController.getAllSuppliers);

/**
 * @swagger
 * /api/supplier/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier details
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
 *                     supplier:
 *                       $ref: '#/components/schemas/Supplier'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, supplierController.getSupplierById);

/**
 * @swagger
 * /api/supplier/{id}:
 *   patch:
 *     summary: Update supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierName:
 *                 type: string
 *                 description: New name for the supplier
 *               address:
 *                 type: string
 *                 description: New address for the supplier
 *               contactNumber:
 *                 type: string
 *                 description: New contact number for the supplier
 *               email:
 *                 type: string
 *                 description: New email address for the supplier
 *               gstNumber:
 *                 type: string
 *                 description: New GST number for the supplier
 *     responses:
 *       200:
 *         description: Supplier updated successfully
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
 *                     supplier:
 *                       $ref: '#/components/schemas/Supplier'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.updateSupplier);

/**
 * @swagger
 * /api/supplier/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       204:
 *         description: Supplier deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), supplierController.deleteSupplier);

module.exports = router;
