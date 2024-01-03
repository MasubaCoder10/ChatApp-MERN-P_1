import { createContext, useEffect, useState } from "react";
import {baseUrl, getRequest} from "../Utils/services"

export const ChatContent = createContext();

export const ChatContentProvider = ({children, user})=>{
    const [userChats, setUserChats] = useState(null);
    const [userChatError, setUserChatError] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    
    useEffect(()=>{
        const getUserChat = async()=>{
            if(user?._id){
                setIsUserChatLoading(true);
                setUserChatError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                setIsUserChatLoading(false);

                if(response.error){
                    return setUserChatError(response);
                }
                setUserChats(response);
            }
        }

        getUserChat()
    }, [user])
    

    return (
    <>
        <ChatContent.Provider value={{userChats, userChatError, isUserChatLoading}}>
            {children}
        </ChatContent.Provider>
    </>)
}