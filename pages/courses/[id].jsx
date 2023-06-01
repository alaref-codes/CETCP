"use client"
import React from 'react'
import useSWR from 'swr'
import CourseCard from "../components/CourseCard"

import {Box,Heading, SimpleGrid} from "@chakra-ui/react"
export default function myCourses() {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR('http://localhost:5000/courses', fetcher)

  return (
    <>
    <Box borderBottom="1px solid gray" position={"relative"} bg='blue.50' h='250px'>
      <Heading as={"h1"} fontSize={"6xl"} position={"absolute"} bottom={{base:"100px",md:"1px"}} right={"150px"} >كورساتي</Heading>
    </Box>
    
    <SimpleGrid width={"80%"} margin={"50px auto"} minChildWidth={"250px"} columns={"3"}  >
          {data && data.map(course => (
          <CourseCard key={course.id} withDescription={false}  course={course} />
          ))}
    </SimpleGrid>

    </>
  )
}


{/* <Center bg='blue.50' h='300px' color='blue.50'>
<Heading fontSize={"5xl"} color={"black"} >
  كورساتي  
</Heading>
</Center> */}