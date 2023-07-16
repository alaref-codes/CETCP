import useSWR from 'swr'
import CourseCard from "../components/CourseCard"
import {Box,Heading, SimpleGrid,Card,CardBody,Text, Container} from "@chakra-ui/react"
import { useContext,useEffect,useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import * as URL from "@/constants"
import Link from 'next/link';


async function getMyCourses(token) {
  return await fetch(`${URL.API_URL}/courses-students`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

export default function myCourses() {
  const {token,isLoggedIn,user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState(null)
  const [ signinModal , setSigninModal ] = useState(false);
  const router = useRouter();



  useEffect(() => { 
    if (token && isLoggedIn && user) {
      getMyCourses(token).then(data =>{
        setData(data)
        setSigninModal(false);
      })      
    } else {
      setSigninModal(true)
    }
    setIsLoading(false)
  }, [token,isLoggedIn,user])
  
  if (isLoading) return <Loading></Loading>;

  return (
    <>
    <Box borderBottom="1px solid gray" position={"relative"} bg='blue.50' h='250px'>
      <Heading as={"h1"} fontSize={{base:"2xl",md:"6xl"}} position={"absolute"} bottom={{base:"80px",md:"35px"}} right={"150px"}  >الدورات الخاصة بك</Heading>
    </Box>
    {signinModal ? 
    <Container padding={"140px"} >
      <Text textAlign={"center"} marginBottom={"10px"} >عفوا أنت الأن غير مسجل</Text>
      <Link href={"/signin"}>
      <Card border={"1px solid black"} >
        <CardBody>
          <Text textAlign={"center"}  >تسجيل الدخول </Text>
        </CardBody>
      </Card></Link></Container> : <>
      {data && <>{data.data.data.length > 0  ? <SimpleGrid bg={"gray.50"} padding={"10px"} width={{base:"initial", md:"85%"}} margin={"auto"} minChildWidth='280px' spacing='20px'  >
      {data.data.data.map(course => (
      <CourseCard  key={course.id} withDescription={false}  course={course} payed={true} myCourses={[]} />
      ))}
      </SimpleGrid> : <Card border={"1px solid black"} >
        <CardBody>
        <Text textAlign={"center"}  >لا يوجد لديك دورات بعد</Text>
        </CardBody>
      </Card>}</> }
      
      </>}
  

    </>
  )
}

