const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;