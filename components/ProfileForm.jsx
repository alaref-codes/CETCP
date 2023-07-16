import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import { useForm } from 'react-hook-form';
  import Router from "next/router";
  import * as URL from '@/constants'
  import { useState,useEffect } from 'react';
  import { 
    useMutation
  } from '@tanstack/react-query';
  import axios from 'axios';
  import { useToast } from '@chakra-ui/react';
  import { useRouter } from 'next/router';

  
export default function ProfileForm({user}) {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const toast = useToast();
  const router = useRouter();
  let form = useForm();

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

  if (user) {
    form = useForm({
      defaultValues: {
        username: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
      }
    });
  } else {
    form = useForm({
      defaultValues: {
        username: "",
        email: "",
        phone: "",
        birthday: ""
      }
    });
  }


  useEffect(() => {
    if (user){ 
      setImgData(`${URL.USER_IMAGE}/${user.image}`);
    }
    }, [])
    

  const url = `${URL.API_URL}/user-update`

  const { register,handleSubmit } = form;

  const updateUser = async ({variables}) =>{
    let formData = new FormData();    //formdata object

    if (variables.username !== user.name) {
      formData.append('name', variables.username);
    }

    if (variables.email !== user.email) {
      formData.append('email', variables.email);
    }

    if (variables.phone !== user.phone) {
      formData.append('phone', variables.phone);
    }

    if (variables.birthday !== user.birthday) {
      formData.append('birthday', variables.birthday);
    }

    if (variables.image[0]) {
      formData.append('image', variables.image[0]);
    }


    return axios.post(url,formData,{headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": 'multipart/form-data'}}).then(res => res.data)

  }

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess : () => {
      toast({
        colorScheme:"linkedin",
        title: 'تم تحديث الحساب بنجاح',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      router.replace(router.asPath)
    },

    })


  const onSubmit = (data) => {
    mutation.mutate({variables:data})
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
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
      <FormControl onChange={onChangePicture} id="image">
        <FormLabel>خلفية المستخدم</FormLabel>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar size="xl" src={imgData}>
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
            <input width={"50%"} id={"image"} bg={"white"} type='file'  border={"none"} {...register("image")} />
          </Center>
        </Stack>
      </FormControl>
      <Text>رصيدك الحالي : {user.account.balance}</Text>
      <FormControl>
        <FormLabel>اسم المستخدم</FormLabel>
        <Input
          id={"username"}
          _placeholder={{ color: 'gray.500' }}
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "يجب تعبئة هذا الحقل"
            }
          })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>البريد الالكتروني</FormLabel>
        <Input
          id={"email"}
          _placeholder={{ color: 'gray.500' }}
          type="email"
          {...register("email" )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>رقم الهاتف</FormLabel>
        <Input
          id={"phone"}
          _placeholder={{ color: 'gray.500' }}
          type="phone"
          {...register("phone" )}
        />
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
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          type='submit'
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
  </form>
  )
}
