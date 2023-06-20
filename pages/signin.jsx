import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  Image,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthContext } from '@/context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useRouter } from 'next/router';
    
  export default function SigninCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const form = useForm({
      defaultValues: {
        email: "",
        password: ""
      }
    });

    const url = "http://38.242.149.102/api/login"


    const createUser = async ({variables}) =>{
      return axios.post(url,{
        email:variables.email,
        password:variables.password,
      }).then(res => res.data)
    }

    const toast = useToast()
    const { register,handleSubmit, formState } = form;

    const { errors } = formState

    const mutation = useMutation({
      mutationFn: createUser,
      onSuccess: (data) => {
        toast({
          title: 'تم تسجيل الدخول',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        localStorage.setItem("token",data.data.token)
        login(data.data.token)
        router.push("/")
      },

      onError: () => {
        toast({
          title: 'الرجاء التأكد من البريد الإلكتروني وكلمة المرور',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
  
      }
      })

    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }


    // if (mutation.isSuccess) {
      // login(mutation.data.data.token)
    // }  

    // if (mutation.error) {
    //   console.log(mutation.error.response.data.message);
    // }


    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Image src="/cet_logo.png"  alt="me" bg={"lightsteelblue"} width={"500px"}  borderRadius={"10px"} ></Image>

          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>قم بتسجيل الدخول إلى حسابك</Heading>
            <Text color={"red"} fontSize={"20px"} >{mutation.isError && mutation.error.response.data.message}</Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form  onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <Input type="email" id='email' {...register("email" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })}/>
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.email?.message}</Text>
                <FormControl id="password">
                  <FormLabel>كلمة المرور</FormLabel>
                    <InputGroup> 
                      <Input id="password" type={showPassword ? 'text' : 'password'} {...register("password" , {
                                      required: {
                                        value: true,
                                        message: "يجب تعبئة هذا الحقل"
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
                  </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.password?.message}</Text>
                <Stack spacing={10}>
                  {/* <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack> */}
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
                    تسجيل دخول
                  </Button>
                  <Link fontWeight={"semibold"} textAlign="center"  href="./signup" >
                    ليس لديك حساب ؟ 
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    );
  }
  

  SigninCard.getLayout = function PageLayout(page) { 
    return (
      <>
        {page}
      </>
    )
  
  }