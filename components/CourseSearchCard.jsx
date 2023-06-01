"use client"
import {Image,Text, Flex,VStack,Link, Heading } from '@chakra-ui/react'
import React from 'react'

export default function CourseSearchCard(props) {
  return (
    <Link href={`/courseDetailPage/${props.course.id}`} >
      <Flex w="70%" h={{base:"100px",md:"100px",lg:"fit-content"}} borderBottom="1px solid black" margin="20px" direction="row" >
          <Image  w={{base:"20%",md:"15%",lg:"50%" }} height={{base:"60%"}} src={props.course.image} />
          <VStack my="10px" marginRight="10px" w="50%" alignItems="right">
              <Heading fontSize={{base:"2rem",md:"2.5rem"}} width="max-content" >{props.course.name}</Heading >
              <Text>{props.course.instructor}</Text>
              <Text>السعر : {props.course.cost}</Text>
              <Text display={{base:"none",md:"none",lg:"block"}} >{props.course.description}</Text>
          </VStack>
      </Flex>
    </Link>
  )
}
