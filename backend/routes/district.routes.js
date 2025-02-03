const express = require('express');
const router = express.Router();
const districtController = require('../controllers/district.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     District:
 *       type: object
 *       required:
 *         - districtName
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         districtName:
 *           type: string
 *           description: Name of the district
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the district
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the district
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/district:
 *   post:
 *     summary: Create a new district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - districtName
 *             properties:
 *               districtName:
 *                 type: string
 *                 description: Name of the district
 *     responses:
 *       201:
 *         description: District created successfully
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
 *                     district:
 *                       $ref: '#/components/schemas/District'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.createDistrict);

/**
 * @swagger
 * /api/district:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all districts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 length:
 *                   type: number
 *                 data:
 *                   type: array
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, districtController.getAllDistricts);

/**
 * @swagger
 * /api/district/{id}:
 *   get:
 *     summary: Get district by ID
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     responses:
 *       200:
 *         description: District details
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
 *                     district:
 *                       $ref: '#/components/schemas/District'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, districtController.getDistrictById);

/**
 * @swagger
 * /api/district/{id}:
 *   patch:
 *     summary: Update district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               districtName:
 *                 type: string
 *                 description: New name for the district
 *     responses:
 *       200:
 *         description: District updated successfully
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
 *                     district:
 *                       $ref: '#/components/schemas/District'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.updateDistrict);

/**
 * @swagger
 * /api/district/{id}:
 *   delete:
 *     summary: Delete district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     responses:
 *       204:
 *         description: District deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtController.deleteDistrict);

module.exports = router;
