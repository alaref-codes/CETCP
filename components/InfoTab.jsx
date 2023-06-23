import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Container,
    Box,
    Heading
  } from '@chakra-ui/react'

import { MdCheckCircle } from "@chakra-ui/icons"
export default function InfoTab(currentLecture) {
  return (
    <Box marginX={{base:"5px",md:"50px"}} >
    <Heading fontSize={"1.6rem"}> معلومات حول المحاضرة</Heading>
            <List spacing={3} marginX={{base:"10px",md:"10%"}} marginY={"20px"} width={{base:"100%",md:"90%"}} >
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                رقم الدرس: {currentLecture.id}
            </ListItem>
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                اسم الدرس:  {currentLecture.name}  
            </ListItem>
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                شرح المدرب : العارف أبو شعالة
            </ListItem>
            {/* You can also use custom icons from react-icons */}
        </List>
        </Box>
    )
}
