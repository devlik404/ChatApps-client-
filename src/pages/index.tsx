import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import ChatApp from "./chat";
import { useState } from "react";
import { NavTop } from "../components/navTop";

const Home = () => {
  const [receiverId, setReceiverId] = useState("");

  const handleUserClick = (props: any) => {
    setReceiverId(props);
  };
  return (
    <>
      <Box>
        <Flex>
          <Box flex=".3">
            <Navbar onUserClick={handleUserClick} />
          </Box>

          <Box flex="1"  overflow={"scroll"}>
           <NavTop props={receiverId}/>
            <Flex direction="column" height="100%" p={4} >
              <ChatApp receiverId={receiverId}/>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
