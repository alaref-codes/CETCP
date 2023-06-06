import { useRouter } from 'next/router';
import {Grid, GridItem,TabList,Tabs,Tab,TabPanels,OrderedList,ListItem,TabPanel, Flex, Box, Divider, Heading} from "@chakra-ui/react"
import Loading from '../../components/Loading'
import useSWR from 'swr';
import ReactPlayer from 'react-player'
import { useState } from 'react';
import InfoTab from '@/components/InfoTab';
import AttachementTab from '@/components/AttachementTab';
import CommentsTab from '@/components/CommentsTab';

export default function CoursePage() {
  const [duration, setDuration] = useState(null);
  const router = useRouter();
  const onDuration = (duration) => {
    alert(duration/60)
  };


  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(`http://localhost:5000/courses/${router.query.id}`, fetcher)

  if (isLoading) return <Loading></Loading>;
  if (!data) return <Loading></Loading>;

  return (
    <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" >
        <GridItem
            as="main" 
            colSpan={{ base: 8,lg: 6 }}    
            borderBottom={"2px solid black"}
            height={"max-content"}
        >
        <Box backgroundColor={"gray.300"}  >
            <ReactPlayer height={"500px"} width={"100%"} onDuration={onDuration} url='https://www.youtube.com/watch?v=Vmw1C7T0hqY'/>
        </Box>
        <Tabs isFitted colorScheme='blue.500' variant='line'>
        <TabList mb='1em' >
            <Tab>مقدمة</Tab>
            <Tab>مرفقات</Tab>
            <Tab>تعليقات</Tab>
            <Tab display={{base:"grid",md:"none"}} >محتوى الدورة</Tab>
        </TabList>
        <TabPanels  pr='1.5em' >
            <TabPanel>
              <InfoTab/>
            </TabPanel>
            <TabPanel>
                <AttachementTab/>
            </TabPanel>
            <TabPanel>
                <CommentsTab></CommentsTab>
            </TabPanel>
        </TabPanels>
        </Tabs>
        <Divider></Divider>
        </GridItem>  
        <GridItem
            display={{base:"none",md:"grid"}}
            as="aside"
            borderRight={"1px solid black"}
            bg="cornsilk.300" 
            colSpan={{lg: 2 }} 
            overflowY={"scroll"}
            h={"100vh"}
            marginTop={"15px"}
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
        <Box paddingRight={"10px"} > 
            <Heading borderBottom={"4px solid black"} fontSize={"1.7rem"} height={"min-content"} >محتوى الدورة</Heading>    
            <OrderedList marginRight={"30px"} >
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>
            <ListItem bg={"cornsilk.300"} 
              _hover={{
                background: "lightgray",
                color: "black",
              }}
             borderBottom={"1px solid black"} padding={"20px"} paddingRight={"2px"} fontSize={"1.2rem"} >هذه المحاضرة رقم راحد</ListItem>

        </OrderedList>
        </Box>
        </GridItem>      
    </Grid>
    )
}
