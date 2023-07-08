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

export default function InstructorNavbar() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const { user,isLoggedIn, token, logout,login } = useContext(AuthContext);
  const [myData, setMyData] = useState(undefined);
  const [mainLink,setMainLink] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        if (storedToken && storedToken != "null") {
          getUserData(storedToken).then((data) => {
            setMyData(data);
            if (data.data.type == "trainer") {
              setMainLink("/instructor/courses") 
            }   
            login(storedToken)
          });
        }
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
          bg={useColorModeValue('#4694D0', 'gray.800')}
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
          <Image src={"/cet_logo3.png"} alt="me" width={"100px"} height={"80px"}  borderRadius={"10px"} marginLeft={"20px"} ></Image>
            </Link>
          <Text borderLeft={{base: "none", md: "2px solid gray"}}  borderRight={{base: "2px solid gray", md:"none"}} paddingLeft={{base:"0px",md:"15px"}} marginLeft={{md:"20px"}} letterSpacing={"0.3rem"} fontWeight={"bold"} fontSize={"1.4rem"} color={"black"} >CETEP</Text>

              <Flex display={{ base: 'flex', md: 'none' }}>
              {myData &&  (
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
              )}
              </Flex>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            display={{ base: 'none', md: 'inline-flex' }}

            spacing={6}>
              {myData ? (
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
      </Box>
    );
  }
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);



  const DesktopNav = () => {
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
            </Popover>
          </Box>
        ))}
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
  
  const MobileNavItem = ({ label, href }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} >
        {!isLoggedIn && <Link href={"/signin"}><Text fontWeight={"bold"} >تسجيل الدخول</Text></Link>}
        <Flex
          onClick={onToggle}
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
        </Flex>
      </Stack>
    );
  };
  

  const NAV_ITEMS = [
    {
      label: 'الدورات',
      children: null,
      href: "/instructor/courses"
    },

  ];
  