const Cart = require("../models/ShoppingCart");
const Products = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const productsCart = await Cart.find();
        res.status(200).json({
            status: "ok",
            data: productsCart
        });
        console.log("Products in Cart");
    } catch (error) {
        console.log(error.message);
    }
}

const addToCart = async (req, res) => {
    try {
        let newProductInCart = new Cart();

        newProductInCart.invoice = req.body.invoice;
        newProductInCart.status = "Pending";
        newProductInCart.totalAmount = req.body.totalAmount;
        newProductInCart.user = req.body.user;
        newProductInCart.productId = req.body.productId;
        newProductInCart.quantity = req.body.quantity;
        newProductInCart.price = req.body.price;
        newProductInCart = await newProductInCart.save();

        res.status(200).json({
            status: "ok",
            dataInsert: newProductInCart,
            message: 'Product add to Cart'
        });
    } catch (error) {
        console.log(error.message);
    }
}

const deleteCart = async (req, res) => {
    const item = req.params.id;
    try {
        const searchItem = await Cart.findByIdAndDelete(item)
        if (!searchItem) {
            res.status(400).json({
                status: "failed",
                message: "The product is not in the Cart"
            })
        }
        res.send(searchItem);
        console.log("Product removed from Cart");
    } catch (error) {
        console.log(error.message);
    }
}

const payCart = async (req, res) => {
    
    try {
        const cart = await Cart.find();
        console.log(cart);
        cart.forEach(function(element){
            element.update(
                {status: "Paid"}
            )
            console.log(element);
        });
        cart = await cart.save();
        res.status(200).json({
            status: "ok",
            data: cart
        });
        console.log("Paid Products")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getCart,
    addToCart,
    deleteCart,
    payCart
}