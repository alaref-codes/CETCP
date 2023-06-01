"use client"
import { Box, HStack, Heading, Input, Select } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function SubHeader() {
  return (
    <Box  p="20px" > 
    <HStack flexWrap={{base:"wrap", md:"nowrap" }} spacingy="20px"  mx={{base:"10%", md:"1%"}} width={{base:"70%",md:"50%"}} >
        <SearchIcon></SearchIcon>
        <Input marginLeft="30px" borderColor="black" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
        <Select border="0.01px solid" p={{base:"8px"}}  textAlign="center" width="150px"  placeholder="الفئات">
          <option value='option1'>برمجة</option>
          <option value='option2'>شبكات</option>
          <option value='option3'>اتصالات</option>
       </Select>
    </HStack>
    </Box>

    )
}
