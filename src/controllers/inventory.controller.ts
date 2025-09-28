import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productIdSchema } from '../schemas/product.schema';
import { inventorySchema } from '../schemas/inventory.schema';
const prisma = new PrismaClient();

export const increaseStock = async (req: Request, res: Response) => {
    
    const validatedParams = productIdSchema.safeParse(req.params.id);

    if(!validatedParams.success) {
        return res.status(400).json({
            status: "error",
            message: validatedParams.error.issues[0].message
        })
    }

    const productId = validatedParams.data;

    const validatedBody = inventorySchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(400).json({
            status: "error",
            message: validatedBody.error.issues[0].message
        })
    }

    const { amount } = validatedBody.data;

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })

    if(!product) {
        return res.status(404).json({
            status: "success",
            message: "product not found"
        })
    }

    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            stock_quantity: product.stock_quantity + amount
        }
    })
    

    return res.status(200).json({
        status: "success",
        message: "stock incremented successfully"
    })
}

export const decreaseStock = async (req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "stock decremented successfully"
    })
}
