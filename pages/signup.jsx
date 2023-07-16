
  import {
    Flex,
    Box,
    Image,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Avatar,
    Spinner,
    AvatarBadge,
    Center,
    Text,
    RadioGroup,
    Radio,
    useColorModeValue,
    Link,
    VStack,
  } from '@chakra-ui/react';
  import { useContext, useState, useEffect } from 'react';
  import { ViewIcon, ViewOffIcon,IconButton,SmallCloseIcon,SmallAddIcon } from '@chakra-ui/icons';
  import { useForm } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useMutation } from '@tanstack/react-query';
  import { AuthContext } from '@/context/AuthContext';
  import { useRouter } from 'next/router';
  import axios from 'axios';
  import * as URL from '@/constants'

  async function getUserData(token) {
    return await fetch(`${URL.API_URL}/user-show`, {
      headers: {'Authorization': `Bearer ${token}`} })
    .then(res => res.json())
  }

  export default function Signup() {
    const [topping, setTopping] = useState("1");
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [value, setValue] = useState('1')
    const [showPassword, setShowPassword] = useState(false);
    const { login,isLoggedIn,user } = useContext(AuthContext);
    const router = useRouter();
    const toast = useToast()

  
    const onChangePicture = e => {
      if (e.target.files[0]) {
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  

    const url = `${URL.API_URL}/register`

    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        number: "",        
      }
    });

    const onOptionChange = e => {
      setTopping(e.target.value)
    }

    useEffect(() => {
      if (localStorage.getItem("token") && localStorage.getItem("token") != "null") {
        getUserData(localStorage.getItem("token")).then(data => {
          if (data.data.type === "trainer") {
            router.push("/instructor/courses");
          } else {
            router.push("/");
          }
        })
      }
    }, [user,isLoggedIn])
    
    const createUser = async ({variables}) =>{
      let formData = new FormData();    //formdata object
      formData.append('name', variables.username);   //append the values with key, value pair
      formData.append('email', variables.email);
      formData.append('password', variables.password);
      formData.append('password_confirmation', variables.password_confirmation);
      if (variables.image[0]) {
        formData.append('image', variables.image[0]);
      }
      formData.append('gender', variables.gender);
      formData.append('phone', variables.number);
      formData.append('birthday', variables.birthday);
      formData.append('type', 'student');

      return axios.post(url,formData,{headers:{ "Content-Type": 'multipart/form-data'}}).then(res => res.data)

    }
  
    const { register,handleSubmit, formState } = form;

    const { errors } = formState

    const mutation = useMutation({
      mutationFn: createUser,
      onSuccess: (data) => {
        toast({
          position: 'top',
          title: 'تم تسجيل الدخول',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        localStorage.setItem("token",data.data.token)
        login(data.data.token)
        router.push("/")
      },

      })

    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }

    if (mutation.isLoading) {
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

    return (
      <Stack minH={'100vh'}  direction={{ base: 'column', md: 'row' }}>
        <Flex
        minH={'100%'}
        alignItems={'center'}
        justify={'center'}

        bg={useColorModeValue('gray.50', 'gray.800')}>
        <VStack>
        <Link href={"/"}>
          <Image src="/cet_logo.png"  alt="College of electronic technology logo" bg={"lightsteelblue"} width={"500px"}  borderRadius={"10px"} ></Image>
        </Link>
          <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box 
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={10}>
              <Stack spacing={4}>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                  <FormControl onChange={onChangePicture} id="image">
                    <FormLabel>User Icon</FormLabel>
                      <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                          <Avatar size="md" src={imgData}>
                            <AvatarBadge
                              as={IconButton}
                              size="sm"
                              rounded="full"
                              top="-10px"
                              colorScheme="red"
                              aria-label="remove Image"
                              icon={<SmallCloseIcon />}
                            />
                          </Avatar>
                        </Center>
                        <Center w="full">
                          <input width={"50%"} id={"image"} bg={"white"} type='file' placeholder='sdfsd' border={"none"} {...register("image")} />
                        </Center>
                      </Stack>
                    </FormControl>
                    <HStack>
                      <Box>
                        <FormControl>
                          <FormLabel htmlFor='username' >اسم المستخدم</FormLabel>
                          <Input  id='username' type="text" {...register("username" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            }
                          })} />
                          <Text color={"red"} fontSize={"12px"} >{errors.username?.message}</Text>
                        </FormControl>
                        </Box>
                        <Box>
                          <FormControl>
                            <FormLabel  htmlFor='number' >رقم الهاتف</FormLabel>
                            <Input id='number'  type='tel' {...register("number" , {
                                  required: {
                                    value: true,
                                    message: "يجب تعبئة هذا الحقل"
                                  },
                                  pattern: {
                                    value: /^(09|2189)[124]\d{7}$/,
                                    message: "الرجاء إدخال رقم صالح في دولة ليبيا"
                                  }
                                })}></Input>
                                <Text color={"red"} fontSize={"12px"} >{errors.number?.message}</Text>
                                <Text color={"red"} fontSize={"12px"} >{mutation.isError ? mutation.error.response.data.message?.phone && "هذا الرقم مستخدم سابقا" : "" }</Text>
                          </FormControl>
                      </Box>
                    </HStack>
                    <FormControl>
                            <FormLabel htmlFor='email' >البريد الإلكتروني</FormLabel>
                            <Input id='email' type="email" {...register("email" , {
                                  required: {
                                    value: true,
                                    message: "يجب تعبئة هذا الحقل"
                                  },
                                  pattern: {
                                    value: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
                                    message: "Invalid email format"
                                  }
                                })} />
                    </FormControl>
                    <Text color={"red"}  fontSize={"12px"} >{errors.email?.message}</Text>
                    <Text color={"red"} fontSize={"12px"} >{mutation.isError ? mutation.error.response.data.message?.email && " البريد الإلكتروني مستخدم سابقا" : "" }</Text>
                    <FormControl>
                      <FormLabel  htmlFor='gender' >الجنس</FormLabel>
                      <RadioGroup id='gender' onChange={setValue} value={value} {...register("gender", {
                        required: {
                          value: true,
                          message: "يجب تعبئة هذا الحقل"
                        }
                      })} >
                      <Stack direction='row'>
                      <input
                        type="radio"
                        name="topping"
                        value="1"
                        id="1"
                        checked={topping === "1"}
                        onChange={onOptionChange}

                      />
                      <label htmlFor="male">ذكر</label>

                      <input
                        type="radio"
                        name="topping"
                        value="2"
                        id="2"
                        checked={topping === "2"}
                        onChange={onOptionChange}

                      />
                      <label htmlFor="female">أنثى</label>

                      </Stack>
                    </RadioGroup>
                  </FormControl>
                    <FormControl>
                    <FormLabel htmlFor='password'>كلمة المرور</FormLabel>
                    <InputGroup>
                      <Input id='password' type={showPassword ? 'text' : 'password'} {...register("password" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            },
                            pattern: {
                              value: /^(?=.{8,}$)[a-zA-Z0-9!@#$%^&*()_+]/,
                              message: "كلمة المرور يجب أن لا تقل عن 8 حروف أو أرقام"
                            }
                          })} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text color={"red"}  fontSize={"12px"} >{errors.password?.message}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='password'>تأكيد كلمة المرور</FormLabel>
                    <InputGroup>
                      <Input id='password_confirmation' type={showPassword ? 'text' : 'password'} {...register("password_confirmation" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            },
                          })} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text color={"red"}  fontSize={"12px"} >{errors.password?.message}</Text>
                    <Text color={"red"} fontSize={"12px"} >{mutation.isError && mutation.error.response.data.message?.password}</Text>
                  </FormControl>
                  <FormControl>
                  <FormLabel>تاريخ الميلاد</FormLabel>
                  <Input

                    id={"birthday"}
                    _placeholder={{ color: 'gray.500' }}
                    type="date"
                    {...register("birthday" )}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    isDisabled={mutation.isLoading}
                    type='submit'
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
              </form>
                <Stack pt={6}>
                  <Text>
                    هل لديك حساب بالفعل <Link href='./signin' color={'blue.400'}>تسجيل دخول</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </VStack>
      </Flex>
        <Flex flex={1}>
          <Image
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    );
  }



  Signup.getLayout = function PageLayout(page) { 
    return (
      <>
        {page}
      </>
    )
  
  }