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
  import { useForm,  useFormContext,
    Controller,
    useController } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useRef,useState,useEffect } from 'react';
  import { Editor } from '@tinymce/tinymce-react';
  import axios from 'axios';
  import { useMutation } from '@tanstack/react-query';
  import * as URL from '@/constants'
  import FormData from 'form-data'
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);

  const getCategories = () => {
    return useSWR(`${URL.API_URL}/categories`, fetcher);
  }
  
  export default function CourseInfoTabForm({course}) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const editorRef = useRef(null);
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
    let formData = new FormData();
    if (course) {
      // formData.append("image", imgData)
      form = useForm({
        defaultValues: {
          name: course.name,
          header: course.header,
          description: Parser().parse(course.description),
          category: course.category_id,
          length: course.length,
          price: course.price
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

    useEffect(() => {
    if (course){ 
      setImgData(`${URL.STORAGE_URL}/${course.image}`);
    }
  
    }, [])
    
    const toast = useToast()
    const { register,handleSubmit,control } = form;


    function insert_contents(inst){
      inst.setContent(course.description);  
    }
  
    const createCourse = async ({variables}) =>{

      formData.append('_method', "PUT");

      if (course.name !== variables.name){ 
        formData.append('name', variables.name);   //append the values with key, value pair
      }

      if (course.header !== variables.header) {
        formData.append('header', variables.header);
      }
      if (course.description !== variables.description) {
        formData.append('description', variables.description); 
      }
      if (course.price !== variables.price) {
        formData.append('price', variables.price);
      }
      if (course.category_id !== variables.category) {
        formData.append('category_id', variables.category);
      }
      if (course.length !== variables.length) {
        formData.append('length', variables.length);
      }


      if (typeof(variables.image[0]) !== "undefined") {
        formData.append('image', variables.image[0]);
      }

      
      return axios.post(`${URL.API_URL}/courses/${course.id}`,formData,{headers:
         { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": 'multipart/form-data'}}).then(res => res.data)

    }

    const { data } = getCategories()

    const mutation = useMutation({
      mutationFn: createCourse,
      onSuccess: () => {
        toast({
          position: 'top',
          title: 'تم تعديل معلومات الدورة بنجاح',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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
                        init_instance_callback: insert_contents,
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
                <FormControl onChange={onChangePicture} >
                  <FormLabel>خلفية الدورة</FormLabel>
                  <input width={"50%"} id={"image"} bg={"white"} type='file'  border={"none"} {...register("image")} />
                </FormControl>
                <Image margin={"10px"} padding={"10px"}  src={imgData} objectFit={"fill"} h="150px" w="150"></Image>
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
                  value={course.category_id}
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