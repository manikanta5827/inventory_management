import { Router } from "express";
import productRoutes from './product.route';
import inventoryRoutes from './inventory.route';
const router = Router();

// product routes
router.use('/products', productRoutes);

// inventory routes
router.use('/inventory', inventoryRoutes);

export default router;