import Loading from '../../components/Loading'
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import {
    Box,
    Container,
    Stack,
    chakra,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    useDisclosure,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, ChakraBaseProvider 
  } from '@chakra-ui/react';
  
const fetcher = (...args) => fetch(...args).then(res => res.json())
  export default function CourseDetailPage() {
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const { data, error, isLoading } = useSWR(`http://localhost:5000/courses/${router.query.id}`, fetcher)

    if (isLoading) return <Loading></Loading>;
    if (!data) return <Loading></Loading>;
    console.log(data);
    return (
      <Container  maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 14 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'course image'}
              src={data.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {data.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                {data.instructor}
              </Text>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                350.00 د.ل
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>
                  {data.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '20px' }}
                  color={useColorModeValue('yellow.700', 'yellow.700')}
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  محاور الدورة
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>مقدمة عن البرمجة</ListItem>
                    <ListItem> </ListItem>{' '}
                    <ListItem>Tachymeter</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              
            </Stack>
  
            <Button
              rounded={'none'}
              onClick={onOpen}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              سجل ألآن
            </Button>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              size={"2xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader mr="40px" >إتمام عملية الشراء</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Heading>الدورة: {data.name}</Heading>
                  <chakra.p>المدرب: {data.instructor}</chakra.p>
                  <Text as="h4">تكلفة الدورة: {data.cost}</Text>
                  <Text as="h4">رصيدك الحالي: 333</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }
  


