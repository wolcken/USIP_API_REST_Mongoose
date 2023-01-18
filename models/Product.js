const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true
    }
});

const productsModel = mongoose.model("products", productSchema);
module.exports = productsModel;