
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
    Text,
    RadioGroup,
    Radio,
    useColorModeValue,
    Link,
    VStack,
  } from '@chakra-ui/react';
  import { useContext, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useForm } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useMutation } from '@tanstack/react-query';
  import { AuthContext } from '@/context/AuthContext';
  import { useRouter } from 'next/router';
  import axios from 'axios';
  import * as URL from '@/constants'
  export default function TrainerSignupPage() {
    const [topping, setTopping] = useState("1")

    const [value, setValue] = useState('1')
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const router = useRouter();
    const toast = useToast()

    const url = `${URL.API_URL}/register`

    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
        number: "",        
      }
    });

    const onOptionChange = e => {
      setTopping(e.target.value)
    }

    const createUser = async ({variables}) =>{

      return axios.post(url,{
        name: variables.username,
        email:variables.email,
        password:variables.password,
        password_confirmation: variables.password,
        gender: variables.gender,
        phone: variables.number,
        type: "trainer"
      }).then(res => res.data)

    }
  
    const { register,handleSubmit, formState } = form;

    const { errors } = formState

    const mutation = useMutation({
      mutationFn: createUser,
      retry: 2,
      onSuccess: (data) => {
        toast({
          title: 'تم تسجيل الدخول',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        login(data.data.token)
        router.push("/")
      },

      })

    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }

    return (
      <Stack minH={'100vh'}  direction={{ base: 'column', md: 'row' }}>
        <Flex
        minH={'100%'}
        align={'center'}
        justify={'center'}

        bg={useColorModeValue('gray.50', 'gray.800')}>
        <VStack>
        <Image src="/cet_logo.png"  alt="me" bg={"lightsteelblue"} width={"500px"}  borderRadius={"10px"} ></Image>
          <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box 
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                  <form  onSubmit={handleSubmit(onSubmit)}>
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
                                    value: /^09[124]\d{8}$/,
                                    message: "الرجاء إدخال رقم صالح في دولة ليبيا"
                                  }
                                })}></Input>
                                <Text color={"red"} fontSize={"12px"} >{errors.number?.message}</Text>
                                {/* <Text color={"red"} fontSize={"12px"} >{mutation.error.response.data.message?.phone ? mutation.error.response.data.message?.phone : "" }</Text> */}
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
                    {/* <Text color={"red"} fontSize={"12px"} >{mutation.error.response.data.message?.email && mutation.error.response.data.message?.email}</Text> */}

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
                  <Text align={'center'}>
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
                "https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            }
          />
        </Flex>
      </Stack>
    );
  }



  TrainerSignupPage.getLayout = function PageLayout(page) { 
    return (
      <>
        {page}
      </>
    )
  
  }