import { useContext, useEffect, useState } from "react";
import { ChatContent } from "../src/Context/ChatContext";

import { baseUrl, getRequest } from "../src/Utils/services";
export const userFetchLatestMessage = (chat) => {
  const { newMessage, sendNotification } = useContext(ChatContent);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const response = getRequest(
        `${baseUrl}/massages/getAllmessage/${chat?._id}`
      );
      if (response.error) {
        return console.log("Error getting message...", response.error);
      }
      const lastMessage = response[response?.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessage();
  }, [newMessage, sendNotification]);
  return { latestMessage };
};
