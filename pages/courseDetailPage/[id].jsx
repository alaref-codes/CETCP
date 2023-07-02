import Loading from '../../components/Loading'
import { useRouter } from 'next/router';
import {React,useRef} from 'react';
import useSWR from 'swr';
import axios from 'axios';
import NotFound from '../notFound';
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
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter 
  } from '@chakra-ui/react';
  import * as URL from "@/constants"
  import { useToast } from '@chakra-ui/react';
  import { useMutation } from '@tanstack/react-query';


  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  export default function CourseDetailPage() {
    const toast = useToast()
    const router = useRouter();
    const { data, error,isLoading } = useSWR(`${URL.API_URL}/courses/${router.query.id}`, fetcher, {refreshInterval:1000});
    const initialRef = useRef(null)
    const finalRef = useRef(null)  
    const { isOpen, onOpen, onClose } = useDisclosure()


        
    const purchaseCourse = async () =>{
      if (localStorage.getItem("token") == "null") {
        router.push("/signin")
      }
      return axios.post(`${URL.API_URL}/courses-buy/${data.data.id}`,{},{headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}).then(res => res.data)
    }

    const mutation = useMutation({
      mutationFn: purchaseCourse,
      retry: 2,
      onSuccess: () => {
        toast({
          title:'تم الإشتراك في الدورة بنجاح',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push(`/coursePage/lecture/${data.data.id}/${data.data.first_lecture_id}`)
      },

      })

    const onSubmit = () => {
      mutation.mutate()
    }

    if (isLoading) return <Loading></Loading>;
    if (error) {
      return <NotFound/>
    }
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
              src={data.data.image ? `${URL.STORAGE_URL}/${data.data.image}` : 'https://bit.ly/sage-adebayo'}
              objectFit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {data && data.data.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={"bold"}
                lineHeight={"50px"}
                fontSize={'xl'}>
                المدرب : {data.data.trainer_name}
              </Text>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'xl'}>
                تكلفة الدورة : {data.data.price}
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
                  {data.data.header}
                </Text>
              </VStack>
              <Box>
                <Text
                  textAlign={"left"}
                  textTransform={'uppercase'}
                  mb={'4'}>
                   {data.data.description}
                </Text>
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
              size={{base:"md", md:"2xl"}}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader mr="40px" >إتمام عملية الشراء</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Heading>الدورة: {data.data.name}</Heading>
                  <chakra.p>المدرب: {data.data.trainer_name}</chakra.p>
                  <Text as="h4">تكلفة الدورة: {data.data.price}</Text>
                  <Text as="h4">رصيدك الحالي: 333</Text>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onSubmit} colorScheme='blue' ml={"10px"}>
                    إتمام العملية
                  </Button>
                  <Button onClick={onClose}>الرجوع</Button>
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
  


