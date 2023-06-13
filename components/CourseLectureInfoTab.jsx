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

  export default function CourseInfoTabForm() {
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
              
              <Text> لم تقم بإضافة محاضرات بعد </Text>
          </Box>
          <Box
            rounded={'sm'}
            bg={useColorModeValue('gray.50', 'gray.700')}
            border={"1px solid lightgray"}
            boxShadow={'xl'}
            p={8}
            width={{base:"100%" ,lg:"4xl"}}>
            <Stack spacing={4}>
              <Text fontSize={"xl"} fontWeight={"bold"} >إضافة محاضرة</Text>
              <FormControl id="email">
                <FormLabel>عنوان المحاضرة</FormLabel>
                <Input bg={"white"} type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>وصف</FormLabel>
                <Textarea bg={"white"} type="textarea" />
              </FormControl>
              <FormControl id="courseImage">
                <FormLabel>فيديو المحاضرة</FormLabel>
                <Input  type="file" border={"none"} ></Input>
              </FormControl>

              {/* <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
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
      /> */}
              
              <Stack spacing={10}>

                <Button
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
        </Stack>
    );
  }