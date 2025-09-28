import { Router } from "express";
import { decreaseStock, increaseStock, lowStockThresholdProducts } from "../controllers/inventory.controller";

const router = Router();

// increase stock
router.put('/:id/stock/increase', increaseStock);

// decrease stock
router.put('/:id/stock/decrease', decreaseStock);

// api to fetch low stock products
router.get('/low-stock', lowStockThresholdProducts);

export default router;