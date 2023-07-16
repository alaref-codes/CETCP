import { Skeleton,Flex } from '@chakra-ui/react'

export default function CourseLoading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
            <Flex dir={"row"} >
                <Skeleton margin="100px 50px" padding={"160px"}  height='160px' />
                <Skeleton margin="100px 50px" padding={"160px"}  height='160px' />
                <Skeleton margin="100px 50px" padding={"160px"}  height='160px' />
                <Skeleton margin="100px 50px" padding={"160px"}  height='160px' />
             </Flex>
        )
  }