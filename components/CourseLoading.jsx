import { Skeleton,Flex } from '@chakra-ui/react'

export default function CourseLoading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
            <Flex dir={"column"} >
                <Skeleton margin="180px 40px" padding={"120px"}  height='120px' />
             </Flex>
        )
  }