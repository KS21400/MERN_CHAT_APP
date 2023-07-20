import { useEffect, useState } from "react";

import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages, setNoMessage }) => {
  const { user } = ChatState();
  const [messageLast15, setMessageLast15] = useState(messages[0]);
  useEffect(() => {
    let userMessage = messages.filter(e => e.sender._id === user._id);
    if (userMessage.length > 15) {
      setMessageLast15(userMessage[userMessage.length - 15])
      let diff = new Date(userMessage[userMessage.length - 1].createdAt) - new Date(messageLast15.createdAt)
      if (diff < 60000) {
        setNoMessage(true);
        alert("Cannot send more than 15 messages in a minute")
        setTimeout(() => {
          setNoMessage(false);
        }, 60000 - diff);
      }
      console.log(new Date(userMessage[userMessage.length - 1].createdAt), new Date(messageLast15.createdAt), diff)
    }

  }, [messages])
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <>  <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              <div>
                <p style={{ fontSize: 10 }}
                >{new Date(m.createdAt).toLocaleTimeString()}</p>
                {m.content}
              </div>
            </span>


          </div>

          </>

        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
