import CourseSearchCard from '../../components/CourseSearchCard'
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr'

export default function SearchPage() {
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('http://localhost:5000/courses', fetcher)

    return (
        <Box width={{base:"100%",md:"80%"}} margin="50px auto" >
        <Heading>نتائج البحث عن : "{router.query.slug}"</Heading>
        {data && data.map(course => (
            <CourseSearchCard key={course.id} course={course} ></CourseSearchCard>
        ))}
        </Box>
    )
}
