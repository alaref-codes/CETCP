import { Flex,Box,Image,Icon,chakra,Link} from '@chakra-ui/react'

export default function CourseCard(props) {
  return (
    <Link href={`./courseDetailPage/${props.course.id}`} >
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
        src={props.course.image}
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
             {props.course.instructor}
        </chakra.p>
        {props.withDescription && <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }} >
            {props.course.description}
        </chakra.p> }

        </Box>
        </Box>
        </Flex>
            </Box>
            </Link>

  )
}
