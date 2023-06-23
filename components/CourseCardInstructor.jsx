import { Card,Stack,Text,CardBody,CardFooter,Button,Heading,Image} from '@chakra-ui/react'
import Link from 'next/link'
export default function CourseCardInstructor(props) {
  return (
    <Link href={`/instructor/courseManage/2`} >
        <Card
        direction={{ base: 'column',md:"row" }}
        overflow='hidden'
        variant='outline'
        _hover={{ bg: "gray.50" }}
        borderRadius={"4px"}
        >
        <Image
            objectFit={'contain'}
            maxW={{ base: '100%', md: '200px' }}
            src='https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265'
            alt='Caffe Latte'
        />

        <Stack>
            <CardBody>
            <Heading size='md'>{props.course.name}</Heading>

            <Text py='2'>
                {props.course.description}
            </Text>
            </CardBody>

            <CardFooter>
            <Button variant='solid' borderRadius={"1px"}>
                إدارة / تعديل الدورة
            </Button>
            </CardFooter>
        </Stack>
        </Card>
    </Link>

  )
}
