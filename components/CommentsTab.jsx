import { Flex, HStack, Image,Box,Text, VStack, Divider } from "@chakra-ui/react";

export default function CommentsTab() {
  return (

      <Box>
              <Box border={"1px solid black"} borderRadius={"2px"} padding={"10px"} width={"50%"} >
      <HStack>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text>مصطفى دومة</Text>
        </HStack>
      <Box marginRight={"50px"} >
        <Text>basics</Text>
        
      </Box>
      </Box>

      <Box border={"1px solid black"} borderRadius={"2px"} padding={"10px"} width={"50%"} >
        <HStack>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text>راقي بأخلاقي</Text>
        </HStack>
      <Box marginRight={"50px"} >
        <Text>ما فهمت شيء الحق</Text>
      </Box>
      </Box>
      <Box border={"1px solid black"} borderRadius={"2px"} padding={"10px"} width={"50%"} >

      <HStack>
          <Image h={"50px"} w={"50px"} borderRadius={"50%"} src={"https://img.freepik.com/free-vector/digital-code-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_587448-634.jpg?w=1380&t=st=1685011207~exp=1685011807~hmac=b5885596e4d80be2993c684ce381bd30a92f1f714afc059f5e6bd1189b7bd265"} ></Image>
          <Text>محمد عزاقة</Text>
        </HStack>
      <Box marginRight={"50px"} >
        <Text>authentication</Text>
      </Box>
      </Box>

      </Box>

  )
}
