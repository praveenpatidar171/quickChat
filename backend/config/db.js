const mongoose = require("mongoose")
const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_BASE_URI);
        console.log(`mongodb is connected at ${conn.connection.host}`)

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

module.exports = connectDB;