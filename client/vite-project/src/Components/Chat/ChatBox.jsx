import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContent } from '../../Context/chatContext';
import { useFetchRecipientUser } from '../../../Hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import moment from "moment"
export default function ChatBox() {
    const {user} = useContext(AuthContext);
    console.log("Userrrr", user);
    const {currentChat, messages, isMessageLoading} = useContext(ChatContent);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    console.log("recipientUser",recipientUser);
    console.log("currentChattttt", currentChat);
    /* if(!recipientUser) return (
        <p style={{textAlign: "center", width: "100%"}}>
            No conversation selected yet...
        </p>
    ) */
    if(isMessageLoading) return (
        <p style={{textAlign: "center", width: "100%"}}>
            Loading chat...
        </p>
    )
  return (
   
      <Stack gap={4} className= "chat-box">
        <div className="chat-header">
            <strong> {recipientUser?.name} </strong>
        </div>
        <Stack className='messages' gap={3}>
            {messages && messages.map((message, index)=> <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message  align-self-start flex-grow-0"}`}>
                <span> {message.content} </span>
                <span className='message-footer'> {moment(message.createdAt).calendar() } </span>
            </Stack> )
        }
        </Stack>
      </Stack>
    
  )
}
