const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/cart/", cartRouter);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {}).then((con) => {
    console.log("connected to mongo")
});