import { Router } from "express";
import { decreaseStock, increaseStock, lowStockThresholdProducts } from "../controllers/inventory.controller";

const router = Router();


/**
 * @openapi
 * /api/v1/inventory/{id}/stock/increase:
 *   put:
 *     summary: Increase stock quantity for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: integer
 *                 minimum: 1
 *                 description: Amount to increase stock
 *           example:
 *             amount: 50
 *     responses:
 *       200:
 *         description: Stock increased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               message: "stock incremented successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "amount is required"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [failed]
 *                 message:
 *                   type: string
 *             example:
 *               status: "failed"
 *               message: "Something went wrong"
 */
router.put('/:id/stock/increase', increaseStock);

/**
 * @openapi
 * /api/v1/inventory/{id}/stock/decrease:
 *   put:
 *     summary: Decrease stock quantity for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: integer
 *                 minimum: 1
 *                 description: Amount to decrease stock
 *           example:
 *             amount: 25
 *     responses:
 *       200:
 *         description: Stock decreased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               message: "stock decremented successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "amount is required"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "product not found"
 *       409:
 *         description: Insufficient stock quantity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "insufficient stock quantity"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [failed]
 *                 message:
 *                   type: string
 *             example:
 *               status: "failed"
 *               message: "Something went wrong"
 */
router.put('/:id/stock/decrease', decreaseStock);

/**
 * @openapi
 * /api/v1/inventory/low-stock:
 *   get:
 *     summary: Get products with low stock
 *     tags: [Inventory]
 *     description: Returns all products where current stock is below the low stock threshold
 *     responses:
 *       200:
 *         description: Low stock products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 message:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       stock_quantity:
 *                         type: integer
 *                       low_stock_threshold:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *             example:
 *               status: "success"
 *               message: "low stock products fetched successfully"
 *               products:
 *                 - id: 1
 *                   name: "Samsung Galaxy S25"
 *                   description: "Latest smartphone"
 *                   stock_quantity: 5
 *                   low_stock_threshold: 10
 *                   created_at: "2024-01-01T00:00:00.000Z"
 *                   updated_at: "2024-01-01T00:00:00.000Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [failed]
 *                 message:
 *                   type: string
 *             example:
 *               status: "failed"
 *               message: "Something went wrong"
 */
router.get('/low-stock', lowStockThresholdProducts);

export default router;