import { Card,Stack,Flex,CardBody,CardFooter,Button,Heading,Image, Divider, StepSeparator, Spacer, HStack} from '@chakra-ui/react'
import Link from 'next/link'
import * as URL from "@/constants"

export default function CourseCardInstructor(props) {

  return (
    <Link href={`/instructor/courseManage/${props.course.id}`} >
        <Card
        boxShadow='2xl' p='6' rounded='md' bg='white'
        direction={{ base: 'column',md:"row" }}
        overflow='hidden'
        variant='outline'
        _hover={{ bg: "gray.50" }}
        borderRadius={"4px"}
        >
        <Image
            objectFit={'contain'}
            maxW={{ base: '100%', md: '200px' }}
            src={props.course.image ? `${URL.STORAGE_URL}/${props.course.image}` : 'https://placehold.co/400x400'}
            alt='Caffe Latte'
        />

        <Stack>
            <CardBody>
            <Heading size='md'>{props.course.name}</Heading>
            <div dangerouslySetInnerHTML={{ __html: props.course.description }}></div>
            </CardBody>
            <CardFooter>
            <Flex>
            <Link href={`/instructor/courseManage/${props.course.id}`}>
                <Button variant='outline' marginLeft={"20px"} colorScheme='linkedin' >
                    إدارة / تعديل الدورة
                </Button>
            </Link>
            {props.course.first_lecture_id && <Link href={`/coursePage/lecture/${props.course.id}/${props.course.first_lecture_id }`}>
                <Button colorScheme='green' variant='outline' borderRadius={"1px"}>
                    عرض صفحة الدورة
                </Button>
            </Link> }
            <Spacer></Spacer>
            <Button marginRight={"20px"} variant='outline' colorScheme='red' >مسح</Button>
            </Flex>
            </CardFooter>
        </Stack>
        </Card>
    </Link>

  )
}
