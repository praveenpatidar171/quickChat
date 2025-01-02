import { useSelector } from "react-redux"
import { ChatBox } from "../components/ChatBox"
import { SideBar } from "../components/SideBar"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const HomePage = () => {

    const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser?.[0]) {
            navigate('/signin')
        }
    }, [])
    return (
        <div>
            <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <div className="flex sm:h-[450px] md:h-[550px]">
                    <SideBar />
                    <ChatBox />
                </div>
            </div>
        </div>
    )
}