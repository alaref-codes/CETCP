import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    Select,
    GridItem,
    useColorModeValue,
    Textarea,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Heading,
    HStack,
    Image,
  } from '@chakra-ui/react';
  import { Parser } from 'html-to-react'
  import useSWR from 'swr'
  import { useForm, Controller } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useRef,useState } from 'react';
  import { Editor } from '@tinymce/tinymce-react';
  import axios from 'axios';
  import { useMutation } from '@tanstack/react-query';
  import * as URL from '@/constants'
  import FormData from 'form-data'
  import { useRouter } from 'next/router';
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);

  const getCategories = () => {
    return useSWR(`${URL.API_URL}/categories`, fetcher);
  }
  
  export default function CourseInfoTabForm({course}) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const editorRef = useRef(null);
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
    let formData = new FormData();    //formdata object
    if (course) {
      formData.append("image", `${URL.STORAGE_URL}/${course.data.image}`)
      form = useForm({
        defaultValues: {
          name: course.data.name,
          header: course.data.header,
          description: Parser().parse(course.data.description),
          category: course.data.category_id,
          length: course.data.length,
          price: course.data.price
        }
      });
    } else {
      form = useForm({
        defaultValues: {
          name: "",
          header: "",
          description: "",
          category: "",
          length: "",
          price: ""
        }
      });
    }
    const toast = useToast()
    const { register,handleSubmit, formState,control } = form;

    const { errors,isDirty } = formState


    const createCourse = async ({variables}) =>{

      formData.append('name', variables.name);   //append the values with key, value pair
      formData.append('header', variables.header);
      formData.append('description', variables.description);
      formData.append('image', variables.image[0]);
      formData.append('category_id', variables.category);
      formData.append('price', variables.price);
      formData.append('length', variables.length);
      
      return axios.post(`${URL.API_URL}/courses`,formData,{headers:
         { Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": 'multipart/form-data'}}).then(res => res.data)

    }

    const { data } = getCategories()

    const mutation = useMutation({
      mutationFn: createCourse,
      onSuccess: () => {
        toast({
          position: 'top',
          title: 'تم إضافة دورة جديدة بنجاح',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push("/instructor/courses");
      },

      })
      
    let categories = null;
    if (data) {
      categories = data.data
    }

    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }

    return (

        <Stack marginY={"30px"} spacing={8} maxW={'lg'} >
          <Box
            rounded={'sm'}
            bg={useColorModeValue('gray.50', 'gray.700')}
            border={"1px solid lightgray"}
            boxShadow={'xl'}
            p={8}
            width={{base:"100%" ,lg:"4xl"}}>
            <form  onSubmit={handleSubmit(onSubmit)}>
            <Stack width={"100%"}  spacing={4}>
              <Text fontSize={"xl"}> ملاحظة: هذه المعلومات ستعرض في الواجهة الرئيسية الخاصة بالدورة</Text>
              <FormControl >
                <FormLabel>عنوان الدورة</FormLabel>
                <Input id={"name"} bg={"white"} type="text" {...register("name" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            }
                          })} />
              </FormControl>
              <FormControl >
                <FormLabel>عنوان فرعي</FormLabel>
                <Input id={"header"} bg={"white"} inputProps={{ maxLength: 12 }}  type="text" {...register("header" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            }
                          })} />
              </FormControl>
              <Controller
                Controller
                name="description"
                control={control}
                rules={{
                  required: "يجب تعبئة هذا الحقل",
                }}
                render={({ field: { onChange } }) => (
                  <FormControl >
                    <Editor apiKey='44gkr7bzvz2bcnl44931u48mvwpph88wtdbk1ycqyg2tqw4k'
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onEditorChange={onChange}
                  ></Editor>
                  </FormControl>
                )}
              />
              <HStack margin={"30px"} padding={"30px"} border={"2px solid black"}>
                <FormControl onChange={onChangePicture}>
                  <FormLabel>خلفية الدورة</FormLabel>
                  <input width={"50%"} id={"image"} bg={"white"} type='file' border={"none"} {...register("image")} />
                </FormControl>
                <Image margin={"10px"} padding={"10px"} src={imgData} objectFit={"fill"} h="150px" w="150"></Image>
              </HStack>
              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="country"
                  fontSize="md"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}>
                  فئة الدورة
                </FormLabel>
                <Select
                  id="category"
                  name="category"
                  autoComplete="category"
                  placeholder="Select option"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="lg"
                  rounded="md" 
                  {...register("category" , {
                    required: {
                      value: true,
                      message: "يجب تعبئة هذا الحقل"
                    }
                  })}>
                  {categories && categories.map(category => (
                    <option value={category.id} >{category.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl >
                <FormLabel>ثمن الدورة ( بالدينار الليبي )</FormLabel>
                <Input id="price" bg={"white"} type="number" {...register("price" , {
                    required: {
                      value: true,
                      message: "يجب تعبئة هذا الحقل"
                    }
                  })} />
              </FormControl>
              <FormControl >
                <FormLabel>طول الدورة ( بالساعات )</FormLabel>
                <Input id="length" bg={"white"} type="number" {...register("length" , {
                    required: {
                      value: true,
                      message: "يجب تعبئة هذا الحقل"
                    }
                  })} />
              </FormControl>

              <Stack spacing={10}>
              </Stack>
            </Stack>
              <Button
                  bg={'blue.400'}
                  color={'white'}
                  width={"80px"}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  >
                  حفظ
                </Button>
              </form>
          </Box>
        </Stack>
    );
  }
