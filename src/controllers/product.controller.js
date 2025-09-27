import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
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

    // checking for duplicate product
    const productExist = await prisma.product.findFirst({
        where: {
            name: name,
            description: description
        }
    })

    if(productExist) {
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

    if(!product) {
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

export const getAllProducts = async (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "products fetched successfully"
    })
}

export const getProduct = async (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "product fetched successfully"
    })
}

export const updateProduct = async (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "product updated successfully"
    })
}

export const deleteProduct = async (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "products deleted successfully"
    })
}