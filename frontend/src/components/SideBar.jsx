import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { SearchedUsers } from './SearchedUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers, setAuthUser, setSelectedUser } from '../redux/userSlice';
import { setAllMessages } from '../redux/messageSlice';

export const SideBar = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { allUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/logout`, config);
            toast.success('User Logged Out Successfully');
            navigate('/signin');
            dispatch(setAuthUser(null));
            dispatch(setAllUsers(null));
            dispatch(setSelectedUser(null));
            dispatch(setAllMessages([]));

        } catch (error) {
            console.log(error);
        }
    }
    const handleSearch = () => {
        const userObject = allUsers?.find((user) => user.name.toLowerCase().includes(search.toLowerCase()));
        const users = [userObject];
        userObject ? dispatch(setAllUsers(users)) : toast.error('No user found');
    }
    return (
        <div className='border-r-2 border-gray-600 p-3 flex flex-col space-y-2'>
            <div className='flex items-center space-x-2'>
                <input onChange={(e) => setSearch(e.target.value)} value={search} id='text' className='border-2 border-gray-200 focus:outline-none focus:border-blue-500 rounded-md p-2' type="text" placeholder='search users' />
                <div onClick={handleSearch} className='h-10 w-10 bg-slate-300 rounded-md flex justify-center items-center hover:cursor-pointer'>
                    <BiSearchAlt2 />
                </div>
            </div>
            <div>
                <SearchedUsers />
            </div>

            <button onClick={handleLogout} className='text-base font-medium p-1 w-28 bg-slate-200 rounded-md'>Logout</button>

        </div>
    )
}
