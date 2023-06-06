import CourseInfoTabForm from '@/components/CourseInfoTabForm'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Tabs,Flex, TabList,Text, TabPanels,Box, Tab, TabPanel, Heading } from '@chakra-ui/react'
import { Form } from 'formik'
import Link from 'next/link'
import React from 'react'
// display={{base:"none",md:"initial"}} 
export default function CourseManage() {
  return (
    <Box>
        <Box>
            <Flex
              bg={'gray.700'}
              color={'white'}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={'solid'}
              borderColor={'gray.900'}
              align={'center'}>
                <Link href={"/instructor/courses"}><ArrowForwardIcon boxSize={"40px"} ></ArrowForwardIcon></Link>
                <Link href={"/instructor/courses"}><Text marginRight={"8px"}>الرجوع إلى الصفحة السابقة</Text></Link>
                <Text marginRight={"100px"} fontWeight={"900"} >تعلم البرمجة</Text>
              </Flex>
              <Heading marginRight={"20px"} marginTop={"20px"} >قم بتعبئة بيانات المسار الخاص بك</Heading>

          </Box>
      <Box width={"80%"} margin={"50px auto"}>

        <Tabs orientation={{base:"horisontal",md:'vertical'}} isFitted bg="gray.100" variant='enclosed-colored'
         color={"blue.700"} >
            <TabList>
                <Tab>معلومات البرنامج</Tab>
                <Tab>محتوى الكورس</Tab>
                <Tab>معلومات أخرى</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                        <CourseInfoTabForm></CourseInfoTabForm>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
                <TabPanel>
                <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </Box>
    </Box>

  )
}
