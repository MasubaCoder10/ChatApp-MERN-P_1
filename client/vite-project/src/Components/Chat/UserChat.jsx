import { useFetchRecipientUser } from "../../../Hooks/useFetchRecipient"
import { Stack } from "react-bootstrap";
import profil from "../../assets/profile.png"
export default function UserChat({chat, user}) {
    const {recipientUser} = useFetchRecipientUser(chat, user);
  return (
    <div>
      <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
        <div className="d-flex">
            <div className="me-2">
                <img src= {profil} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">
                    {recipientUser?.name}
                </div>
                <div className="text">Text Message</div>
            </div>
        </div>

        <div className="d-flex flex-column align-items-end">
            <div className="date">
                12/12/02
            </div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
      </Stack>
    </div>
  )
}
