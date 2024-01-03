import { useContext } from "react"
import {Container, Stack} from "react-bootstrap"
import { ChatContent } from "../Context/ChatContext";
import UserChat from "../Components/Chat/userChat";
import { AuthContext } from '../Context/AuthContext';


export default function Chat() {
  const {user} = useContext(AuthContext)
  const {userChats, userChatError, isUserChatLoading} = useContext(ChatContent);
  console.log("userChats",userChats);
  return (
    <Container>
      {userChats?.lenght < 1 ? null: (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatLoading && <p>Loading chats...</p>}
            {userChats?.((chat, index)=>{
              return (
                <div key={index}>
                  <UserChat chat= {chat} user={user} />
                </div>
              )
            })}
          </Stack>
          <p>ChatBox</p>

        </Stack>
      )}
      
    </Container>
  )
}


