const express = require("express");
const userRouter = express.Router();
const { getAllUsers, addAUser, getAUser, updateAUser, deleteAUser } = require("../controllers/User");
const { protect } = require("../controllers/Auth");

userRouter
    .route("/")
    .all(protect)
    .get(getAllUsers)
    .post(addAUser);

userRouter
    .route("/:id")
    .all(protect)
    .get(getAUser)
    .put(updateAUser)
    .delete(deleteAUser);

module.exports = userRouter;