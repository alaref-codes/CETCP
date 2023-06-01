import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Container,
    Box
  } from '@chakra-ui/react'

import { MdCheckCircle } from "@chakra-ui/icons"
export default function InfoTab() {
  return (
            <List spacing={3}>
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                رقم الدرس: 1
            </ListItem>
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                اسم الدرس: مقدمة عن البرمجة  
            </ListItem>
            <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
                شرح المدرب : العارف أبو شعالة
            </ListItem>
            {/* You can also use custom icons from react-icons */}
        </List>
    )
}
