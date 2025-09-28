import { z } from 'zod';

// schema to create a product
export const createProductSchema = z.object({
  name: z.string({ message: 'name is required' })
        .min(3, 'name should be more than 3 characters')
        .max(50, 'name should be less than 50 chars'),

  description: z.string({ message: 'description is required'})
              .min(1, 'description should be more than 5 characters'),

  stock_quantity: z.coerce.number({ message: "stock_quantity is required"})
                  .int()
                  .positive('stock_quantity must be greater than 0'),

  low_stock_threshold: z.coerce.number({ message: "low_stock_threshold is required"})
                      .int()
                      .positive('low_stock_threshold must be greater than 0')
});


// schema to get a single product
export const productIdSchema = z.coerce.number({ message: "id is required"})
                              .int()
                              .positive('id must be greater than 0');


// schema for updating a product                              
export const updateProductSchema = z.object({
      name: z.string()
        .min(3, 'name should be more than 3 characters')
        .max(50, 'name should be less than 50 chars')
        .optional(),

  description: z.string()
              .min(1, 'description should be more than 5 characters')
              .optional(),

  stock_quantity: z.coerce.number()
                  .int()
                  .positive('stock_quantity must be greater than 0')
                  .optional(),

  low_stock_threshold: z.coerce.number()
                      .int()
                      .positive('low_stock_threshold must be greater than 0')
                      .optional()
});
