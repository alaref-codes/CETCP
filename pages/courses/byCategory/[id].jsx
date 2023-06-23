import CourseSearchCard from '@/components/CourseSearchCard'
import { Box, Heading,HStack,Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr'
  
import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import NotFound from '@/pages/notFound';
import axios from 'axios';
import * as URL from "@/constants"


const fetcher = async (url) => await axios.get(url).then((res) => res.data);

export default function SearchByCategoryPage() {
    const router = useRouter();
    const form = useForm();
    const { register,handleSubmit } = form;
    console.log(router.query.id);
    const { data, error,isLoading } = useSWR(`${URL.API_URL}/courses-category/${router.query.id}`, fetcher, {refreshInterval:1000});

    if (isLoading) return <Loading></Loading>;
    if (error) {
      return <NotFound/>
    }
    
    const onSubmit = (values) => {
      router.push(`/courses/search/${values.search}`)

    }

    return (
        <Box width={{base:"100%",md:"80%"}} margin="50px auto" >
        <Box marginRight={"10px"} marginBottom={"30px"} width={"70%"} >
            <form onSubmit={handleSubmit(onSubmit)}  >
            <HStack px="10px" border="1px solid black" borderRadius="10px" >
                <button><SearchIcon onClick={handleSubmit(onSubmit)} ></SearchIcon></button>
                <Input required w={{lg:"360px"}} id="search" border="0px solid white"  {...register("search")} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
            </HStack>
            </form>
        </Box>
        <Heading>نتائج البحث حسب فئة : "{data.data.data[0] && data.data.data[0].category_name}"</Heading>
        {data && data.data.data.map(course => (
            <CourseSearchCard key={course.id} course={course} ></CourseSearchCard>
        ))}
        </Box>
    )
}
