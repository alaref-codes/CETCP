import CourseSearchCard from '@/components/CourseSearchCard'
import { Box, Heading,HStack,Input, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import NotFound from '@/pages/notFound';
import Loading from '@/components/Loading';

const fetcher = async (url) => await axios.get(url).then((res) => res.data);


export default function SearchPage() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(`http://38.242.149.102/api/courses?contains[name]=${router.query.slug}&contains[description]=${router.query.slug}&contains[header]=${router.query.slug}`, fetcher)
    const form = useForm();
    const { register,handleSubmit } = form;


    const onSubmit = (values) => {
      router.push(`/courses/search/${values.search}`)

    }


    if (isLoading) return <Loading></Loading>;
    if (error) {
      return <NotFound/>
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
        <Heading>نتائج البحث عن : "{router.query.slug}"</Heading>
        {data && data.data.data.map(course => (
            <CourseSearchCard key={course.id} course={course} ></CourseSearchCard>
        ))}
        </Box>
    )
}
