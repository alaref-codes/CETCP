import { useRouter } from 'next/router';
import {Grid, GridItem,TabList,Tabs,Tab,TabPanels,OrderedList,ListItem,TabPanel, Flex, Box, Divider, Heading} from "@chakra-ui/react"
import Loading from '../../components/Loading'
import useSWR from 'swr';
import Footer from '@/components/Footer';
import CourseNavbar from '@/components/CourseNavbar'
import ReactPlayer from 'react-player'
import { ChakraProvider } from '@chakra-ui/react'

import { useState } from 'react';
import InfoTab from '@/components/InfoTab';
import AttachementTab from '@/components/AttachementTab';
import CommentsTab from '@/components/CommentsTab';
import CourseContentMobile from '@/components/CourseContentMobile';

export default function CoursePage() {
  const [duration, setDuration] = useState(null);
  const router = useRouter();
  const onDuration = (duration) => {
  };


  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(`http://localhost:5000/courses/${router.query.id}`, fetcher)

  if (isLoading) return <Loading></Loading>;
  if (!data) return <Loading></Loading>;

  return (
    <>
    <CourseNavbar/>
    <Grid borderTop={"5px solid black"} templateColumns="repeat(8, 1fr)" bg="gray.50" >
        <GridItem
            as="main" 
            colSpan={{ base: 8,lg: 6 }}    
            borderBottom={"2px solid black"}
            height={"max-content"}
        >
        <Box backgroundColor={"gray.300"}  >
            <ReactPlayer height={"500px"} width={"100%"} controls onDuration={onDuration} url='https://www.youtube.com/watch?v=zOjov-2OZ0E'/>
        </Box>
        <Tabs isFitted colorScheme='blue.500' variant='line'>
        <TabList mb='1em' >
            <Tab>مقدمة</Tab>
            <Tab>مرفقات</Tab>
            <Tab>تعليقات</Tab>
            <Tab display={{base:"grid",lg:"none"}} >محتوى الدورة</Tab>
        </TabList>
        <TabPanels  pr='1.5em' minH={"660px"} >
            <TabPanel defaultIndex={1}>
              <InfoTab/>
            </TabPanel>
            <TabPanel>
                <AttachementTab/>
            </TabPanel>
            <TabPanel>
                <CommentsTab></CommentsTab>
            </TabPanel>
            <TabPanel display={{base:"initial",md:"none"}} >
                <CourseContentMobile></CourseContentMobile>
            </TabPanel>
        </TabPanels>
        </Tabs>
        <Divider></Divider>
        <Box position={"relative"} bottom={"0px"} width={"100%"} >
          <Footer></Footer>
        </Box>
        </GridItem>  
        <GridItem
            display={{base:"none",md:"grid"}}
            as="aside"
            borderRight={"1px solid gray"}
            colSpan={{lg: 2 }} 
            overflowY={"scroll"}
            position={"relative"}
            left={"0px"}
            width={"100%"}
            maxH={"200vh"}
            backgroundColor={"cornsilk.300"} 
            p={{base:"20px", lg:"5px" }} 
            borderBottom={"2px solid black"}
            sx={{'&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '17px',
              backgroundColor: "blue.50",
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
              borderRadius: '17px',
            },}}
        >
        <Box> 
            <Heading fontSize={"1.7rem"} padding={"10px"} height={"min-content"} borderBottom={"1px solid black"} >محتوى الدورة</Heading>    
            <OrderedList marginRight={"30px"} >
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}   >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>
                         <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >هذه المحاضرة رقم راحد</ListItem>

<ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              padding={"20px"} paddingRight={"2px"} fontWeight={"bold"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>


        </OrderedList>
        </Box>
        </GridItem>      
    </Grid>
    </>
    )
}



CoursePage.getLayout = function PageLayout(page) { 
  return (
    <>
      {page}
    </>
  )

}