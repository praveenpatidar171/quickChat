import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setAllUsers } from "../redux/userSlice";

export const UsegetAllUsers = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllUsers = async () => {

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                axios.defaults.withCredentials = true;
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/`, config);
                dispatch(setAllUsers(data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllUsers();

    }, []);
}