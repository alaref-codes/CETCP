import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    useColorModeValue,
    Textarea,
    Heading,
    HStack,
    ListItem,
    OrderedList,
    Spinner,

  } from '@chakra-ui/react';
  import { DeleteIcon } from '@chakra-ui/icons'
  import axios from 'axios';
  import { useMutation } from '@tanstack/react-query';
  import * as URL from '@/constants'
  import FormData from 'form-data'
  import { useForm} from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useRouter } from 'next/router';

  export default function CourseInfoTabForm({course}) {
    let form = useForm();
    const toast = useToast()
    const router = useRouter();
    const { register,handleSubmit,formState } = form;
    const { errors } = formState

    const addLecture = async ({variables}) =>{
      let formData = new FormData();

      formData.append('course_id', course.id);   //append the values with key, value pair
      formData.append('name', variables.name);   //append the values with key, value pair
      formData.append('description', variables.description);
      formData.append('url', variables.video[0]);
      formData.append('resource_name', variables.resource_name);
      formData.append('resource_url', variables.resource_url[0]);
      formData.append('resource_description', variables.resource_description);
      
      return axios.post(`${URL.API_URL}/lectures`,formData,{headers:
         { Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": 'multipart/form-data'}}).then(res => res.data)

    }

    const mutation = useMutation({
      mutationFn: addLecture,
      onSuccess: () => {
        toast({
          position: 'top',
          title: 'تم إضافة محاضرة جديدة بنجاح',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.replace(`/instructor/courseManage/${course.id}`)
      },
      })
    
      const deleteLecture = useMutation((id) => {
        return axios.delete(`${URL.API_URL}/lectures/${id}`,{headers:
          { Authorization: `Bearer ${localStorage.getItem("token")}`}});
        }
      );

    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }
    
    if (mutation.isError){
      toast({
        position: 'top',
        title: mutation.error,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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
        <Stack marginY={"30px"} spacing={8} maxW={'lg'} >
          <Box
            rounded={'sm'}
            bg={useColorModeValue('white', 'gray.700')}
            border={"1px solid lightgray"}
            boxShadow={'xl'}
            p={8}
            width={{base:"100%" ,lg:"4xl"}}>
              <Text fontSize={"xl"} fontWeight={"bold"} >المحاضرات</Text>
              <OrderedList marginTop={"20px"} padding={"10px"} width={"60%"}>
              {course && course.lectures.map(lecture => (
                    <HStack >
                      <ListItem><Heading fontSize={"1.4rem"}>{lecture.name}</Heading></ListItem>
                      <Button onClick={() => deleteLecture.mutate(lecture.id)} ><DeleteIcon/></Button>
                    </HStack>
                  ))}
              </OrderedList>
          </Box>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <Box
              rounded={'sm'}
              bg={useColorModeValue('gray.50', 'gray.700')}
              border={"1px solid lightgray"}
              boxShadow={'xl'}
              p={8}
              width={{base:"100%" ,lg:"4xl"}}>
              <Stack spacing={4}>
                <Text fontSize={"xl"} fontWeight={"bold"} >إضافة محاضرة</Text>
                <FormControl >
                  <FormLabel>عنوان الدورة</FormLabel>
                  <Input id={"name"} bg={"white"} type="text" {...register("name" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.name?.message}</Text>

                <FormControl >
                  <FormLabel>وصف للمحاضرة</FormLabel>
                  <Textarea id={"description"} bg={"white"} inputProps={{ maxLength: 12 }}  type="text" {...register("description" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.description?.message}</Text>
                <FormControl>
                    <FormLabel>المحاضرة</FormLabel>
                <input width={"50%"} id={"video"} bg={"white"} type='file' border={"none"} {...register("video" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            } )} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.video?.message}</Text>
                <FormControl >
                  <FormLabel>اسم المرفق</FormLabel>
                  <Input id={"resource_name"} bg={"white"} type="text" {...register("resource_name" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.resource_name?.message}</Text>
                <FormControl >
                  <FormLabel>وصف المرفق</FormLabel>
                <Textarea id={"resource_description"} bg={"white"} inputProps={{ maxLength: 12 }}  type="text" {...register("resource_description" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.resource_description?.message}</Text>

                <FormControl>
                    <FormLabel>ملف المرفق</FormLabel>
                <input width={"50%"} id={"resource_url"} bg={"white"} type='file' border={"none"} {...register("resource_url" , {
                              required: {
                                value: true,
                                message: "يجب تعبئة هذا الحقل"
                              }
                            })} />
                </FormControl>
                <Text color={"red"}  fontSize={"12px"} >{errors.resource_url?.message}</Text>
                <Stack spacing={10}>
                  <Button
                    isDisabled={mutation.isLoading}
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    width={"80px"}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    >
                    حفظ
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
    );
  }