import { Flex,Box,Image,Icon,chakra, Text, Button, Divider} from '@chakra-ui/react'
import Link from 'next/link'
import * as URL from "@/constants"
import React from 'react'
import { useState,useEffect } from 'react'

export default function CourseCard(props) {
  const [paid,setPaid] = useState(false)

  useEffect(() => {
    if ( typeof(props.myCourses) !== "undefined" && props.myCourses !== null ) {
    for (let index = 0; index < props.myCourses.length; index++) {
      if (props.myCourses[index].id == props.course.id) {
        setPaid(true)
      }
    }
  }
  
    if (props.payed) {
      setPaid(true)
    }
  
  }, [paid,props])


  return (
    <Link bg={"gray.50"} href={paid ? `/coursePage/lecture/${props.course.id}/${props.course.first_lecture_id}` : `/courseDetailPage/${props.course.id}`} >
            <Box bg={"gray.50"} w={{base:"full", md:"full"}}>
            <Flex
                  p={6}
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                  >
                  <Box
                  h="-moz-min-content"
                  w="300px"
                  mx="10px"
                  _dark={{
                  bg: "gray.800",
                  }}
                  boxShadow={"xl"}
                  rounded="sm"
                  overflow="hidden"
                >
                <Image
                w="full"
                h="150px"
                objectFit="fill"
                objectPosition="center"
                loading='lazy'
                bg={"gray.50"}
                src={`${URL.STORAGE_URL}/${props.course.image}`}
                alt="avatar"
                />

        <Box py={4} px={6} height={"200px"} >
        <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{
            color: "white",
            }}
        >
             {props.course.name}
        </chakra.h1>
        <chakra.p
            
            color="gray.700"

        >
             {props.course.trainer_name}
        </chakra.p>
        {props.withDescription && <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }} >
            {props.course.header}
        </chakra.p> }
        <Divider></Divider>

        <Button marginBottom={"10%"} colorScheme={paid ? "blue" : "orange"} >{paid ? (<Text>استمرار في التعلم</Text>) : (<Text>عرض التفاصيل</Text>)}</Button>
        </Box>
        </Box>
        </Flex>
            </Box>
            </Link>

  )
}
