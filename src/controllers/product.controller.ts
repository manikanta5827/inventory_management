import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient();
import { createProductSchema, productIdSchema, updateProductSchema } from "../schemas/product.schema";

export const createProduct = async (req: Request, res: Response) => {
    const validatedBody = createProductSchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(400).json({
            status: "error",
            message: validatedBody.error.issues[0].message
        })
    }
    const { name, description, stock_quantity, low_stock_threshold } = validatedBody.data;

    // checking for duplicate product
    const productExist = await prisma.product.findFirst({
        where: {
            name: name,
            description: description
        }
    })

    if (productExist) {
        return res.status(409).json({
            status: "error",
            message: "product already exists with same name and description"
        })
    }

    const product = await prisma.product.create({
        data: {
            name: name,
            description: description,
            stock_quantity: stock_quantity,
            low_stock_threshold: low_stock_threshold
        }
    })

    if (!product) {
        return res.status(500).json({
            status: "failed",
            message: "product creation failed"
        })
    }

    return res.status(201).json({
        status: "success",
        message: "product created successfully",
        product: product
    })
}

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();

    if (products.length == 0) {
        return res.status(200).json({
            status: "success",
            message: "no products found"
        })
    }

    return res.status(200).json({
        status: "success",
        message: "products fetched successfully",
        products: products
    })
}

export const getProduct = async (req: Request, res: Response) => {
    let validatedParams = productIdSchema.safeParse(req.params.id);

    if(!validatedParams.success) {
        return res.status(400).json({
            status: "error",
            message: validatedParams.error.issues[0].message
        })
    }

    const productId = validatedParams.data;

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })

    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "product not found"
        })
    }

    return res.status(200).json({
        status: "success",
        message: "product fetched successfully",
        product: product
    })
}

export const updateProduct = async (req: Request, res: Response) => {
    // validating params
    let validatedParams = productIdSchema.safeParse(req.params.id);

    if(!validatedParams.success) {
        return res.status(400).json({
            status: "error",
            message: validatedParams.error.issues[0].message
        })
    }

    const productId = validatedParams.data;

    // validating req body
    let validatedBody = updateProductSchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(400).json({
            status: "error",
            message: validatedBody.error.issues[0].message
        })
    }
    let { name, description, stock_quantity, low_stock_threshold } = validatedBody.data;

    let reqBody: Prisma.ProductUpdateInput = {};

    // validating name
    if (name != undefined) {
        reqBody.name = name;
    }

    // validating description
    if (description != undefined) {
        reqBody.description = description;
    }

    // validating stock_quantity
    if (stock_quantity != undefined) {
        reqBody.stock_quantity = stock_quantity;
    }

    // validating low_stock_threshold
    if (low_stock_threshold != undefined) {
        reqBody.low_stock_threshold = low_stock_threshold;
    }

    await prisma.product.update({
        where: {
            id: productId
        },
        data: reqBody
    })

    return res.status(200).json({
        status: "success",
        message: "product updated successfully"
    })
}

export const deleteProduct = async (req: Request, res: Response) => {
    let validatedData = productIdSchema.safeParse(req.params.id);

    if(!validatedData.success) {
        return res.status(400).json({
            status: "error",
            message: validatedData.error.issues[0].message
        })
    }

    const productId = validatedData.data;

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })

    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "product not found"
        })
    }

    await prisma.product.delete({
        where: {
            id: productId
        }
    })

    return res.status(200).json({
        status: "success",
        message: "product deleted successfully"
    })
}