import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productIdSchema } from '../schemas/product.schema';
import { inventorySchema } from '../schemas/inventory.schema';
const prisma = new PrismaClient();
const PRODUCT_NOT_FOUND = "product not found";
const INSUFFICIENT_STOCK_QUANTITY = "insufficient stock quantity";

export const increaseStock = async (req: Request, res: Response) => {
    
    // vlaidating req params
    const validatedParams = productIdSchema.safeParse(req.params.id);

    if(!validatedParams.success) {
        return res.status(400).json({
            status: "error",
            message: validatedParams.error.issues[0].message
        })
    }

    const productId = validatedParams.data;

    // validate req body
    const validatedBody = inventorySchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(400).json({
            status: "error",
            message: validatedBody.error.issues[0].message
        })
    }

    const { amount } = validatedBody.data;

    try {
        await prisma.$transaction(async (tx)=> {
            // exclusive lock
            const [product] = await tx.$queryRawUnsafe<any>(
                `SELECT * FROM "Product" WHERE id = $1 FOR UPDATE`,
                productId
              );
    
            if(!product) throw new Error(PRODUCT_NOT_FOUND);
    
            await tx.product.update({
                where: {
                    id: productId
                },
                data: {
                    stock_quantity: product.stock_quantity + amount
                }
            })
        })
    } catch (error: any) {
        if(error.message === PRODUCT_NOT_FOUND) {
            return res.status(404).json({
                status: "error",
                message: error.message
            });
        }
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }

    return res.status(200).json({
        status: "success",
        message: "stock incremented successfully"
    })
}

export const decreaseStock = async (req: Request, res: Response) => {

    // vlaidating req params
    const validatedParams = productIdSchema.safeParse(req.params.id);

    if(!validatedParams.success) {
        return res.status(400).json({
            status: "error",
            message: validatedParams.error.issues[0].message
        })
    }

    const productId = validatedParams.data;

    // validate req body
    const validatedBody = inventorySchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(400).json({
            status: "error",
            message: validatedBody.error.issues[0].message
        })
    }

    const { amount } = validatedBody.data;

    try {
        await prisma.$transaction(async (tx)=> {
            // exclusive lock
            const [product] = await tx.$queryRawUnsafe<any>(
                `SELECT * FROM "Product" WHERE id = $1 FOR UPDATE`,
                productId
              );
    
            if(!product) throw new Error(PRODUCT_NOT_FOUND);
    
            if(product.stock_quantity < amount) throw new Error(INSUFFICIENT_STOCK_QUANTITY);
    
            await tx.product.update({
                where: {
                    id: productId
                },
                data: {
                    stock_quantity: product.stock_quantity - amount
                }
            })
        })
    } catch (error: any) {
        console.log(error.message);
        if(error.message === PRODUCT_NOT_FOUND) {
            return res.status(404).json({
                status: "error",
                message: error.message
            });
        }
        else if(error.message === INSUFFICIENT_STOCK_QUANTITY) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
        else {
            return res.status(500).json({
                status: "failed",
                message: error.message
            });
        }
    }

    return res.status(200).json({
        status: "success",
        message: "stock decremented successfully"
    })
}
