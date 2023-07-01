import {
    List,
    ListItem,
    ListIcon,
    Box,
    Heading
  } from '@chakra-ui/react'
import CourseComplaint from './CourseComplaint';

import { MdCheckCircle } from "@chakra-ui/icons"
export default function InfoTab({currentLecture,duration,instructor}) {
    console.log(currentLecture);
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
                    مدة الدرس : {(duration/60).toFixed(2)} دقيقة
                </ListItem>
                <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                    شرح المدرب :  {instructor} 
                </ListItem>
                {/* You can also use custom icons from react-icons */}
            </List>
            <CourseComplaint></CourseComplaint>
            </Box>
        )
}
