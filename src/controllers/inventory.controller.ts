import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const increaseStock = async (req: Request, res: Response) => {
    
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
