
import{Avatar, AvatarBadge, Box, Text, WrapItem} from "@chakra-ui/react"




export const NavTop = ({props}:any) =>{
return(
  
    <Box bg={"whitesmoke"} w={"100%"} position={"fixed"} overflow={"hidden"} p={2}>
        <Box>
        <WrapItem >
        <Avatar>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        {
          <Box ml="3" alignItems="center">
            <Text fontWeight="bold">{props.name}</Text>
            <Text fontSize="sm">{props.phone}</Text>
          </Box>
        }
      
      </WrapItem>
        </Box>
    </Box>
)
}