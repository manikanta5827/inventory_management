import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller";
const router = Router();


/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - stock_quantity
 *               - low_stock_threshold
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Product name (3-50 characters)
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 description: Product description
 *               stock_quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Initial stock quantity
 *               low_stock_threshold:
 *                 type: integer
 *                 minimum: 1
 *                 description: Low stock alert threshold
 *           example:
 *             name: "Samsung Galaxy S25"
 *             description: "Latest smartphone with advanced features"
 *             stock_quantity: 100
 *             low_stock_threshold: 10
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     stock_quantity:
 *                       type: integer
 *                     low_stock_threshold:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "success"
 *               message: "product created successfully"
 *               product:
 *                 id: 1
 *                 name: "Samsung Galaxy S25"
 *                 description: "Latest smartphone with advanced features"
 *                 stock_quantity: 100
 *                 low_stock_threshold: 10
 *                 created_at: "2024-01-01T00:00:00.000Z"
 *                 updated_at: "2024-01-01T00:00:00.000Z"
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
 *               message: "name is required"
 *       409:
 *         description: Product already exists
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
 *               message: "product already exists with same name and description"
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
router.post('/', createProduct);

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *             examples:
 *               with_products:
 *                 summary: Products found
 *                 value:
 *                   status: "success"
 *                   message: "products fetched successfully"
 *                   products:
 *                     - id: 1
 *                       name: "Samsung Galaxy S25"
 *                       description: "Latest smartphone"
 *                       stock_quantity: 100
 *                       low_stock_threshold: 10
 *                       created_at: "2024-01-01T00:00:00.000Z"
 *                       updated_at: "2024-01-01T00:00:00.000Z"
 *               no_products:
 *                 summary: No products found
 *                 value:
 *                   status: "success"
 *                   message: "no products found"
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
router.get('/', getAllProducts);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     stock_quantity:
 *                       type: integer
 *                     low_stock_threshold:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "success"
 *               message: "product fetched successfully"
 *               product:
 *                 id: 1
 *                 name: "Samsung Galaxy S25"
 *                 description: "Latest smartphone"
 *                 stock_quantity: 100
 *                 low_stock_threshold: 10
 *                 created_at: "2024-01-01T00:00:00.000Z"
 *                 updated_at: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Invalid product ID
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
 *               message: "id must be greater than 0"
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
router.get('/:id', getProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
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
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Product name (3-50 characters)
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 description: Product description
 *               stock_quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Stock quantity
 *               low_stock_threshold:
 *                 type: integer
 *                 minimum: 1
 *                 description: Low stock alert threshold
 *           example:
 *             name: "Samsung Galaxy S25 Pro"
 *             stock_quantity: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *               message: "product updated successfully"
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
 *               message: "name should be more than 3 characters"
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
router.put('/:id', updateProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *               message: "product deleted successfully"
 *       400:
 *         description: Invalid product ID
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
 *               message: "id must be greater than 0"
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
router.delete('/:id', deleteProduct);

export default router;