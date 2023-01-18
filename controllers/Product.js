const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: "ok",
            data: products
        });
        console.log("List All Products")
    }catch (error) {
        console.log(error.message);
    }
}

const addAProduct = async (req, res) => {
    try {
        let newProduct = new Product();
    
        newProduct.name = req.body.name;
        newProduct.price = req.body.price;
        newProduct.unit = req.body.unit;
        newProduct.inventory = req.body.inventory;
        newProduct = await newProduct.save();
    
        res.status(200).json({
            status: "ok",
            dataInserted: newProduct
        });

        console.log("Product created")
    }catch (error) {
        console.log(error.message);
    }
}

const getAProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(400).json({
                status: "failed",
                message: "Product does not exist."
            })
        }
        res.send(product);
    } catch (error) {
        console.log(error.message);
    }
}

const updateAProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const result = await Product.findByIdAndUpdate(id, updates, options);
        if (!result) {
            res.status(400).json({
                status: "failed",
                message: "Product does not exist."
            })
        }
        res.send(result);
        console.log("Product Updated");
    }catch (error) {
        console.log(error.message);
    }
}

const deleteAProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            res.status(400).json({
                status: "failed",
                message: "Product does not exist."
            })
        }
        res.send(result);
        console.log("Product Deleted");
    }catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllProducts,
    addAProduct,
    getAProduct,
    updateAProduct,
    deleteAProduct
}