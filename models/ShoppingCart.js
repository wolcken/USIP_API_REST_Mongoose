const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    invoice: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const shoppingCartModel = mongoose.model("carts", cartSchema);
module.exports = shoppingCartModel;