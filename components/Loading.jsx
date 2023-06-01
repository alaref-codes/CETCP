import { Skeleton,Flex } from '@chakra-ui/react'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
            <Flex dir={"row"} >
                <Skeleton margin="100px 50px" padding={"300px"} height='300px' />
                <Skeleton margin="100px 50px" padding={"200px"}  height='300px' />
             </Flex>
        )
  }