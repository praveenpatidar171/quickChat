import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
export const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [male, setMale] = useState(true);

    const naviagte = useNavigate();

    const handleSubmit = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            return toast.error('Plese fill all the fields');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        const sendData = {
            name: fullName,
            email,
            password,
            confirmPassword,
            profilePhoto: " ",
            gender: male ? "male" : "female"
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/register`, sendData, config);
            if (data) {
                naviagte('/signin');
                toast.success('User registered Successfully');
            }
        } catch (error) {
            console.log(error);
        }

        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    return <div>
        <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 py-2">
            <h1 className="text-3xl font-bold text-center">SignUp</h1>
            <div className="p-5 flex flex-col gap-1">
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="fullName">Full Name</label>
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} id='fullName' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="text" placeholder="Jhon Doe" />
                </div>
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="email" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="password" placeholder="password" />
                </div>
                <div className="flex flex-col gap-1 w-72">
                    <label className="text-base font-medium" htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id='confirmPassword' className="w-full border-2 border-gray-300 rounded-sm p-1 focus:outline-none focus:border-blue-500" type="password" placeholder="confirm password" />
                </div>
                <div className="flex">
                    <div className="flex gap-2 items-center p-2 ">
                        <p className="text-sm font-bold">Male</p>
                        <input name='gender' checked={male === true} onChange={() => setMale(true)} type="radio" />
                    </div>
                    <div className="flex gap-2 items-center p-2 ">
                        <p className="text-sm font-bold">Female</p>
                        <input name='gender' checked={male === false} onChange={() => setMale(false)} type="radio" />
                    </div>
                </div>
                <button onClick={handleSubmit} className='w-full bg-slate-300 rounded-sm font-bold p-1'>SignUp</button>
                <div>
                    <h1 className='text-base font-bold'>Already have an account, go to <Link className='underline' to={'/signin'} >SignIn</Link></h1>
                </div>
            </div>
        </div>
    </div>
}