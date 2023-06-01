import { useRouter } from 'next/router';
import {Grid, GridItem,Image,TabList,Tabs,Tab,TabPanels,OrderedList,ListItem,TabPanel, Flex, Box, Divider, Heading} from "@chakra-ui/react"
import Loading from '../../components/Loading'
import useSWR from 'swr';
import ReactPlayer from 'react-player'

import InfoTab from '@/components/InfoTab';
import CommentsTab from '@/components/CommentsTab';
import AttachementTab from '@/components/AttachementTab';

export default function CoursePage() {
    const router = useRouter();
    console.log(router.query.id);


    const fetcher = (url) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`http://localhost:5000/courses/${router.query.id}`, fetcher)

    console.log(data);
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
            <ReactPlayer height={"500px"} width={"100%"} src={"test.mp4"} url='test.mp4'/>
        </Box>
        <Tabs isFitted colorScheme='blue.500' variant='line'>
        <TabList mb='1em' >
            <Tab>مقدمة</Tab>
            <Tab>مرفقات</Tab>
            <Tab>تعليقات</Tab>
            <Tab display={{base:"grid",md:"none"}} >محتوى الدورة</Tab>

        </TabList>
        <TabPanels  mr='2em' >
            <TabPanel>
            <InfoTab/>
            </TabPanel>
            <TabPanel>
                <AttachementTab/>
            </TabPanel>
            <TabPanel>
                <CommentsTab/>
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
            borderBottomRadius={"60px"}
        >
        <Box> 
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
