import request from "supertest";
import app from '../src/app';

let productId: number | null = null;

describe("product crud api's tests", ()=>{

    let path: string = "/api/v1/products"; 

    // create product api
    it("Create product api", async()=>{
        const createProduct = await request(app)
        .post(`${path}`)
        .send({
            name: "samsung s25",
            description: "new faster iphone",
            stock_quantity: 40,
            low_stock_threshold: 3
        })

        expect(createProduct.status).toBe(201);
        productId = createProduct.body.product.id;
        console.log(productId);
        expect(productId).toBeDefined();
    })

    // get product api 
    it("Get product api", async()=>{
        const getProduct = await request(app)
        .get(`${path}/${productId}`)

        expect(getProduct.status).toBe(200);
    })

    // get all products api 
    it("Get all products api", async()=>{
        const getAllProducts = await request(app)
        .get(`${path}`)

        expect(getAllProducts.status).toBe(200);
    })

    // test duplicate product creation
    it("Creating duplicate product api", async()=>{
        const duplicateProduct = await request(app)
        .post(`${path}`)
        .send({
            name: "samsung s25",
            description: "new faster iphone",
            stock_quantity: 30,
            low_stock_threshold: 5
        })

        expect(duplicateProduct.status).toBe(409);
    })

    // update a product
    it("Update product", async()=>{
        const updateProduct = await request(app)
        .put(`${path}/${productId}`)
        .send({
            description: "new faster sleek iphone",
        })

        expect(updateProduct.status).toBe(200);
    })

    // // delete a product
    // it("Delete a product", async()=>{
    //     const deleteProduct = await request(app)
    //     .delete(`${path}/${productId}`)

    //     expect(deleteProduct.status).toBe(200);
    // })
})

describe("Inventory stock inc/dec api's", ()=>{

    let path: string = "/api/v1/inventory";

    // increase stock quantity
    it("Increase stock quantity", async()=>{
        console.log("productId at increase stcok", productId)
        const increaseStockproduct = await request(app)
        .put(`${path}/${productId}/stock/increase`)
        .send({
            amount: 10
        })

        expect(increaseStockproduct.status).toBe(200)
    })

    // decrease stock quantity
    it("Decrease stock quantity", async()=>{
        console.log("productId at decrease stcok", productId)
        const decreaseStockproduct = await request(app)
        .put(`${path}/${productId}/stock/decrease`)
        .send({
            amount: 10
        })

        expect(decreaseStockproduct.status).toBe(200)
    })

    // remove stock more than available
    it("Remove stock more than available", async()=>{
        console.log("productId at remove :: ",productId)
        const removeStock = await request(app)
        .put(`${path}/${productId}/stock/decrease`)
        .send({
            amount: 50
        })

        expect(removeStock.status).toBe(409)
    })

    // get all low threshold products
    it("Low threshold products", async()=>{
        const lowThreasholdProducts = await request(app)
        .get(`${path}/low-stock`)

        expect(lowThreasholdProducts.status).toBe(200)
    })

    // // delete a product
    it("Delete a product", async()=>{
        const deleteProduct = await request(app)
        .delete(`/api/v1/products/${productId}`)

        expect(deleteProduct.status).toBe(200);
    })
})