import CourseInfoTabForm from '@/components/CourseInfoTabForm'
import CourseLectureInfoTab from '@/components/CourseLectureInfoTab'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { Tabs,Flex, TabList,Text, TabPanels,Box, Tab, TabPanel, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
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
              <Heading marginRight={"20px"} marginTop={"20px"} >قم بتعبئة بيانات الدورة الخاصة بك</Heading>


          </Box>
      <Box width={"90%"} margin={"50px auto"}>

        <Tabs orientation={{base:"horizontal",md:'vertical'}} isFitted bg="gray.100" variant='enclosed-colored'
         color={"blue.700"} >
            <TabList>
                <Tab>معلومات الدورة</Tab>
                <Tab>محتوى الدورة</Tab>
                <Tab>معلومات أخرى</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                  <CourseInfoTabForm></CourseInfoTabForm>
                </TabPanel>
                <TabPanel>
                  <CourseLectureInfoTab></CourseLectureInfoTab>  
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
