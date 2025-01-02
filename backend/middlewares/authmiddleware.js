const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Authenticate = expressAsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token , Authorization failed" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: 'Invalid token, Authorization failed' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
})

module.exports = Authenticate;