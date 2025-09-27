import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
const router = Router();

// create product
router.post('/', createProduct);

// get all products
router.get('/', getAllProducts);

// get single product
router.get('/:id', getProduct);

// update product
router.put('/:id', updateProduct);

// delete product
router.delete('/:id', deleteProduct);

export default router;