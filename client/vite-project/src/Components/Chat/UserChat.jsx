import { useFetchRecipientUser } from "../../../Hooks/useFetchRecipient"
import { Stack } from "react-bootstrap";
import profil from "../../assets/profile.png"
import { useContext } from "react";
import { ChatContent } from "../../Context/chatContext";
import  {unreadNotification}  from "../../Utils/unreadNotification";
import { userFetchLatestMessage } from "../../../Hooks/userFechLatestMessage";
import moment from "moment"
export default function UserChat({chat, user}) {
    const {recipientUser} = useFetchRecipientUser(chat, user);
    const {onlineUsers, sendNotification,markThisUserNotificationAsRead } = useContext(ChatContent);

const {latestMessage} = userFetchLatestMessage(chat);

const unreadNotifications= unreadNotification(sendNotification)
const thisUserNotification = unreadNotifications?.filter((n)=> n.senderId === recipientUser?._id);
    const isOnline = onlineUsers?.some((user) =>{user?.userId=== recipientUser})

    const truncateText = (text)=>{
      let shortText = text.substring(0,20);
      if(text.length>20){
        shortText = shortText + "..."
      }
      return  shortText
    }

  return (
    <div>
      <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" onClick={()=>{
        if(thisUserNotification?.length !==0){
          markThisUserNotificationAsRead(thisUserNotification, sendNotification)
        }
      }}>
        <div className="d-flex">
            <div className="me-2">
                <img src= {profil} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">
                    {recipientUser?.name}
                </div>
                <div className="text"> {
                  latestMessage?.text &&(
                    <span>{truncateText(latestMessage?.text)}</span>
                  )
                } </div>
            </div>
        </div>

        <div className="d-flex flex-column align-items-end">
            <div className="date">
                {moment(latestMessage?.createdAt).calendar()}
            </div>
            <div className={thisUserNotification?.length > 0 ?"this-user-notifications":""}>
              {thisUserNotification?.length > 0 ? thisUserNotification?.length:""}
            </div>
            <span className={isOnline?"user-online":""}></span>
        </div>
      </Stack>
    </div>
  )
}
