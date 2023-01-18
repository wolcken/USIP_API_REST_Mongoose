const express = require("express");
const userRouter = express.Router();
const { getAllUsers, addAUser, getAUser, updateAUser, deleteAUser } = require("../controllers/User");

userRouter
    .route("/")
    .get(getAllUsers)
    .post(addAUser);

userRouter
    .route("/:id")
    .get(getAUser)
    .put(updateAUser)
    .delete(deleteAUser);

module.exports = userRouter;