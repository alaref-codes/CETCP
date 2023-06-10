import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, HStack, Image,Box,Text, VStack, Divider, Heading, Spacer,MenuIcon } from "@chakra-ui/react";
import Comment from "./Comment";
export default function CommentsTab() {
  return (

    <Box marginX={{base:"5px",md:"50px"}} >
      <Heading fontSize={"1.6rem"}> جميع التعليقات على هذه المحاضرة </Heading>
    <Box minH={"-webkit-min-content"} maxH={"400px"} border={"1px solid darkgray"} borderRadius={"2px"} marginX={{base:"10px",md:"10%"}} marginY={"20px"} width={{base:"100%",md:"90%"}} overflowY={"scroll"}
                  sx={{'&::-webkit-scrollbar': {
                    width: '16px',
                    backgroundColor: "gray.300",
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    borderRadius: '17px',
                  },}}

    >  
    <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
      <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text marginRight={"10px"} fontWeight={"bold"} >Test Test</Text>
          <Spacer></Spacer>
          <Text marginLeft={"10px"} color={"gray.600"}  >2023-6-1 10:52</Text>
          <EditIcon marginBottom={"5px"} ></EditIcon>
        </Flex>
      <Box paddingRight={"60px"}  >
        <Text>basics sdlkjfsdkfj sdlkfj sdlkfjdslfkjsdflksjf lsdkjf sdlkfj</Text>
      </Box>
      </Box>
 
      <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
      <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text marginRight={"10px"} fontWeight={"bold"} >Test Test</Text>
          <Spacer></Spacer>
          <Text marginLeft={"10px"} color={"gray.600"}  >2023-6-1 10:52</Text>
          <EditIcon marginBottom={"5px"} ></EditIcon>
        </Flex>
      <Box paddingRight={"60px"}  >
        <Text>basics sdlkjfsdkfj sdlkfj sdlkfjdslfkjsdflksjf lsdkjf sdlkfj</Text>
      </Box>
      </Box>
      <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
      <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text marginRight={"10px"} fontWeight={"bold"} >Test Test</Text>
          <Spacer></Spacer>
          <Text marginLeft={"10px"} color={"gray.600"}  >2023-6-1 10:52</Text>
          <EditIcon marginBottom={"5px"} ></EditIcon>
        </Flex>
      <Box paddingRight={"60px"}  >
        <Text>basics sdlkjfsdkfj sdlkfj sdlkfjdslfkjsdflksjf lsdkjf sdlkfj</Text>
      </Box>
      </Box>
      <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
      <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text marginRight={"10px"} fontWeight={"bold"} >Test Test</Text>
          <Spacer></Spacer>
          <Text marginLeft={"10px"} color={"gray.600"}  >2023-6-1 10:52</Text>
          <EditIcon marginBottom={"5px"} ></EditIcon>
        </Flex>
      <Box paddingRight={"60px"}  >
        <Text>basics sdlkjfsdkfj sdlkfj sdlkfjdslfkjsdflksjf lsdkjf sdlkfj</Text>
      </Box>
      </Box>
      </Box>
      
        <Heading fontSize={"1.6rem"}>قم بكتابة استفسارك</Heading>
        <Comment></Comment>
      </Box>

  )
}
