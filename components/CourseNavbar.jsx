import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  Input,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Image,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
  
import { useForm } from 'react-hook-form';

import { AuthContext } from '@/context/AuthContext';

import { useState, useContext} from 'react';
  

  export default function CourseNavbar() {
    const router = useRouter();
    const { isOpen, onToggle } = useDisclosure();
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const form = useForm();
    const { register,handleSubmit } = form;


    const onSubmit = (values) => {
      router.push(`/searchPage/${values.search}`)

    }

    const searchToggle = () => {
      setSearchIsOpen(!searchIsOpen)
    }

    return (
      <Box>
        <Flex
          bg={useColorModeValue('gray.700', 'gray.800')}
          color={useColorModeValue('gray.200', 'white')}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={"0.3px"}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          boxShadow='2xl '
          >
          <Flex
          
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
            <IconButton 
              onClick={searchToggle}
              variant={'ghost'} 
              icon={
                searchIsOpen ? <CloseIcon w={3} h={3} /> : <SearchIcon w={5} h={5} />
              }
            />
          </Flex>
          <Flex flex={{ base: 4 }}  justify={{ base: 'end', md: 'start' }} align={"center"} >
          <Link 
              fontSize={'sm'}
              fontWeight={400}
              href={'/signin'}>
              <Button  color={'black'} display={{base:"flex",md:"none"}}>
              <Text fontSize={"15px"}>تسجيل دخول</Text>
              </Button>
            </Link>
            <Link
              textAlign={{ base: 'center', md: 'left' }}
              color={useColorModeValue('gray.800', 'white')}
              href='/'
              >
              <Text borderLeft={{base: "none", md: "2px solid gray"}}  borderRight={{base: "2px solid gray", md:"none"}} paddingLeft={{base:"0px",md:"15px"}} marginLeft={{md:"20px"}} letterSpacing={"0.3rem"} fontWeight={"bold"} fontSize={"1.4rem"} color={"white"} >CETEP</Text>
            </Link>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Heading  fontWeight={"900"} fontSize={"1rem"} color={"gray.50"} >تعلم أساسيات البرمجة</Heading>
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            display={{ base: 'none', md: 'inline-flex' }}

            spacing={6}>
            <Link 
              fontSize={'sm'}
              fontWeight={400}
              href={'/'}>
              <Button  color={'black'}>
              <Text fontSize={"15px"}>تسجيل خروج</Text>
              </Button>
            </Link>
            <Menu>
              <MenuButton>
                  <Avatar
                  size={'md'}
                  src={
                    'https://bit.ly/sage-adebayo'
                  }
                />
              </MenuButton>
              <MenuList>
                <Link  href={"/profile/2"}>
                  <MenuItem color={"black"} >الملف الشخصي</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
        <Collapse in={searchIsOpen} animateOpacity>
          <SearchNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.900', 'gray.500');
    const linkHoverColor = useColorModeValue('blue.900', 'blue');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontWeight={800}
                  color={"black"}
                  _hover={{
                    textDecoration: 'none',
                    color: "black",
                  }}>
                  <Text fontWeight={"bold"} fontSize={'xl'} >{navItem.label}</Text>
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              color={"black"}
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const SearchNav = () => {
    const form = useForm();
    const { register,handleSubmit } = form;
    const router = useRouter()

    const onSubmit = (values) => {
      console.log(values);
      router.push(`/searchPage/${values.search}`)

    }

    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <HStack px="10px" border="1px solid black" borderRadius="10px" >
            <IconButton icon={<SearchIcon onClick={handleSubmit(onSubmit)} variant={'ghost'} />}></IconButton>
            <Input required  id="search" border="0px solid white" onChange={handleSubmit(onSubmit)}  {...register("search")} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
          </HStack>
          </form>
      </Stack>
    );
  };
  

  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <HStack>
                          <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
    
            </HStack>
            
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  
  
  const NAV_ITEMS = [
    {
      label: 'الفئات',
      children: [

        {
          label: 'هندسة البرمجيات',
          href: '#',
        },
        {
          label: 'اتصالات',
          href: '#',
        },
        {
          label: 'تحكم آلي',
          href: '#',
        },
      ],
    },
    // {
    //   label: "تسجيل دخول",
    //   href:"/signin"
    // },
    // {
    //   label: "تسجيل حساب",
    //   href:"/signup"
    // },
    // {
    //   label: "تسجيل كمدرب",
    //   href:"/signin"
    // }


  ];
//   <Flex alignItems={'center'}>
//   <Button
//     variant={'solid'}
//     colorScheme={'teal'}
//     size={'sm'}
//     mr={4}
//     leftIcon={<AddIcon />}>
//     Action
//   </Button>
//   <Menu>
//     <MenuButton
//       as={Button}
//       rounded={'full'}
//       variant={'link'}
//       cursor={'pointer'}
//       minW={0}>
      // <Avatar
      //   size={'sm'}
      //   src={
      //     'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
      //   }
      // />
//     </MenuButton>
//     <MenuList>
//       <MenuItem>Link 1</MenuItem>
//       <MenuItem>Link 2</MenuItem>
//       <MenuDivider />
//       <MenuItem>Link 3</MenuItem>
//     </MenuList>
//   </Menu>
// </Flex>
// </Flex>