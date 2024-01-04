import { createContext, useCallback, useEffect, useState } from "react";
import {baseUrl, getRequest, postRequest} from "../Utils/services"

export const ChatContent = createContext();

export const ChatContentProvider = ({children, user})=>{
    const [userChats, setUserChats] = useState(null);
    const [userChatError, setUserChatError] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [potentialChat, setPotentialChat] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);

    console.log("messageeeee", messages);
    

    useEffect(()=>{
        const getUsers = async()=>{
            const response = await getRequest(`${baseUrl}/users`)
            if(response.error){
                return console.log("Error fetching users", response);
            }

          const pChats =  response.filter((u)=>{
            let isChatCreated = false;

                if(user?._id == u._id){
                    return false;
                }

                if(userChats){
                    isChatCreated = userChats?.some((chat)=>{
                        return chat.members[0] == u._id || chat.members[1] == u._id;
                    })
                }
                return !isChatCreated
            })
            setPotentialChat(pChats);
        }
        getUsers();
    },[userChats]);

    useEffect(()=>{
        const getUserChat = async()=>{
            if(user?._id){
                setIsUserChatLoading(true);
                setUserChatError(null);
                console.log(user?._id);
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
 
    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat);
    }, []);

    useEffect(()=>{
        const getMessages = async()=>{
            setIsMessageLoading(true)
            setMessageError(null);

            const response = await getRequest(`${baseUrl}/messages/getAllmessage/${currentChat?._id}`)
            console.log("currentChatttttt", currentChat);
            setIsMessageLoading(false);

            if(response.error) return setMessageError(response);

            setMessages(response);
        }
        getMessages()
    }, [currentChat]);

const createChat = useCallback(async(firstId, secondId)=>{
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
        firstId,
        secondId
    })
    )
    if(response.error) return console.log("Error creating chat", response);
    setUserChats((prev) =>[...prev, response]);
},[])
    return (
    <>
        <ChatContent.Provider value={{userChats, userChatError, isUserChatLoading, potentialChat, createChat, updateCurrentChat, messages, messageError, isMessageLoading}}>
            {children}
        </ChatContent.Provider>
    </>)
}