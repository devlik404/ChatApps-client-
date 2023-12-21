/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import ChatInput from "./../components/chat";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { ServerToClientEvents, ClientToServerEvents } from "../../../typings";
import { setAuthToken, ApiData } from "../hooks/Api";
import { IAuth, IMessage } from "../interface/IData";
import { format } from "date-fns";

const ChatApp = ({ receiverId }: any) => {
  console.log("receiverId:", receiverId);

  const [user, setUser] = useState<IAuth>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  console.log(" user:", user.id);

  const [messages, setMessages] = useState<IMessage[]>([]);
  console.log("Sending message:", messages);

  const fetchData = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await ApiData.get("/check");
      setUser(response.data.user);
    } catch (error) {
      console.info(error);
    }
  };

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000",
    {
      auth: {
        token: `Bearer ${localStorage.token}`,
      },
      query: {
        id: user.id,
      },
    }
  );

  const handleSendMessage = (content: string) => {
    console.log(content);

    if (content) {
      socket.emit("clientMsg", { senderId: user.id, receiverId, content });
    }
  };

  useEffect(() => {
    fetchData();
    socket.on("connect", () => {
      console.log("Koneksi ke server berhasil!");
    });

    socket.on("serverMsg", (data) => {
      console.log(data.senderId);

      if (data.receiverId === receiverId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: data.senderId,
            receiverId: data.receiverId,
            content: data.content,
            timestamp: data.timestamp,
          },
        ]);
      }
    });

    return () => {
      // clean event listener
      socket.off("serverMsg");
    };
  }, [receiverId, user.id]);

  const getMessageTimestamp = (timestamp: string) => {
    const messageDate = new Date(timestamp);

    return format(messageDate, "HH:mm");
  };

  return (
    <Box p={4} w={"100%"}>
      <UnorderedList listStyleType="none" p="0">
        {messages.map((message, index) => (
          <ListItem
            key={index}
            textAlign={message.senderId === user.id ? "right" : "left"}
            alignSelf={
              message.receiverId === receiverId ? "flex-end" : "flex-start"
            }
            m="2"
          >
            <Box
              bgColor={message.senderId === user.id ? "teal.400" : "gray.200"}
              color={message.receiverId === receiverId ? "white" : "black"}
              p="3"
              borderRadius="md"
            >
              <Text fontSize="md" color={"black"} borderRadius="md" p="2">
                {message.content}
              </Text>

              <Text fontSize="sm" color="gray.500">
                {getMessageTimestamp(message.timestamp)}
              </Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>

      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatApp;
