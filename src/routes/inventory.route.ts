import { Router } from "express";
import { decreaseStock, increaseStock } from "../controllers/inventory.controller";

const router = Router();

// increase stock
router.put('/:id/stock/increase', increaseStock);

// decrease stock
router.put('/:id/stock/decrease', decreaseStock);

export default router;