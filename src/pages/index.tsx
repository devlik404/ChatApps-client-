import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import ChatApp from "./chat";
import { useState } from "react";

const Home = () => {
  const [receiverId, setReceiverId] = useState("");

  const handleUserClick = (userId: string) => {
    setReceiverId(userId);
  };
  return (
    <>
      <Box>
        <Flex>
          <Box flex=".3">
            <Navbar onUserClick={handleUserClick} />
          </Box>

          <Box flex="1">
            <Flex direction="column" height="100%" width="80%" p={4}>
              <ChatApp receiverId={receiverId} />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
