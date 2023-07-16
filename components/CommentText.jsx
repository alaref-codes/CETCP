import React from 'react'
import { Flex, Avatar,Button,Box,Text, Heading, Spacer } from "@chakra-ui/react";
import * as URL from "@/constants"
import moment from "moment";

export default function CommentText({comment}) {
  return (
    <Box borderBottom={"1px solid darkgray"} bgColor={"gray.100"} borderRadius={"2px"} padding={"10px"} width={"100%"} >
    <Flex direction={"row"} alignItems={"center"}  paddingX={"20px"} paddingY={"20px"}>
        <Avatar name={comment.user.name} src={`${URL.USER_IMAGE}/${comment.user.image}`}/>
        <Text marginRight={"10px"} fontWeight={"bold"} >{comment.user.name}</Text>
        <Spacer></Spacer>
        <Text marginLeft={"10px"} color={"gray.600"}>{moment(comment.created_at).format("YYYY-MM-DD")}</Text>
      </Flex>
    <Box paddingRight={"60px"}  >
      <Text>{comment.comment}</Text>
    </Box>
    </Box>
  )
}
