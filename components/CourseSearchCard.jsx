import {Image,Text, Flex,VStack, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function CourseSearchCard(props) {
  return (
    <Link href={`/courseDetailPage/${props.course.id}`} >
      <Flex w="70%" h={{base:"fit-content",md:"100px",lg:"fit-content"}} borderBottom="1px solid black" margin="20px" direction="row" >
          <Image  w={{base:"20%",md:"15%",lg:"50%" }} height={{base:"60%"}} src={`http://38.242.149.102/storage/courses-images/${props.course.image}`} />
          <VStack my="10px" marginRight="10px" w="50%" alignItems="right">
              <Heading fontSize={{base:"1.3rem",md:"2.5rem"}} width="max-content" >{props.course.name}</Heading >
              <Text fontWeight={"bold"} >المدرب: {props.course.trainer_name}</Text>
              <Text fontWeight={"bold"} >السعر : {props.course.price} د.ل</Text>
              <Text display={{base:"none",md:"none",lg:"block"}} >{props.course.header}</Text>
              <Text display={{base:"none",md:"none",lg:"block"}} >{props.course.description}</Text>
          </VStack>
      </Flex>
    </Link>
  )
}
