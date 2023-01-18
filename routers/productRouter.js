const express = require("express");
const productRouter = express.Router();
const { getAllProducts, addAProduct, getAProduct, updateAProduct, deleteAProduct } = require("../controllers/Product");

productRouter
    .route("/")
    .get(getAllProducts)
    .post(addAProduct);

productRouter
    .route("/:id")
    .get(getAProduct)
    .put(updateAProduct)
    .delete(deleteAProduct);

module.exports = productRouter;