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
  import Loading from '@/components/Loading';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import * as URL from '@/constants'
  import { AuthContext } from '@/context/AuthContext';
  import { useForm } from 'react-hook-form';
  import { 
    useQuery,
    useMutation
  } from '@tanstack/react-query';
  import React from 'react';

async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
  .catch(err => {
    console.log(err);
  })
}

  export default function ProfilePage() {
    const { isLoggedIn, token,login } = React.useContext(AuthContext);
    const [data, setData] = React.useState(undefined);

    React.useEffect(() => {
      if (!isLoggedIn) {
        const storedToken = localStorage.getItem("token");
        if (storedToken != "null") {
          login(token)
          localStorage.setItem("token", storedToken)
          getUserData(storedToken).then((data) => {
            setData(data);
          });
        }
      } else {
        getUserData(token).then((data) => {
          setData(data);
          localStorage.setItem("token", token)

        });
      }
    
    },[])
    
    let form = undefined
    console.log(data);
    console.log(isLoggedIn);
    console.log(token);
    if (data) {
      form = useForm({
        defaultValues: {
          username: "nice",
          email: data.email,
          password: data.password,
        }
      });
    } else {
      form = useForm({
        defaultValues: {
          username: "",
          email: "",
          password: "",
        }
      });
    }
    const { register } = form;

    const mutation = useMutation({
      mutationFn: () => {console.log("hello world");},
      retry: 2,
      onSuccess: () => {
        toast({
          title: 'تم تحديث الحساب بنجاح',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      },

      })

 
    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }

    // const config = {
    //   headers: {
        
    //   }
    // }
    // if (token) {
    //   axios.defaults.headers.common['Authorization'] = token
    //   const {axiosData,isLoading} = useQuery({
    //     queryFn: async () => {
    //       const {data} = await axios.get(`${URL.API_URL}/user-show`)
    //       console.log(data);
    //       return data;
    //     }
    //   })
    // }

    if (!data) {
      return <Loading/>
    }

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
          <FormControl id="userIcon">
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
          <FormControl id="username" isRequired>
            <FormLabel>اسم المستخدم</FormLabel>
            <Input
              placeholder={"randomtext"}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              {...register("username")}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>البريد الالكتروني</FormLabel>
            <Input
              placeholder=""
              _placeholder={{ color: 'gray.500' }}
              type="email"
              {...register("email" )}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>كلمة المرور</FormLabel>
            <Input
              placeholder="كلمة المرور"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              {...register("password")}

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
  