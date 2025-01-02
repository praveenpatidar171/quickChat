import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        if (!email || !password) {
            return toast.error('Please fill all the fields');
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }

            const sendData = {
                email,
                password,
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/login`, sendData, config);
            if (data) {
                toast.success('User logged in Successfully');
                const userloggedIn = [data];
                dispatch(setAuthUser(userloggedIn));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }

        setEmail('');
        setPassword('');
    }
    return <div>
        <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 py-2">
            <h1 className="text-3xl font-bold text-center">SignIn</h1>
            <div className="p-5 flex flex-col gap-1">
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="email" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="password" placeholder="password" />
                </div>

                <button onClick={handleSubmit} className='w-full bg-slate-300 rounded-sm font-bold p-1 mt-2'>SignIn</button>
                <div>
                    <h1 className='text-base font-bold'>Don't have an account, go to <Link className='underline' to={'/signup'} >SignUp</Link></h1>
                </div>
            </div>
        </div>
    </div>
}