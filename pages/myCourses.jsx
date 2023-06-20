import useSWR from 'swr'
import CourseCard from "../components/CourseCard"
import {Box,Heading, SimpleGrid} from "@chakra-ui/react"
import { useContext,useEffect,useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import NotFound from './notFound';

// const fetcher = async (url,token) => await axios.get(url, {headers: {Authorization : `Bearer ${token}`}}).then((res) => res.data);

// const sfetcher = async (url,token) => {
//   fetch(url, {
//     headers: {'Authorization': 'Bearer '+token} })
//   .then(res => res.json())
// }


async function getMyCourses(token) {
  return await fetch("http://38.242.149.102/api/courses-students", {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

export default function myCourses() {
  const {token,isLoggedIn} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false)
  const [data,setData] = useState(null)


  // console.log(token);
  const url = "http://38.242.149.102/api/courses-students";
  
  // if (token) {

  //   const { data, error, isLoading } = useSWR([url,token], sfetcher)
  //   myIsLoading = isLoading
  //   myError = error
  //   myData = data
  // }

  useEffect(() => { 
    setIsLoading(true)
    if (isLoggedIn) {
      getMyCourses(token).then(data =>{
        console.log(data);
        setData(data)})      
    }
    setIsLoading(false)
  }, [])
  
  // console.log(data);
  // console.log("My error");

  // console.log(error);
  if (isLoading) return <Loading></Loading>;
  // if (myError) {
  //   return <NotFound/>
  // }

  return (
    <>
    <Box borderBottom="1px solid gray" position={"relative"} bg='blue.50' h='250px'>
      <Heading as={"h1"} fontSize={"6xl"} position={"absolute"} bottom={{base:"100px",md:"1px"}} right={"150px"} >كورساتي</Heading>
    </Box>
    
    <SimpleGrid width={"80%"} marginRight={"0px"} minChildWidth={"250px"} columns={"3"}  >
          {data && data.data.data.map(course => (
          <CourseCard  eCard key={course.id} withDescription={false}  course={course} />
          ))}
    </SimpleGrid>

    </>
  )
}

