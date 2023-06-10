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

  import { ChevronDownIcon } from '@chakra-ui/icons';
  
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
            <Stack spacing={4}>
              <Text fontSize={"xl"}>بيانات المحاضرات</Text>
              <FormControl id="email">
                <FormLabel>عنوان المحاضرة</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>وصف</FormLabel>
                <Textarea type="textarea" />
              </FormControl>
              <FormControl id="courseImage">
                <FormLabel>فيديو المحاضرة</FormLabel>
                <Input type="file" width={"fit-content"} ></Input>
              </FormControl>
              
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