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
  } from '@chakra-ui/react';
  import { useForm,  useFormContext,
    Controller,
    useController } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { useRef } from 'react';
  import { Editor } from '@tinymce/tinymce-react';

  import { useMutation } from '@tanstack/react-query';

  
  export default function CourseInfoTabForm() {
    const editorRef = useRef(null);
    const form = useForm({
      defaultValues: {
        title: "",
        header: "",
        description: "Hello world",
        category: "",
      }
    });
    const toast = useToast()
    const { register,handleSubmit, formState,control } = form;

    const { errors,isDirty } = formState
    console.log(isDirty);


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
                <Input id={"title"} bg={"white"} type="text" {...register("title" , {
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
              <FormControl >
                <FormLabel>خلفية الدورة</FormLabel>
                <Input id={"courseImage"} bg={"white"} type="file" border={"none"} {...register("courseImage" , {
                            required: {
                              value: true,
                              message: "يجب تعبئة هذا الحقل"
                            }
                          })} />
              </FormControl>
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
                  <option>البرمجة</option>
                  <option>الاتصالات</option>
                  <option>الشبكات</option>
                  <option>تحكم آلي</option>
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