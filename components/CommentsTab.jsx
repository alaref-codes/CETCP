import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Avatar,Image,Box,Text, Heading, Spacer } from "@chakra-ui/react";
import Comment from "./Comment";
import useSWR from 'swr'
import axios from "axios";
import * as URL from "@/constants"


const fetcher = async (url) => await axios.get(url).then((res) => res.data);

export default function CommentsTab({lectureId}) {
  const { data, error,isLoading } = useSWR(`${URL.API_URL}/comments/${lectureId}`, fetcher, {refreshInterval:1000});
  if (isLoading) return <Text>Loading....</Text>;

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
                  },}} >  
    {data && data.data.map(comment => (
          <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
          <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
            {console.log("dsfsd")}
              <Avatar name={comment.user.name} src={`${URL.USER_IMAGE}/${comment.user.image}`}/>
              <Text marginRight={"10px"} fontWeight={"bold"} >{comment.user.name}</Text>
              <Spacer></Spacer>
              <Text marginLeft={"10px"} color={"gray.600"}>{comment.created_at  }</Text>
              <EditIcon marginBottom={"5px"} ></EditIcon>
            </Flex>
          <Box paddingRight={"60px"}  >
            <Text>{comment.comment}</Text>
          </Box>
          </Box>
    ))}
      </Box>
      
      <Heading fontSize={"1.6rem"}>قم بكتابة استفسارك</Heading>
        <Comment lectureId={lectureId} ></Comment>
      </Box>

  )
}
