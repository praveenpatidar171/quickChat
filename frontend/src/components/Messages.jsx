import { SingleMessage } from './SingleMessage'
import { useGetMessages } from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import { useGetRealtimeMessages } from '../hooks/useGetRealtimeMessages';

export const Messages = () => {

    useGetMessages();
    useGetRealtimeMessages();

    const { authUser, selectedUser } = useSelector((store) => store.user);
    const { allMessages } = useSelector((store) => store.message);
    const recevierImage = selectedUser?.[0]?.profilePhoto;
    const senderImage = authUser?.[0]?.profilePhoto;

    return (
        <div className='px-4 overflow-auto'>
            <div className='flex flex-col space-y-6 py-3'>
                {allMessages && allMessages.map((message) => <SingleMessage key={message._id} senderImage={senderImage} recevierImage={recevierImage} message={message} />)}
            </div>

        </div>
    )
}
