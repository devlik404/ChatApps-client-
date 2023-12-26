import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Tag,
  TagLabel,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { UseUsers } from "../config/useUser";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const Layout = ({onUserClick}:any) => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { auth,user } = UseUsers();
  
  return (
    <>
      <Box h="100vh" display="flex" flexDirection="column" gap="5" bg={"teal"}>
        <Text fontSize="4xl" fontWeight="bold" color="whitesmoke">
          BiiChat
        </Text>
        {auth.map((data) => (
         
          <WrapItem key={data.id} onClick={() => onUserClick(data)} cursor={"pointer"}>
        
            <Avatar>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            {
              <Box ml="3" alignItems="center">
                <Text fontWeight="bold">{data.name}</Text>
                <Text fontSize="sm">{data.phone}</Text>
              </Box>
            }
          
          </WrapItem>
        ))}

        <Tag
          size="lg"
          bg={"teal"}
          borderRadius="5"
          position={"absolute"}
          bottom={"0"}
        >
          <Avatar
            src="https://bit.ly/sage-adebayo"
            size="xs"
            name="Segun Adebayo"
            ml={-1}
            mr={2}
          />
          <TagLabel>{user.name}</TagLabel>
          <IconButton
            onClick={HandleLogout}
            isRound={true}
            variant="solid"
            colorScheme="teal"
            aria-label="Done"
            size="sm"
            fontSize="15px"
            m={2}
            icon={<ArrowLeftIcon />}
          />
        </Tag>
      </Box>
    </>
  );
};

export default Layout;
