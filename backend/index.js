const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cookieParser = require('cookie-parser');

const path = require('path');

connectDB();
const PORT = process.env.PORT || 5000;
const { app, server } = require('./socket/socket');

const _dirname = path.resolve();

app.use(cors({
    origin: 'https://quickchat-kgb4.onrender.com',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// -------Routes------

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/message', messageRoutes);

// --------------------


// ------deployment------

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

//----------------------


server.listen(PORT, () => {
    console.log(`Example server listning on ${PORT}`);
})