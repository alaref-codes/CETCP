import Loading from "@/components/Loading"
import { useRouter } from 'next/router';
import {useRef,useEffect,useContext, useState} from 'react';
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
    Spinner,
    VStack,
    Button,
    Heading,
    useDisclosure,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Link, HStack 
  } from '@chakra-ui/react';
  import * as URL from "@/constants"
  import { useToast } from '@chakra-ui/react';
  import { useMutation } from '@tanstack/react-query';
  import { AuthContext } from '@/context/AuthContext'

  async function getUserData(token) {
    return await fetch(`${URL.API_URL}/user-show`, {
      headers: {'Authorization': `Bearer ${token}`} })
    .then(res => res.json())
  }
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  export default function CourseDetailPage() {
    const toast = useToast()
    const router = useRouter();
    const { data, error,isLoading } = useSWR(`${URL.API_URL}/courses/${router.query.id}`, fetcher, {refreshInterval:1000});
    const initialRef = useRef(null)
    const finalRef = useRef(null)  
    const initialRefTwo = useRef(null)
    const finalRefTwo = useRef(null)  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpenTwo, onOpenTwo, onCloseTwo } = useDisclosure()
    const [ userData, setUserData ] = useState(null);
    const { user, isLoggedIn } = useContext(AuthContext);
    const [isLoadingOne,setIsLoadingOne] = useState(true);
  
    useEffect(() => {
      if (isLoggedIn && typeof(user) !== "undefined") {
        if (user.type === "trainer") {
          router.push("/instructor/courses");
        } else {
          setIsLoadingOne(false);
        }
      } else { 
        setIsLoadingOne(false);
      }
  
    }, [user,isLoggedIn])

    useEffect(() => {
      if (localStorage.getItem("token") && localStorage.getItem("token") != "null"){
        getUserData(localStorage.getItem("token")).then((data) => {
          setUserData(data.data);
        });  
      }      
    }, [])
    
        
    const purchaseCourse = async () =>{
      if (localStorage.getItem("token") == "null" || !localStorage.getItem("token")) {
        router.push("/signin")
      }
      return axios.post(`${URL.API_URL}/courses-buy/${data.data.id}`,{},{headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}).then(res => res.data)
    }

    const mutation = useMutation({
      mutationFn: purchaseCourse,
      retry: 2,
      onSuccess: () => {
        toast({
          position: 'top',
          title:'تم الإشتراك في الدورة بنجاح',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push(`/coursePage/lecture/${data.data.id}/${data.data.first_lecture_id}`)
      },
      onError: () => {
        toast({
          position: 'top',
          title:'رصيدك غير كاف للإشتراك في الدورة',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }

      })

    const onSubmit = () => {
      mutation.mutate()
    }

        
    if (isLoadingOne) {
      return <Spinner
      padding={"50px"}
      margin={"300px 650px"}
      thickness='15px'
      speed='1.20s'
  
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
      />
    }
  
    if (isLoading) return <Loading></Loading>;
    if (error) {
      return <NotFound/>
    }
    return (
      <Container  maxW={'7xl'}>
        {isLoadingOne ?  <Spinner
        padding={"50px"}
        margin={"300px 650px"}
        thickness='15px'
        speed='1.20s'

        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        /> : <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 14 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'course image'}
              src={data.data.image ? `${URL.STORAGE_URL}/${data.data.image}` : 'https://placehold.co/600x400'}
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
                <div dangerouslySetInnerHTML={{ __html: data.data.description }}></div>
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
              motionPreset='slideInBottom'
              size={{base:"xl", md:"full"}}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader mr="40px" >إتمام عملية الشراء</ModalHeader>
                <ModalCloseButton />
                <ModalBody  width={{base:"100%",md:"50%"}} margin={"100px auto"} pb={6}>
                  <Stack direction={{base:"column", md:"row"}} >
                  <Image src={`${URL.STORAGE_URL}/${data.data.image}`} width={{basE:"full",md:"300px"}} height={"300px"} ></Image>
                  <VStack textAlign={"start"} >
                    <Heading padding={"20px"} >اسم الدورة: {data.data.name}</Heading>
                    <Heading padding={"20px"} fontWeight={"light"} >المدرب: {data.data.trainer_name}</Heading>
                    <Heading padding={"20px"} fontWeight={"light"}  >تكلفة الدورة: {data.data.price}</Heading>
                    {userData ? 
                    ( <>
                      <Heading padding={"20px"} fontWeight={"light"} >رصيدك الحالي: {userData.account.balance}</Heading>
                      <Text>رصيدك المتبقي {userData.account.balance - data.data.price}</Text>
                    </>
                    )  : 
                    (<Link href="/signin">تسجيل الدخول</Link>)}
                    <Text color={"darkred"} fontSize={"20px"} >{mutation.isError && mutation.error.response.data?.message}</Text>
                  </VStack>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onSubmit} colorScheme='blue' ml={"10px"}>
                    إتمام العملية
                  </Button>
                  <Button onClick={onClose}>الرجوع</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal
              initialFocusRef={initialRefTwo}
              finalFocusRef={finalRefTwo}
              isOpen={isOpenTwo}
              onClose={onCloseTwo}
              size={{base:"full", md:"full"}}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader mr="40px" >إتمام عملية الشراء</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Heading>سيتم خصم {data.data.price} من حسابك</Heading>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' ml={"10px"}>
                    تأكيد
                  </Button>
                  <Button onClick={onCloseTwo}>رجوع</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </SimpleGrid> }
      </Container>
    );
  }
  


