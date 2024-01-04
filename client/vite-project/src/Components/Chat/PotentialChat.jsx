import { useContext } from "react"
import { ChatContent } from "../../Context/chatContext"
import { AuthContext } from "../../Context/AuthContext";

export default function PotentialChat() {
    const {user} = useContext(AuthContext)
    const {potentialChat, createChat} = useContext(ChatContent);
  return (
    <div>
      <div className="all-users" >
        {potentialChat && potentialChat.map((u, index)=>{
         return (   <div className="single-user" key={index} onClick={()=>createChat(user._id, u._id)}>
                {u.name}
                <span className="user-online"></span>
            </div>
            );
        })}
      </div>
    </div>
  )
}
