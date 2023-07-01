import { Box,Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import {DownloadIcon} from "@chakra-ui/icons"
import * as URL from '@/constants'

export default function AttachementTab({resource_name,resource_url}) {

  return (
    <Box marginX={{base:"5px",md:"50px"}} >
    <Heading fontSize={"1.6rem"}>المرفقات الخاصة بالمحاضرة</Heading>
    <UnorderedList marginRight={"100px"} marginTop={"30px"} >
      <ListItem>
            <a href={`${URL.RESOURCE_URL}/${resource_url}`} target="_blank" ><Text display={"inline"} marginLeft={"10px"}  fontWeight={"bold"} fontSize={"1.2rem"}>{resource_name}</Text><DownloadIcon boxSize={6}/></a>
      </ListItem>
    </UnorderedList>
    </Box>
  )
}
