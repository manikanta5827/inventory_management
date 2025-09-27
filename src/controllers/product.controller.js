import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req,res) => {
    return res.status(201).json({
        status: "success",
        message: "product created successfully"
    })
}