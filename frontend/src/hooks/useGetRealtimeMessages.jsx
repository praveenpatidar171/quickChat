import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setAllMessages } from "../redux/messageSlice";
import { SocketContext } from "../context/socketContext";

export const useGetRealtimeMessages = () => {

    const { socket } = useContext(SocketContext);
    const { allMessages } = useSelector((store) => store.message);
    const dispatch = useDispatch();


    useEffect(() => {

        socket?.on('newMessage', (newMessage) => {

            dispatch(setAllMessages([...allMessages, newMessage]));

        })

    }, [allMessages, setAllMessages]);
}
