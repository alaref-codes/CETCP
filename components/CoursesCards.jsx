import { Flex,Heading,Spacer,SimpleGrid} from "@chakra-ui/react"
import CourseCard from "./CourseCard"
import useSWR from 'swr'
import Loading from "./Loading";
import axios from "axios";
import NotFound from "@/pages/notFound";
import * as URL from "@/constants"
import { useEffect,useState } from "react";
import CourseLoading from "./CourseLoading";

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
  
  if (isLoading) return <CourseLoading></CourseLoading>;
  if (error) {
    return <NotFound/>
  }

  return (
      <div id="crs">
      <Heading bg={"gray.50"}  padding={"30px"}>تصفح جميع الدورات</Heading>
      {isLoading == true ? (<Loading></Loading>) : <SimpleGrid bg={"gray.50"} width={{base:"initial", md:"95%"}} margin={"auto"} minChildWidth='280px' spacing='20px' >
      {data && data.data.data.map(course => (
        <CourseCard key={course.id} withDescription={true} course={course} myCourses={myCourses}/>
        ))}
    </SimpleGrid>
    }
    <Spacer h={"100px"} ></Spacer>
    </div>

      
      
      )
    }









  // <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" > 
