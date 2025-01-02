import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

export const User = ({ user }) => {

    const { selectedUser, onlineUsers } = useSelector((store) => store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const dispatch = useDispatch();

    const clickHandler = (user) => {
        const seleUser = [user];
        dispatch(setSelectedUser(seleUser));
    }
    return (
        <div onClick={() => clickHandler(user)} className={`${selectedUser?.[0]?._id === user?._id ? 'bg-red-300' : ''} w-full p-3 flex items-center  border-b-2 border-black gap-4`}>
            <div className="relative h-12 w-12">
                <img className="h-12 w-12 rounded-full" src={user?.profilePhoto} alt="user-img" />
                <div className={` ${isOnline ? 'absolute' : 'hidden'} top-1 right-[-1px] border-[1px] border-white bg-green-600 h-3 w-3 rounded-full`}></div>
            </div>
            <h1 className="text-base text-white font-medium">{user?.name[0].toUpperCase() + user?.name.slice(1)}</h1>
        </div>
    )
}
