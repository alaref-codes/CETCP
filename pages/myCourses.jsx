import useSWR from 'swr'
import CourseCard from "../components/CourseCard"
import {Box,Heading, SimpleGrid} from "@chakra-ui/react"
import { useContext,useEffect,useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import NotFound from './notFound';
import * as URL from "@/constants"


async function getMyCourses(token) {
  return await fetch(`${URL.API_URL}/courses-students`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

export default function myCourses() {
  const {token,isLoggedIn} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false)
  const [data,setData] = useState(null)

  useEffect(() => { 
    setIsLoading(true)
    if (isLoggedIn) {
      getMyCourses(token).then(data =>{
        console.log(data);
        setData(data)})      
    }
    setIsLoading(false)
  }, [])
  
  if (isLoading) return <Loading></Loading>;

  return (
    <>
    <Box borderBottom="1px solid gray" position={"relative"} bg='blue.50' h='250px'>
      <Heading as={"h1"} fontSize={"6xl"} position={"absolute"} bottom={{base:"100px",md:"1px"}} right={"150px"} >كورساتي</Heading>
    </Box>
    
    <SimpleGrid width={"80%"} marginRight={"0px"} minChildWidth={"250px"} columns={"3"}  >
          {data && data.data.data.map(course => (
          <CourseCard  key={course.id} withDescription={false}  course={course} payed={true} myCourses={[]} />
          ))}
    </SimpleGrid>

    </>
  )
}

