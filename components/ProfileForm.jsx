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
  import { useForm } from 'react-hook-form';
  import * as URL from '@/constants'

  
export default function ProfileForm({user}) {

  let form = useForm();

  if (user) {
    form = useForm({
      defaultValues: {
        username: user.name,
        email: user.email,
      }
    });
  } else {
    form = useForm({
      defaultValues: {
        username: "",
        email: "",
      }
    });
  }
  const { register,handleSubmit,formState } = form;

  return (
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
          <Avatar size="xl" src={`${URL.USER_IMAGE}/${user.image}`}>
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
  
  )
}
