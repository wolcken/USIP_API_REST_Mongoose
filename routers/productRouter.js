const express = require("express");
const productRouter = express.Router();
const { getAllProducts, addAProduct, getAProduct, updateAProduct, deleteAProduct } = require("../controllers/Product");
const { protect } = require("../controllers/Auth");

productRouter
    .route("/")
    .all(protect)
    .get(getAllProducts)
    .post(addAProduct);

productRouter
    .route("/:id")
    .all(protect)
    .get(getAProduct)
    .put(updateAProduct)
    .delete(deleteAProduct);

module.exports = productRouter;