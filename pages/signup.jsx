"use client"
import {
    Flex,
    Box,
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
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useForm } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm();
    const toast = useToast()
    const { register,handleSubmit } = form;

    const onSubmit = (data) => {
      console.log(data);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
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
                        <FormLabel htmlFor='firstName' >First Name</FormLabel>
                        <Input  id='firstName' type="text" {...register("firstName")} />
                      </FormControl>
                      </Box>
                      <Box>
                      <FormControl>
                        <FormLabel htmlFor='lastName' >Last Name</FormLabel>
                        <Input id='lastName' type="text" {...register("lastName")} />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl>
                    <FormLabel htmlFor='email' >Email address</FormLabel>
                    <Input id='email' type="email" {...register("email")} />
                  </FormControl>
                  <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <Input id='password' type={showPassword ? 'text' : 'password'} {...register("password")} />
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
              <Stack spacing={10} pt={2}>
                <Button
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
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  