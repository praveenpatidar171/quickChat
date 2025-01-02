import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages } from '../redux/messageSlice';

export const useGetMessages = () => {

    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                axios.defaults.withCredentials = true;
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/message/${selectedUser?.[0]?._id}`, config);

                dispatch(setAllMessages(data?.messages));


            } catch (error) {
                console.log(error);
            }
        }
        if (selectedUser?.[0]?._id) {
            fetchMessages();
        }
    }, [selectedUser]);
}
