const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const zod = require('zod');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/generateToken');

const signUpbody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    confirmPassword: zod.string(),
    profilePhoto: zod.string(),
    gender: zod.string(),
})

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, confirmPassword, profilePhoto, gender } = req.body;

    if (!name || !email || !password || !confirmPassword || !profilePhoto || !gender) {
        return res.status(400).json({ message: 'Please send all the fields' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and ConfirmPassword do not matched' });
    }

    const { success } = signUpbody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: 'Wrong type of inputs' });
    }
    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: 'Email already Used , Please go to SignIN Page' });
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?email:${email}`;
            const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?email:${email}`;
            const pic = gender === "male" ? maleProfilePhoto : femaleProfilePhoto;
            const newUser = {
                name,
                email,
                password: hash,
                profilePhoto: pic,
                gender,
            }

            const user = await User.create(newUser);

            if (user) {
                return res.status(201).json({
                    name: name,
                    email: email,
                    profilePhoto: pic,
                    gender: gender,
                    token: generateToken(user._id),
                })
            }
            else {
                return res.status(400).json({ message: "User not registered" });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const logInbody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please send all the Fields" });
    }

    const { success } = logInbody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Wrong type of inputs" });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            const matchpassword = await bcrypt.compare(password, user.password);
            const token = generateToken(user._id);
            if (matchpassword) {
                return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true }).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePhoto: user.profilePhoto,
                    gender: user.gender,
                    token: token,
                })
            }
            else {
                return res.status(400).json({ message: "Wrong Credentials" })
            }
        }
        else {
            return res.status(400).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const LogOut = asyncHandler(async (req, res) => {
    try {
        return res.status(200).cookie("token", "11", { maxAge: 0 }).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Down' });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {

    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }

});


module.exports = { registerUser, login, LogOut, getAllUsers }