import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages } from '../redux/messageSlice';

export const InputMessage = () => {

    const [input, setInput] = useState('');
    const { selectedUser } = useSelector((store) => store.user);
    let { allMessages } = useSelector((store) => store.message);
    const dispatch = useDispatch();

    const SubmitHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }

            const sendData = {
                message: input,
            }
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/message/send/${selectedUser?.[0]?._id}`, sendData, config);
            const newMessage = data?.messages[data?.messages.length - 1];

            if (!allMessages) {
                allMessages = [];
                dispatch(setAllMessages(
                    [...allMessages, newMessage]
                ));
            }
            else {
                dispatch(setAllMessages(
                    [...allMessages, newMessage]
                ));
            }
            setInput('');
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission or newlines
            SubmitHandler();
        }
    };

    return (
        <div className='relative px-4 my-3 w-full'>
            <input onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} value={input} className=' w-full p-2 border-2 rounded-md focus:outline-none focus:border-blue-500' id='message' type="text" placeholder='send a message' />
            <button onClick={SubmitHandler} className='absolute top-4 right-8'><IoSend /></button>
        </div>
    )
}
