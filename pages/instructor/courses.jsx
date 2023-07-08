import CourseCardInstructor from "../../components/CourseCardInstructor"
import { useFormik } from "formik";
import Link from 'next/link';
import * as URL from '@/constants'
import {Flex,Box,HStack,Heading, SimpleGrid, FormControl, Button, Spacer, Card,CardBody,CardHeader, Text} from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import InstructorNavbar from '@/components/InstructorNavbar'
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import Footer from "@/components/Footer";

async function getMyCourses(token) {
  return await fetch(`${URL.API_URL}/courses-trainers`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

export default function InstructorCourses() {
  const [data,setData] = useState(null)
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(true);
  console.log(isLoggedIn);
  useEffect(() => { 
    setIsLoading(true)
    if (localStorage.getItem("token") && localStorage.getItem("token") != "null") { 
      getMyCourses(localStorage.getItem("token")).then(data =>{
        console.log(localStorage.getItem("token"));
        setData(data)
        setIsLoading(false)
      })       
    }
    
  }, [])  

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
       window.location.href = `/searchPage/${values.search}`;
    },
  })

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <>
      <InstructorNavbar></InstructorNavbar>
      <Box>
      <Flex  direction={"column"} borderBottom="1px solid gray"  bg='blue.50' h='250px'>
        <Box marginX={{base:"50px",md:"100px"}} marginY={"80px"}>
        <Heading as={"h1"} fontSize={"4xl"} bottom={{base:"100px",md:"1px"}} right={"150px"} >مرحباً،  </Heading>
        <Heading as={"h1"} fontSize={"3xl"} paddingTop={"30px"} bottom={{base:"100px",md:"1px"}} right={"150px"} >الدورات الخاصة بك</Heading>
        </Box>
      </Flex>
      <Flex direction={{base:"column",md:"row"}} width={"75%"} margin={"50px auto"}>
        <FormControl onSubmit={formik.handleSubmit} width={{base:"70%",md:"25%"}} marginBottom={{base:"15px",md:"none"}} >
              <HStack px="10px" border="1px solid black" borderRadius="1px" >
                <button><SearchIcon onClick={formik.handleSubmit} ></SearchIcon></button>
                <Input required w={{lg:"360px"}} id="search" focusBorderColor='transparent'
                onChange={formik.handleChange}  value={formik.values.search} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
              </HStack>
        </FormControl>

        <Spacer></Spacer>
        <Link href={"/instructor/courseManage"}><Button bg={"blue.100"} borderRadius={"none"} padding={"10px"} width={{base:"50%",md:"initial"}} >إضافة دورة</Button></Link>

      </Flex>
        {data.data.data.length > 0 ? <SimpleGrid width={"80%"} margin={"50px auto"} gap={"50px"} >
              {data && data.data.data.map(course => (
              <CourseCardInstructor key={course.id} withDescription={false}  course={course} />
              ))}
        </SimpleGrid> : <Card border={"1px solid black"} >
        <CardBody>
          <Text textAlign={"center"}  >لا يوجد لديك دورات بعد</Text>
        </CardBody>
      </Card>
      }
      <Footer></Footer>
      </Box>
    </>
  )
}



InstructorCourses.getLayout = function PageLayout(page) { 
  return (
    <>
      {page}
    </>
  )

}