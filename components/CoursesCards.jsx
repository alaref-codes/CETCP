import { Flex } from "@chakra-ui/react"
import CourseCard from "./CourseCard"
import useSWR from 'swr'


export default function CoursesCards() {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR('http://localhost:5000/courses', fetcher)

  return (

      // <Slider {...settings}>
   
      // </Slider>
      <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
        {data && data.map(course => (
          <CourseCard key={course.id} withDescription={true} course={course} />
          ))}
      </Flex>

      
      
      )
    }









  // <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" > 
