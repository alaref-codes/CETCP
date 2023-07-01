import { Flex,Text} from "@chakra-ui/react"
import CourseCard from "./CourseCard"
import useSWR from 'swr'
import Loading from "./Loading";
import axios from "axios";
import NotFound from "@/pages/notFound";
import * as URL from "@/constants"
import { useEffect,useState } from "react";


const fetcher = async (url) => await axios.get(url).then((res) => res.data);
async function getMyCourses(token) {
  return await fetch(`${URL.API_URL}/courses-students`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}


export default function CoursesCards() {
  const [myCourses,setMyCourses] = useState(null)
  const { data, error,isLoading } = useSWR(`${URL.API_URL}/courses`, fetcher, {refreshInterval:1000});

  useEffect(() => { 
      getMyCourses(localStorage.getItem("token")).then(data =>{
        setMyCourses(data)})      
  }, [])
  
  // Removes empty courses
  // if (data) {
  //   for (let i = 0; i < data.data.data.length; i++) {
  //     if (data.data.data[i].first_lecture_id == null) {
  //       data.data.data.splice(data.data.data.indexOf(i),1)
  //     }
  //   }
  //  }

  if (isLoading) return <Loading></Loading>;
  if (error) {

    return <NotFound/>
  }

  return (
      <>
      {isLoading == true ? <Loading></Loading> : <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
      {data && myCourses && data.data.data.map(course => (
        <CourseCard key={course.id} withDescription={true} course={course} myCourses={myCourses.data.data} />
        ))}
    </Flex>}

    </>

      
      
      )
    }









  // <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" > 
