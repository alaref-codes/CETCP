import { Box,Stack,Image,Flex,HStack,Link,Icon,Divider,VStack,Text } from "@chakra-ui/react";
export default function Footer() {
  return (
            <Box
            borderTop="1px"
            borderTopColor="black"
            bg="gray.100"
            _dark={{
            bg: "gray.600",
            }}
            >
            <Stack
            direction={{
            base: "column",
            lg: "row",
            }}
            w="full"
            justify="space-between"
            p={10}
            >
            <Flex justify="center">
            <Image
                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Company Logo"
                rounded="lg"
                width={{
                base: "150px",
                lg: "200px",
                }}
                height={{
                base: "75px",
                lg: "100px",
                }}
                my={{
                base: 2,
                lg: 0,
                }}
            />
            </Flex>
            <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{
                base: "12px",
                md: "16px",
            }}
            color="gray.800"
            _dark={{
                color: "white",
            }}
            textAlign={{
                base: "center",
                md: "left",
            }}
            >
            <Flex justify="start" direction="column">
                <Link href={"#"} textTransform="uppercase">Pre-Sale FAQS</Link>
                <Link href={"#"} textTransform="uppercase">Submit a ticket</Link>
            </Flex>
            <Flex justify="start" direction="column">
                <Link href={"#"} textTransform="uppercase">Services</Link>
                <Link href={"#"} textTransform="uppercase">Theme Tweak</Link>
            </Flex>
            </HStack>
            <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{
                base: "12px",
                md: "16px",
            }}
            color="gray.800"
            _dark={{
                color: "white",
            }}
            textAlign={{
                base: "center",
                md: "left",
            }}
            >
            <Flex justify="start" direction="column">
                <Link href={"#"} textTransform="uppercase">Show Case</Link>
                <Link href={"#"} textTransform="uppercase">Widget Kit</Link>
                <Link href={"#"} textTransform="uppercase">Support</Link>
            </Flex>
            <Flex justify="start" direction="column">
                <Link href={"#"} textTransform="uppercase">About Us</Link>
                <Link href={"#"} textTransform="uppercase">Contact Us</Link>
                <Link href={"#"} textTransform="uppercase">Resources</Link>
            </Flex>
            </HStack>
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
            <VStack py={3}>
            <HStack justify="center">
            <Link>
                <Icon
                color="gray.800"
                _dark={{
                    color: "white",
                }}
                h="20px"
                w="20px"
                href={"#"}
                />
            </Link>
            <Link>
                <Icon
                color="gray.800"
                _dark={{
                    color: "white",
                }}
                h="20px"
                w="20px"
                href="#"
                />
            </Link>
            <Link>
                <Icon
                _dark={{
                    color: "white",
                }}
                h="20px"
                w="20px"
                href="#"
                />
            </Link>
            <Link>
                <Icon
                _dark={{
                    color: "white",
                }}
                h="20px"
                w="20px"
                href="#"
                />
            </Link>
            </HStack>

            <Text
            textAlign="center"
            fontSize="smaller"
            _dark={{
                color: "white",
            }}
            >
            &copy;Copyright. All rights reserved.
            </Text>
            </VStack>
            </Box>
    )
}
