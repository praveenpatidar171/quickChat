import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


export const SingleMessage = ({ message, senderImage, recevierImage }) => {
    const { authUser } = useSelector((store) => store.user);
    //with the help of selected user
    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return <div ref={scroll} className={`flex ${message?.senderId !== authUser?.[0]?._id ? 'flex-row-reverse gap-3' : ''} space-x-5 items-center text-white`}>
        <img className="h-8 w-8 rounded-full" src={message?.senderId === authUser?.[0]?._id ? senderImage : recevierImage} alt="user-img" />
        <div className=' w-[150px] text-base font-medium'>{message?.message}</div>
    </div>

}