const express = require("express");
const cartRouter = express.Router();
const { getCart, addToCart, deleteCart, payCart } = require("../controllers/Cart");
const { protect } = require("../controllers/Auth");

cartRouter
    .route("/product")
    .all(protect)
    .get(getCart)
    .post(addToCart);

cartRouter
    .route("/product/:id")
    .all(protect)
    .delete(deleteCart);

cartRouter
    .route("/pay")
    .all(protect)
    .post(payCart);

module.exports = cartRouter;