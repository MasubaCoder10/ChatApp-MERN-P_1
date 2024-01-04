import { useContext } from "react"
import ChatBox from "../Components/Chat/ChatBox";
import {Container, Stack} from "react-bootstrap"
import { ChatContent } from "../Context/ChatContext";
import UserChat from "../Components/Chat/userChat";
import { AuthContext } from '../Context/AuthContext';
import PotentialChat from "../Components/Chat/PotentialChat";



export default function Chat() {
  const {user} = useContext(AuthContext)
  const {userChats, isUserChatLoading, updateCurrentChat} = useContext(ChatContent);
  return (
    <Container>
      <PotentialChat />
      {userChats?.length < 1 ? null: (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index)=>{
              return (
                
                <div key={index} onClick={()=>updateCurrentChat(chat)}>
                  <UserChat chat= {chat} user={user} />
                  
                </div>
              )
            })}
          </Stack>
          <ChatBox />

        </Stack>
      )}
      
    </Container>
  )
}


