const express = require('express');
const router = express.Router();
const articleOrderController = require('../controllers/articleOrder.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleOrder:
 *       type: object
 *       required:
 *         - supplierId
 *         - articleId
 *         - quantity
 *         - unitCost
 *         - orderDate
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         supplierId:
 *           type: string
 *           description: ID of the supplier
 *         articleId:
 *           type: string
 *           description: ID of the article
 *         quantity:
 *           type: number
 *           description: Quantity ordered
 *         unitCost:
 *           type: number
 *           description: Price per unit
 *         totalAmount:
 *           type: number
 *           description: Total amount (quantity * unitCost)
 *         orderDate:
 *           type: string
 *           format: date
 *           description: Date of the order
 *         status:
 *           type: string
 *           enum: [pending, delivered, cancelled]
 *           description: Status of the order
 *         deliveryDate:
 *           type: string
 *           format: date
 *           description: Date of delivery
 *         remarks:
 *           type: string
 *           description: Additional remarks about the order
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the order
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/articleorder:
 *   post:
 *     summary: Create a new article order
 *     tags: [Article Orders]
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
 *               - articleId
 *               - quantity
 *               - unitCost
 *               - orderDate
 *             properties:
 *               supplierId:
 *                 type: string
 *                 description: ID of the supplier
 *               articleId:
 *                 type: string
 *                 description: ID of the article
 *               quantity:
 *                 type: number
 *                 description: Quantity ordered
 *               unitCost:
 *                 type: number
 *                 description: Price per unit
 *               orderDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the order
 *               status:
 *                 type: string
 *                 enum: [pending, delivered, cancelled]
 *                 description: Status of the order
 *               deliveryDate:
 *                 type: string
 *                 format: date
 *                 description: Date of delivery
 *               remarks:
 *                 type: string
 *                 description: Additional remarks about the order
 *     responses:
 *       201:
 *         description: Article order created successfully
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
 *                     articleOrder:
 *                       $ref: '#/components/schemas/ArticleOrder'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.createArticleOrder);

/**
 * @swagger
 * /api/articleorder:
 *   get:
 *     summary: Get all article orders
 *     tags: [Article Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         description: Filter by supplier ID
 *       - in: query
 *         name: article
 *         schema:
 *           type: string
 *         description: Filter by article ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, delivered, cancelled]
 *         description: Filter by order status
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
 *         description: List of all article orders
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
 *                     articleOrders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ArticleOrder'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, articleOrderController.getAllArticleOrders);

/**
 * @swagger
 * /api/articleorder/{id}:
 *   get:
 *     summary: Get article order by ID
 *     tags: [Article Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article Order ID
 *     responses:
 *       200:
 *         description: Article order details
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
 *                     articleOrder:
 *                       $ref: '#/components/schemas/ArticleOrder'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, articleOrderController.getArticleOrderById);

/**
 * @swagger
 * /api/articleorder/{id}:
 *   patch:
 *     summary: Update article order
 *     tags: [Article Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: New quantity
 *               unitCost:
 *                 type: number
 *                 description: New price per unit
 *               status:
 *                 type: string
 *                 enum: [pending, delivered, cancelled]
 *                 description: New status
 *               deliveryDate:
 *                 type: string
 *                 format: date
 *                 description: New delivery date
 *               remarks:
 *                 type: string
 *                 description: New remarks
 *     responses:
 *       200:
 *         description: Article order updated successfully
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
 *                     articleOrder:
 *                       $ref: '#/components/schemas/ArticleOrder'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.updateArticleOrder);

/**
 * @swagger
 * /api/articleorder/{id}:
 *   delete:
 *     summary: Delete article order
 *     tags: [Article Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article Order ID
 *     responses:
 *       204:
 *         description: Article order deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.deleteArticleOrder);

module.exports = router;
