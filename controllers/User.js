const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "ok",
            data: users
        });
        console.log("List All Users")
    }catch (error) {
        console.log(error.message);
    }
}

const addAUser = async (req, res) => {
    try {
        let newUser = new User();
    
        newUser.login = req.body.login;
        newUser.password = req.body.password;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser = await newUser.save();
    
        res.status(200).json({
            status: "ok",
            dataInserted: newUser
        });

        console.log("User created")
    }catch (error) {
        console.log(error.message);
    }
}

const getAUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist."
            })
        }
        res.send(user);
    } catch (error) {
        console.log(error.message);
    }
}

const updateAUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const result = await User.findByIdAndUpdate(id, updates, options);
        if (!result) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist."
            })
        }
        res.send(result);
        console.log("User Updated");
    }catch (error) {
        console.log(error.message);
    }
}

const deleteAUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist."
            })
        }
        res.send(result);
        console.log("User Deleted");
    }catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllUsers,
    addAUser,
    getAUser,
    updateAUser,
    deleteAUser
}