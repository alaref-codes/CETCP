import { Flex,Text} from "@chakra-ui/react"
import CourseCard from "./CourseCard"
import useSWR from 'swr'
import Loading from "./Loading";
import axios from "axios";
import NotFound from "@/pages/notFound";


const fetcher = async (url) => await axios.get(url).then((res) => res.data);


export default function CoursesCards() {

  const { data, error,isLoading } = useSWR('http://38.242.149.102/api/courses', fetcher, {refreshInterval:1000});

  if (isLoading) return <Loading></Loading>;
  if (error) {
    return <NotFound/>
  }

  return (
     // <Slider {...settings}>
      <>
      {isLoading == true ? <Loading></Loading> : <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" >
      {data && data.data.data.map(course => (
        <CourseCard key={course.id} withDescription={true} course={course} />
        ))}
    </Flex>}

    </>

      
      
      )
    }









  // <Flex wrap="nowrap" overflowX="scroll" minChildWidth="280px" spacingY="3px" > 
