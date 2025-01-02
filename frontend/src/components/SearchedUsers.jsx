import { useSelector } from "react-redux";
import { UsegetAllUsers } from "../hooks/UsegetAllUsers"
import { User } from "./User"

export const SearchedUsers = () => {

    UsegetAllUsers();
    const { allUsers } = useSelector((store) => store.user);
    if (!allUsers) return;
    //early return in react

    return <div className=" overflow-auto h-[440px] ">

        {
            allUsers && allUsers?.map((user) => <User key={user._id} user={user} />)
        }
    </div>
}