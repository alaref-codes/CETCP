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
    Avatar,
    Popover,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    PopoverTrigger,
    Input,
    Image,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
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
  import * as URL from "@/constants"

import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
  import { useState,useContext,useEffect } from 'react';
  import useSWR from 'swr'

import axios from 'axios'

async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

async function logoutCall(token) {
  return await fetch(`${URL.API_URL}/user-logout`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
}

export default function Navbar() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const { user, isLoggedIn, token, logout,login } = useContext(AuthContext);
  const [myData, setMyData] = useState(null);
  const [mainLink,setMainLink] = useState("/");

  useEffect(() => {
    if (!isLoggedIn) {
      const storedToken = localStorage.getItem("token");
        if (storedToken && storedToken != "null") {          
          getUserData(storedToken).then((data) => {
            setMyData(data);
            if (data.data.type == "trainer") {
              setMainLink("/instructor/courses") 
            }   
            login(storedToken)
          });
      }
    } else {
      login(token);
      getUserData(token).then((data) => {
        setMyData(data);
        if (data.data.type == "trainer") {
          setMainLink("/instructor/courses") 
        }
      });
    }
  }, []);
  
  const searchToggle = () => {
    setSearchIsOpen(!searchIsOpen)
  }

  const onLogout = () => {
    logoutCall(localStorage.getItem("token")).then(() => {
      localStorage.setItem("token", null)
      logout();
      router.push("/signin")
    })
  }

  return (
      <Box>
        <Flex
          bgGradient={'linear(to-l, blue.700, linkedin.700)'}
          color={useColorModeValue('gray.200', 'white')}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={"0.7px"}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
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
          <Flex flex={{ base: 4 }}  justify={{ base: 'center', md: 'start' }} align={"center"} >
          <Link
              textAlign={{ base: 'center', md: 'left' }}
              color={useColorModeValue('gray.800', 'white')}
              href={mainLink ? mainLink : "/"}
              >
          <Image src={"/cet_logo.webp"} alt="me" width={{ base:"800px", md:"250px"}} height={"50px"}  borderRadius={"10px"} marginLeft={"20px"} ></Image>
            </Link>
              <Flex display={{ base: 'flex', md: 'none' }}>
              {myData &&  (
                <HStack>
                  <Text fontWeight={"bold"} >{myData.data.name}</Text>
                    <Menu>
                      <MenuButton> 
                      <Avatar
                        size={'md'}
                        src={
                          `${URL.USER_IMAGE}/${myData.data.image}`
                        }
                      />
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link  href={`/profile/${myData.data.id}`}>
                            <MenuItem color={"black"} >الملف الشخصي</MenuItem>
                          </Link> 
                        </MenuItem>     
                        <MenuItem>
                          <Button color={"black"} fontSize={'sm'} fontWeight={400}  onClick={onLogout} >تسجيل خروج</Button>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                </HStack>
              )}
              </Flex>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav/>
            </Flex>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            display={{ base: 'none', md: 'inline-flex' }}

            spacing={6}>
              {myData ? (
                <HStack>
                  <Text fontWeight={"bold"}>{myData.data.name}</Text>
                  <Menu>
                <MenuButton> 
                <Avatar
                    size={'md'}
                    src={
                      `${URL.USER_IMAGE}/${myData.data.image}`
                    }
                  />
                  </MenuButton>
                  <MenuList>
                  <Link  href={`/profile/${myData.data.id}`}>
                    <MenuItem color={"black"} >الملف الشخصي</MenuItem>
                  </Link>
                  <MenuItem>
                    <Button color={"black"} fontSize={'sm'} fontWeight={400}  onClick={onLogout} >تسجيل خروج</Button>
                  </MenuItem>
                  </MenuList>
                  </Menu>
                </HStack>
                 )
                 : (
                  <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    display={{ base: 'none', md: 'inline-flex' }}

                    spacing={6}>
                    <Link href={"/trainerSignup"} >
                      <Text fontSize={"0.9rem"} fontWeight={"bold"}>التسجيل كمدرب</Text>
                    </Link>
                    <Link
                      fontWeight={600}
                      href={'/signup'}
                      _hover={{
                        bg: 'blue.300',
                      }}><Button bg={'blue.400'} color={'white'}>
                      <Text fontSize={"15px"}>تسجيل حساب</Text>
                      </Button>
                    </Link>
                    <Link 
                      fontSize={'sm'}
                      fontWeight={400}
                      href={'/signin'}>
                      <Button  color={'black'}>
                      <Text fontSize={"15px"}>تسجيل دخول</Text>
                      </Button>
                    </Link>
                  </Stack>
                 )}
            
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
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);

  const getCategories = () => {
    return useSWR(`${URL.API_URL}/categories`, fetcher);
  }

  const DesktopNav = ({}) => {
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const { data,isLoading } = getCategories()

    if (isLoading) return <Text>Loading...</Text>;
    NAV_ITEMS[0].children = data.data;

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
                      <DesktopSubNav key={child.name} {...child} />
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
  
  const DesktopSubNav = ({ name,id }) => {
    return (
      <Link
        href={`/courses/byCategory/${id}`}
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
              {name} 
            </Text>
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
      router.push(`/courses/search/${values.search}`)

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
    const { data,isLoading } = getCategories()
    const { isLoggedIn } = useContext(AuthContext);


    if (isLoading) return <Text>Loading...</Text>;


    NAV_ITEMS[0].children = data.data;

    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {!isLoggedIn && <Link href={"/signin"}><Text fontWeight={"bold"} >تسجيل الدخول</Text></Link>}
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} >
        <Flex
          onClick={children && onToggle}
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
                <Link key={child.name} py={2} href={"/"}>
                  {child.name}
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
      children: [],
      href: "#"
    },
    {
      label: 'الدورات',
      children: null,
      href: "/myCourses"
    },
    {
      label: 'حول',
      children: null,
      href: "/about"
    }


  ];
  