import { Box,Stack,Image,Flex,HStack,Link,Icon,Divider,VStack,Text } from "@chakra-ui/react";
import {LinkIcon} from '@chakra-ui/icons'
export default function Footer() {
  return (
            <Box
                borderTop="1px"
                borderTopColor="black"
                bgGradient={'linear(to-l, gray.700,gray.700,gray.800)'}
                _dark={{
                bg: "gray.600",
                }}
                >
                <Stack
                    w="full"
                    p={10}
                    bottom={"0"}
            >
            <Flex justify="center" >
            <Image
                src={"/cet_logo.webp"}
                alt="Company Logo"
                rounded="lg"
                width={{
                base: "full",
                lg: "500px",
                }}
                height={{
                base: "75px",
                lg: "120px",
                }}
                my={{
                base: 2,
                lg: 0,
                }}
            />
            </Flex>
 

            </Stack>
            <Divider
                w="95%"
                mx="auto"
                color="gray.600"
                _dark={{
                color: "#F9FAFB",
                }}
                h="3.5px"
            />
            <VStack  py={3}>
            <HStack justify="center">
            <Link href={"https://www.facebook.com/cet.edu.ly"}>
                <Image
                    color={"white"}
                    h="40px"
                    w="40px"
                    src={"/facebook.png"}
                />
            </Link>
            <Link href="https://cet.edu.ly">
                <Icon
                    as={LinkIcon}
                    color={"white"}
                    h="20px"
                    w="20px"
                />
            </Link>
            </HStack>

            <Text
                textAlign="center"
                fontSize="smaller"
                color={"white"}
            >
            &copy;Copyright. All rights reserved.
            </Text>
            </VStack>
            </Box>
    )
}
