import { BsSend } from "react-icons/bs";
import {
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatInput = ({ onSendMessage }: any) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <>
      <Box position={"fixed"} bottom={"0"} w={"70%"} p={"15px"}>
        <InputGroup>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            borderRadius="15px"
            bgColor="white"
            borderWidth="1px"
            p={6}
          />
          <InputRightElement width="4.5rem" h={"100%"}>
            <IconButton
              colorScheme="teal"
              aria-label="Send message"
              icon={<BsSend />}
              onClick={sendMessage}
             
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
};

export default ChatInput;
