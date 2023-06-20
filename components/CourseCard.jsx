import { Flex,Box,Image,Icon,chakra, Img} from '@chakra-ui/react'
import Link from 'next/link'
export default function CourseCard(props) {
  return (
    <Link href={`/courseDetailPage/${props.course.id}`} >
            <Box w={{base:"300px", md:"full"}}>
            <Flex
        _dark={{
        bg: "#3e3e3e",
        }}
        p={5}
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
        shadow="lg"
        rounded="sm"
        overflow="hidden"
        >
        <Image
        w="full"
        h="150px"
        fit="cover"
        objectPosition="center"
        loading='lazy'
        src={`http://38.242.149.102/storage/courses-images/${props.course.image}`}
        alt="avatar"
        />

        <Box py={4} px={6}>
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

        </Box>
        </Box>
        </Flex>
            </Box>
            </Link>

  )
}
