import {
  Stack,
  Flex,
  Button,
  Link,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function WithBackgroundImage() {
  return (
    <Flex
      w={'full'}
      h={'80vh'}
      // backgroundImage={"https://v4.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_615163540096e1.68968110_FPpreview.mp4"}
      backgroundImage={
        '/wall-wallpaper-concrete-colored-painted-textured-concept-min.webp'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
        
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={'linear(to-l, purple, transparent)'}
        >
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
   
          <Text
            color={'white'}
            lineHeight={1.2}
            bgGradient='linear(to-l, blue.50, gold)'
            bgClip='text'
            fontSize={{base:"4xl",md:'5xl'}}
            fontWeight='1000'
            >
            منصّة كليّة التّقنية الإلكترونيّة - طرابلس التعليميّة
          </Text>
          <Stack direction={'row'}>
          <Link href='#crs' >
            <Button
              bg={'blue.400'}
              rounded="base"
              color={'white'}
              _hover={{ bg: 'blue.500' }}>
              تصفح الدورات
            </Button>
          </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
