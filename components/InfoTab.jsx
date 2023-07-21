import {
    List,
    ListItem,
    ListIcon,
    Icon,
    Box,
    Heading
  } from '@chakra-ui/react'

import { MdCheckCircle } from "@chakra-ui/icons"
export default function InfoTab({currentLecture,duration,instructor}) {
    return (
        <Box marginX={{base:"5px",md:"50px"}} >
        <Heading fontSize={"1.6rem"}> معلومات حول المحاضرة</Heading>
                <List spacing={3} marginX={{base:"10px",md:"10%"}} marginY={"20px"} width={{base:"100%",md:"90%"}} >
                <ListItem>
                <Icon marginLeft={"8px"} viewBox='0 0 200 200' color='linkedin.700'>
                <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
                </Icon>
                    اسم الدرس:  {currentLecture.name}  
                </ListItem>
                <ListItem>
                <Icon marginLeft={"8px"} viewBox='0 0 200 200' color='linkedin.700'>
                <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
                </Icon>
                    مدة الدرس : {(duration/60).toFixed(2)} دقيقة
                </ListItem>
                <ListItem>
                <Icon marginLeft={"8px"} viewBox='0 0 200 200' color='linkedin.700'>
                <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
                </Icon>
                    شرح المدرب :  {instructor} 
                </ListItem>
                <ListItem>
                <Icon marginLeft={"8px"} viewBox='0 0 200 200' color='linkedin.700'>
                <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
                </Icon>
                     وصف:  {currentLecture.description} 
                </ListItem>
            </List>
            </Box>
        )
}
