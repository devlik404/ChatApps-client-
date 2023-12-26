import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import ChatInput from "./../components/chat";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { UseUsers } from "../config/useUser";
import { IMessage } from "../interface/IData";
import { format } from "date-fns";

const ChatApp = ({ receiverId }: any) => {
  console.log("receiverId:", receiverId);
// fetch user login
  const { user } = UseUsers();

  const [messages, setMessages] = useState<IMessage[]>([]);
  console.log("messages:", messages);

  const socket: Socket = io("http://localhost:3000", {
    auth: {
      token: `Bearer ${localStorage.token}`,
    },
    query: {
      id: user.id,
    },
  });

  useEffect(() => {
    // Event listener user connection
    socket.on("user_connected", ({ clientId }) => {
      console.log(`User connected:(ID: ${clientId})`);
    });
    // Event listener load message
    socket.on("serverMsg", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("serverMsg");

      socket.off("user_connected");
    };
  }, [socket, user.id, receiverId.id]);

  const handleSendMessage = (content: string) => {
    console.log("handleSendMessage content:", content);
    socket.emit("clientMsg", {
      senderId: user.id,
      receiverId:receiverId.id,
      content,
    });
  };


  // Mengonversi ke format jam dan  menit
  const timeConvertMessage = (timestamp?: string) => {
    if (!timestamp) {
      const defaultTime = new Date();
      return format(defaultTime, "HH:mm");
    }

    const messageDate = new Date(timestamp);
    
    return format(messageDate, "HH:mm");
  };

  return (
    <>
    <Box paddingTop={"50px"}>
      <UnorderedList listStyleType="none" p="0">
        {messages.map((message, index) => (
          <ListItem
            key={index}
            textAlign={message.senderId === user.id ? "right" : "left"}
            alignSelf={
              message.receiverId === receiverId.id ? "flex-end" : "flex-start"
            }
            m="2"
          >
            <Box
              bgColor={message.senderId === user.id ? "teal.400" : "gray.200"}
              color={message.receiverId === receiverId.id ? "white" : "black"}
              p="3"
              borderRadius="md"
            >
              <Text fontSize="md" color={"black"} borderRadius="md" p="2">
                {message.content}
              </Text>

              <Text fontSize="sm" color="gray.500">
                {timeConvertMessage(message.timestamp)}
              </Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
    </>
  );
};

export default ChatApp;
