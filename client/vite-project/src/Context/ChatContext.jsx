import { createContext, useCallback, useEffect, useState } from "react";
import {baseUrl, getRequest, postRequest} from "../Utils/services"
import {io} from "socket.io-client"
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
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket]= useState(null)
    const [onlineUsers, setOnlineUsers]= useState([])
    console.log("onlineUsers Context", onlineUsers);
    
    // inital socket

    useEffect(()=>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return ()=>{newSocket.disconnect()}
    }, [user])
// add online Users
    useEffect(()=>{
        if(socket ==null) return;
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUsers", (res)=>{
            setOnlineUsers(res)
        })
        return ()=>{
            socket.off("getOnlineUsers")
        }
    },[socket])
//send message

useEffect(()=>{
    if(socket ==null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", {...newMessage, recipientId})
},[newMessage]);

useEffect(()=>{
    if(socket ==null) return;
    socket.on("getMessage", res =>{
        if(currentChat?._id !== res.chatId ){
            return;
        }

        setMessages((prev)=>[...prev , res])
    })
    return ()=>{
            socket.off("getMessage")
        }
},[socket, currentChat])


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
 

    useEffect(()=>{
        const getMessages = async()=>{
            setIsMessageLoading(true)
            setMessageError(null);

            const response = await getRequest(`${baseUrl}/messages/getAllmessage/${currentChat?._id}`)
            setIsMessageLoading(false);

            if(response.error) return setMessageError(response);

            setMessages(response);
        }
        getMessages()
    }, [currentChat]);

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat);
    }, []);


const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMeassage)=>{
    if(!textMessage) return console.log("You must type something...");
    const response = await postRequest(`${baseUrl}/messages/message`, JSON.stringify({chatId: currentChat, senderId: sender._id, content:textMessage}))
    if(response.error){
        return setSendTextMessageError(response)
    }
    setNewMessage(response);
    setMessages((prev)=>[...prev, response])
    setTextMeassage("")
   
}, [])


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
        <ChatContent.Provider value={{userChats, userChatError, isUserChatLoading, potentialChat, createChat, updateCurrentChat, messages, messageError, isMessageLoading, sendTextMessage, currentChat, onlineUsers}}>
            {children}
        </ChatContent.Provider>
    </>)
}