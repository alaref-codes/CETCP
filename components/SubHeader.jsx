"use client"
import { Box, HStack, Button, Input, Select } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function SubHeader() {
  const router = useRouter();

  const form = useForm();
  const { register,handleSubmit } = form;

  const onSubmit = (values) => {
    router.push(`/courses/search/${values.search}`)

  }

  return (
    <Box  p="20px" > 
    <HStack flexWrap={{base:"wrap", md:"nowrap" }} spacingy="20px"  mx={{base:"10%", md:"1%"}} width={{base:"70%",md:"50%"}} >
    <HStack flexWrap={{base:"wrap", md:"nowrap" }} spacingy="20px"  display={{base:'none',md:'inline-flex'}} mx={{md:"1%"}} width={{base:"60%",md:"50%",lg:"50%"}} >
        <form onSubmit={handleSubmit(onSubmit)} >
          <HStack px="10px" border="1px solid black" borderRadius="10px" >
            <button><SearchIcon onClick={handleSubmit(onSubmit)} ></SearchIcon></button>
            <Input required w={{lg:"360px"}} id="search" border="0px solid white"  {...register("search")} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
          </HStack>
        </form>
    </HStack>
    </HStack>
    </Box>

    )
}
