import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  
  import { AuthContext } from '@/context/AuthContext';


import { 
  useQuery,
  useQueryClient
 } from '@tanstack/react-query';

 import { useState,useContext } from 'react';

  export default function ProfilePage() {
    const { isLoggedIn, token } = useContext(AuthContext);
    const queryClient = useQueryClient()

    const fetchData = async () =>{
      const response = await fetch("http://38.242.149.102/api/user-show", {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} })
      const jsonData = await response.json();
      return jsonData

    }

    let myData = null;
    const { isLoading,data,error,isError,isFetched } = useQuery( ['user'], fetchData, { retry: false, refreshInterval: 0, staleTime: 0
    })
    console.log(data);
    if (isError) {
      console.log(error);
    }
    myData = data;

    return (
      <Flex
        minH={'90vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            تعديل ملفك الشخصي
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="/">
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
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>اسم المستخدم</FormLabel>
            <Input
              placeholder={"randomtext"}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>البريد الالكتروني</FormLabel>
            <Input
              placeholder=""
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>كلمة المرور</FormLabel>
            <Input
              placeholder="كلمة المرور"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  