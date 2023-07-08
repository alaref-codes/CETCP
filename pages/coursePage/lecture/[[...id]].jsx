import { useRouter } from 'next/router';
import {Grid, GridItem,TabList,Tabs,Tab,TabPanels,OrderedList,ListItem,TabPanel, Flex, Box, Divider, Heading, UnorderedList} from "@chakra-ui/react"
import Loading from "@/components/Loading"
import useSWR from 'swr';
import Footer from '@/components/Footer';
import CourseNavbar from '@/components/CourseNavbar'
import ReactPlayer from 'react-player'
import { ChakraProvider } from '@chakra-ui/react'

import { useState,useEffect, useContext } from 'react';
import InfoTab from '@/components/InfoTab';
import AttachementTab from '@/components/AttachementTab';
import CommentsTab from '@/components/CommentsTab';
import CourseContentMobile from '@/components/CourseContentMobile';
import axios from 'axios';
import NotFound from '@/pages/notFound';
import { AuthContext } from '@/context/AuthContext';
import * as URL from "@/constants"
import Link from 'next/link';


const fetcher = async (url) => await axios.get(url).then((res) => res.data);


async function getCurrentCourse(courseId) {
  return await fetch(`${URL.API_URL}/courses/${courseId}`)
  .then(res => res.json())
}

// async function getLectures(courseId) {
//   return await fetch(`${URL.API_URL}/course/${courseId}/lectures`)
//   .then(res => res.json())
// }
export default function CoursePage() {
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [currentLecture,setCurrentLecture] = useState(null);
  const [currentLectureId,setCurrentLectureId] = useState(null);
  const [lectureDuration, setLectureDuration] = useState(null);
  const {isLoggedIn} = useContext(AuthContext);
  const router = useRouter();

  const onDuration = (duration) => {
    setLectureDuration(duration)
  };

  useEffect(() => { 
    console.log("is logged in " + isLoggedIn);
    if (router.isReady) {
      getCurrentCourse(router.query.id[0]).then(courseData =>{
        setCourse(courseData);
        setLectures(courseData.data.lectures);
        setCurrentLectureId(router.query.id[1])
        // const isCurrentLecture = (element) => element.id === router.query.id[1];
        console.log(courseData.data.lectures[0]);
        setCurrentLecture(courseData.data.lectures[0])
      })     
    } 
  }, [router.isReady])
  
  useEffect(() => {
      if (lectures){
        setCurrentLectureId(router.query.id[1])
        setCurrentLecture(lectures[course.data.lectures.findIndex(element => element.id == router.query.id[1])])
        }
  },[router])
      
  // const onLectureChange = () => {
  //       if (lectures){
  //         setCurrentLectureId(router.query.id)
  //         const isCurrentLecture = (element) => element.id === router.query.id[1];
  //     setCurrentLecture[lectures[lectures.findIndex(isCurrentLecture)]]
  //   }
  // }
  console.log(currentLecture);
  // useEffect(() => {
    //   if (data) {
      //     setCurrentLecture(data.data[router.query.id[1]-1])
      //   }
      // },[router])
  if (!currentLecture) return <Loading/>;
  return (
    <>
    {course ? (
      <CourseNavbar name={course.data.name}/>
    ) : (
      <CourseNavbar name={"..."}/>
    )}
    <Grid borderTop={"5px solid black"} templateColumns="repeat(8, 1fr)" bg="gray.50" >
        <GridItem
            as="main" 
            colSpan={{ base: 8,lg: 6 }}    
            borderBottom={"2px solid black"}
            height={"max-content"}
        >
        <Box backgroundColor={"gray.300"}  >
            <ReactPlayer height={"500px"} width={"100%"}  onDuration={onDuration} controls url={`${URL.LECTURES_VIDEOS}/${currentLecture.url}`}/>
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
              <InfoTab currentLecture={currentLecture} duration={lectureDuration} instructor={course.data.trainer_name} />
            </TabPanel>
            <TabPanel>
                <AttachementTab resource_url={currentLecture.resource_url} resource_name={currentLecture.resource_name} />
            </TabPanel>
            <TabPanel>
                <CommentsTab lectureId={currentLecture.id} ></CommentsTab>
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
            {lectures && course && lectures.map(lecture => (

              lecture.id == currentLectureId ? 
              <UnorderedList listStyleType={"none"} bg={"gray"} paddingRight={"30px"} 
              _hover={{
                background: "lightgray",
              }}
              >
                <Link key={lecture.id} href={`/coursePage/lecture/${course.data.id}/${lecture.id}`}>
                  <ListItem color={"whiteAlpha.900"}
                  _hover={{
                    color: "black",
                  }}
                  padding={"20px"} paddingRight={"2px"} fontWeight={"extrabold"} fontSize={"1.2rem"} >{lecture.id}  - {lecture.name}</ListItem>
                </Link>
              </UnorderedList> : 
              <UnorderedList listStyleType={"none"} paddingRight={"30px"}
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              >
                <Link key={lecture.id} href={`/coursePage/lecture/${course.data.id}/${lecture.id}`} >
                  <ListItem bg={"cornsilk.300"} 
                  _hover={{
                    color: "black",
                  }}
                  padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >{lecture.id}  - {lecture.name}</ListItem>
                </Link>
              </UnorderedList>  
            ))}

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