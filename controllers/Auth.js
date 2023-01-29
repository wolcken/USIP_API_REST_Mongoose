const User = require("../models/User");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }

        const user = await User.findOne({ email });
        const hashPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (!user || user.password !== hashPassword) {
            throw new Error('User or Password invalid');
        }

        const token = jwt.sign({ id: user._id, email, firstName: user.firstName },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN });

        const cookieOptions = {
            expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000),
            httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions)

        res.status(200).json({
            status: "ok",
            token
        });
    } catch (error) {
        console.log(error.message);
    }
};

const register = async (req, res) => {
    try {
        let { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            throw new Error('Please provide complete information');
        }

        let user = new User();
        user.email = email;
        user.password = crypto.createHash('sha256').update(password).digest('hex');
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();

        res.status(200).json({
            status: "ok",
            message: "User Created"
        });
    } catch (error) {
        console.log(error.message);
    }
};

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        } else {
            throw new Error('Please Login');
        }
        const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    login,
    register,
    protect
}