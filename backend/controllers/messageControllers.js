const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const zod = require('zod');
const { io, getRecevierSocketId } = require('../socket/socket');
const sendMessage = asyncHandler(async (req, res) => {

    const senderId = req.user._id;
    const recevierId = req.params.id;
    const { message } = req.body;
    if (!recevierId || !message) {
        return res.status(400).json({ message: "Please send all the fields" });
    }
    const messagebody = zod.string();
    const { success } = messagebody.safeParse(message);

    if (!success) {
        return res.status(400).json({ message: "Wrong type of input" });
    }

    try {

        let chat = await Chat.findOne({
            users: { $all: [senderId, recevierId] },
        });

        if (!chat) {
            chat = await Chat.create({
                users: [senderId, recevierId]
            });

            const newMessage = await Message.create({
                senderId, recevierId, message,
            });
            if (newMessage) chat.messages.push(newMessage._id);

            await Promise.all([chat.save(), newMessage.save()]);
            chat = await Chat.findById(chat._id).populate('users', '-password').populate('messages');

            // socket.io
            const recevierSocketId = getRecevierSocketId(recevierId);

            if (recevierSocketId) {
                io.to(recevierSocketId).emit('newMessage', newMessage);
            }

            return res.status(200).json(chat);

        }
        else {
            const newMessage = await Message.create({
                senderId, recevierId, message,
            });
            if (newMessage) chat.messages.push(newMessage._id);

            await Promise.all([chat.save(), newMessage.save()])

            chat = await Chat.findById(chat._id).populate('users', '-password').populate('messages');
            // socket.io
            const recevierSocketId = getRecevierSocketId(recevierId);

            if (recevierSocketId) {
                io.to(recevierSocketId).emit('newMessage', newMessage);
            }

            return res.status(200).json(chat);

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});


const getMessages = asyncHandler(async (req, res) => {
    try {
        const recevierId = req.params.id;
        const senderId = req.user._id;
        const chat = await Chat.findOne(
            {
                users: { $all: [recevierId, senderId] },
            }
        ).populate('users', '-password').populate('messages');

        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});


module.exports = { sendMessage, getMessages };