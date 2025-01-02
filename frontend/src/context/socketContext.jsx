import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { setOnlineUsers } from "../redux/userSlice";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

    const { authUser } = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {

            const socketio = io(`${import.meta.env.VITE_BACKEND_BASEURL}`, {

                query: {
                    userId: authUser[0]._id
                }

            });
            setSocket(socketio);

            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            socketio.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            return () => socketio?.close();

        }
        else {
            if (socket) {
                return () => socket.close();
            }
        }

    }, [authUser]);

    return <SocketContext.Provider value={{ socket, setSocket }}>
        {children}
    </SocketContext.Provider>
}
export default SocketProvider;