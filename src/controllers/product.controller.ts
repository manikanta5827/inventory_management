import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;

    // validating fields
    if (!name || name === "") {
        return res.status(400).json({
            status: "error",
            message: "name is required"
        })
    }

    if (!description || description === "") {
        return res.status(400).json({
            status: "error",
            message: "description is required"
        })
    }

    if (!stock_quantity) {
        return res.status(400).json({
            status: "error",
            message: "stock_quantity is required"
        })
    }

    if (isNaN(stock_quantity)) {
        return res.status(400).json({
            status: "error",
            message: "stock_quantity should be a integer"
        })
    }

    if (stock_quantity < 0) {
        return res.status(400).json({
            status: 'error',
            message: "stock_quantity must be greater than 0"
        })
    }

    if (!low_stock_threshold) {
        return res.status(400).json({
            status: "error",
            message: "low_stock_threshold is required"
        })
    }

    if (isNaN(low_stock_threshold)) {
        return res.status(400).json({
            status: "error",
            message: "low_stock_threshold should be a integer"
        })
    }

    if (low_stock_threshold < 0) {
        return res.status(400).json({
            status: 'error',
            message: "low_stock_threshold must be greater than 0"
        })
    }

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
    let productId = Number(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).json({
            status: "error",
            message: "id should be a integer"
        })
    }

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })

    if (!product) {
        return res.status(404).json({
            status: "success",
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
    let productId = Number(req.params.id);

    let { name, description, stock_quantity, low_stock_threshold } = req.body;

    let reqBody: Prisma.ProductUpdateInput = {};

    // validating name
    if (name != undefined) {
        if (name === "") {
            return res.status(400).json({
                status: "error",
                message: "name shoudn't be empty"
            })
        }
        else {
            reqBody.name = name;
        }
    }

    // validating description
    if (description != undefined) {
        if (description === "") {
            return res.status(400).json({
                status: "error",
                message: "description shoudn't be empty"
            })
        }
        else {
            reqBody.description = description;
        }
    }

    // validating stock_quantity
    if (stock_quantity != undefined) {
        stock_quantity = Number(stock_quantity);
        if (isNaN(stock_quantity)) {
            return res.status(400).json({
                status: "error",
                message: "stock_quantity shoud be a integer"
            })
        }
        else {
            if (stock_quantity < 0) {
                return res.status(400).json({
                    status: 'error',
                    message: "stock_quantity must be greater than 0"
                })
            }
            reqBody.stock_quantity = stock_quantity;
        }
    }

    // validating low_stock_threshold
    if (low_stock_threshold != undefined) {
        low_stock_threshold = Number(low_stock_threshold);
        if (isNaN(low_stock_threshold)) {
            return res.status(400).json({
                status: "error",
                message: "low_stock_threshold shoud be a integer"
            })
        }
        else {
            if (low_stock_threshold < 0) {
                return res.status(400).json({
                    status: 'error',
                    message: "low_stock_threshold must be greater than 0"
                })
            }
            reqBody.low_stock_threshold = low_stock_threshold;
        }
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
    let productId = Number(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).json({
            status: "error",
            message: "id should be a integer"
        })
    }

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })

    if (!product) {
        return res.status(404).json({
            status: "failed",
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