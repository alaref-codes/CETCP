import { Flex,Heading,Spacer,Text} from "@chakra-ui/react"
import CourseCard from "./CourseCard"
import useSWR from 'swr'
import Loading from "./Loading";
import axios from "axios";
import NotFound from "@/pages/notFound";
import * as URL from "@/constants"
import { useEffect,useState } from "react";

const fetcher = async (url) => await axios.get(url).then((res) => res.data);
const fetcher1 = async (url) => await axios.get(url).then((res) => res.data);
const fetcher2 = async (url) => await axios.get(url).then((res) => res.data);

async function getMyCourses(token) {
  return await fetch(`${URL.API_URL}/courses-students`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}



export default function CoursesCards() {
  const [myCourses,setMyCourses] = useState([])
  const { data, error,isLoading } = useSWR(`${URL.API_URL}/courses`, fetcher);
  // const { webDevelopementCourses, webError,webIssLoading } = useSWR(`${URL.API_URL}/courses-category/5`, fetcher1, {refreshInterval:1000});
  // const { programmingCourses,programmingIsLoading } = useSWR(`${URL.API_URL}/courses-category/3`, fetcher2, {refreshInterval:1000});

  useEffect(() => { 
      if (localStorage.getItem("token") && localStorage.getItem("token") != "null") {
        getMyCourses(localStorage.getItem("token")).then(data =>{
          setMyCourses(data.data.data)})      
      }
  }, [])
  
  if (isLoading) return <Loading></Loading>;
  if (error) {
    return <NotFound/>
  }

  // console.log(programmingCourses);
  // if (webError) {
  //   return <NotFound/>
  // }
  return (
      <>
      <Heading padding={"30px"}>جميع الدورات</Heading>
      {isLoading == true ? (<Loading></Loading>) : <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
      {data && data.data.data.map(course => (
        <CourseCard key={course.id} withDescription={true} course={course} myCourses={myCourses} />
        ))}
    </Flex>
    }
    <Spacer h={"100px"} ></Spacer>
    {/* <Heading padding={"30px"}>دورات في تخصص تصميم مواقع ويب</Heading>
    {webIssLoading == true ? (<Loading></Loading>) : <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
          {webDevelopementCourses && webDevelopementCourses.data.data.map(course => (
            <CourseCard key={course.id} withDescription={true} course={course} myCourses={myCourses} />
            ))}
        </Flex>
    }


    <Spacer h={"100px"} ></Spacer>
    <Heading padding={"30px"}>دورات في تخصص البرمجة</Heading>
    {programmingIsLoading == true ? (<Loading></Loading>) : <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
          {programmingCourses && programmingCourses.data.data.map(course => (
            <CourseCard key={course.id} withDescription={true} course={course} myCourses={myCourses} />
            ))}
        </Flex>
    } */}

    </>

      
      
      )
    }









  // <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" > 
