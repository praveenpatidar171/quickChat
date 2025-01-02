import React, { useEffect } from 'react'
import { InputMessage } from './InputMessage'
import { Messages } from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

export const ChatBox = () => {
    const { selectedUser, onlineUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const isOnline = onlineUsers?.includes(selectedUser?.[0]?._id);
    useEffect(() => {
        return () => dispatch(setSelectedUser(null));
    }, []);
    return (
        <>
            {
                selectedUser !== null ? <div className='md:min-w-[550px] flex flex-col'>
                    <div className="w-full p-3 flex items-center bg-slate-300 gap-4">
                        <div className="relative h-12 w-12">
                            <img className="h-12 w-12 rounded-full" src={selectedUser?.[0]?.profilePhoto} alt="user-img" />
                            <div className={`${isOnline ? 'absolute' : 'hidden'} top-1 right-[-1px] border-[1px] border-white bg-green-600 h-3 w-3 rounded-full`}></div>
                        </div>
                        <h1 className="text-base font-medium">{selectedUser?.[0]?.name[0].toUpperCase() + selectedUser?.[0]?.name.slice(1)}</h1>
                    </div>
                    <div className='flex flex-col gap-6 overflow-auto p-1 scroll-smooth'>
                        <Messages />
                    </div>
                    <div className='flex justify-center items-center'>
                        <InputMessage />
                    </div>
                </div> : <div className='md:min-w-[550px] text-white flex justify-center items-center text-lg font-medium'>Click on User to start a conversation</div>
            }
        </>
    )
}
