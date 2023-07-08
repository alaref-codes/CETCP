import { Card,Stack,Text,CardBody,CardFooter,Button,Heading,Image} from '@chakra-ui/react'
import Link from 'next/link'
import * as URL from "@/constants"

export default function CourseCardInstructor(props) {

  return (
    <Link href={`/instructor/courseManage/${props.course.id}`} >
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
            src={`${URL.STORAGE_URL}/${props.course.image}`}
            alt='Caffe Latte'
        />

        <Stack>
            <CardBody>
            <Heading size='md'>{props.course.name}</Heading>
            <div dangerouslySetInnerHTML={{ __html: props.course.description }}></div>
            </CardBody>
            <CardFooter>
            <Link href={`/instructor/courseManage/${props.course.id}`}>
                <Button variant='solid' borderRadius={"1px"} marginLeft={"20px"}>
                    إدارة / تعديل الدورة
                </Button>
            </Link>
            {props.course.first_lecture_id && <Link href={`/coursePage/lecture/${props.course.id}/${props.course.first_lecture_id }`}>
                <Button  variant='solid' borderRadius={"1px"}>
                    عرض صفحة الدورة
                </Button>
            </Link> }

            </CardFooter>
        </Stack>
        </Card>
    </Link>

  )
}
