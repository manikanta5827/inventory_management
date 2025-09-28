import { Router } from "express";
import { decreaseStock, increaseStock } from "../controllers/inventory.controller";

const router = Router();

// increase stock
router.post('/:id/stock/increase', increaseStock);

// decrease stock
router.post('/:id/stock/decrease', decreaseStock);

export default router;