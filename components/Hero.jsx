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
      backgroundImage={
        'url(https://img.freepik.com/free-photo/3d-render-low-poly-plexus-design-network-communications_1048-14542.jpg?w=996&t=st=1684876599~exp=1684877199~hmac=f34edc24dc82342886a05a03443c80443221a1afc2c2bc907530e12564942ba4)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
        
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
   
          <Text
            color={'white'}
            lineHeight={1.2}
            bgGradient='linear(to-l, blue.50, gold)'
            bgClip='text'
            fontSize={{base:"4xl",md:'5xl'}}
            fontWeight='extrabold'
            >
            منصة كلية التقنية الإلكترونية - طرابلس التعليمية
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
