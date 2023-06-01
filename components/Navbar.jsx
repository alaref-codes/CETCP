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
    Link,
    Popover,
    PopoverTrigger,
    Input,
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
  
  import { useFormik } from "formik";
import { useState } from 'react';
  

  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [searchIsOpen, setSearchIsOpen] = useState(false);

    const formik = useFormik({
      initialValues: {
        search: '',
      },
      onSubmit: (values) => {
         window.location.href = `/searchPage/${values.search}`;
      },
    })

    const searchToggle = () => {
      setSearchIsOpen(!searchIsOpen)
    }

    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
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
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              href='/'
              >
              كلية التقنية الإلكترونية
            </Link>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <HStack flexWrap={{base:"wrap", md:"nowrap" }} spacingy="20px"  display={{base:'none',md:'inline-flex'}} mx={{base:"10%", md:"1%"}} width={{base:"60%",md:"50%",lg:"70%"}} >
        <form onSubmit={formik.handleSubmit} >
          <HStack px="10px" border="1px solid black" borderRadius="10px" >
            <button><SearchIcon onClick={formik.handleSubmit} ></SearchIcon></button>
            <Input required w={{lg:"360px"}} id="search" border="0px solid white" onChange={formik.handleChange}  value={formik.values.search} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
          </HStack>
        </form>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
    </HStack>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/signin'}>
              Sign In
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              href={'/signup'}
              _hover={{
                bg: 'blue.300',
              }}>
              Sign Up
            </Button>
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
    const linkColor = useColorModeValue('gray.600', 'gray.500');
    const linkHoverColor = useColorModeValue('blue.800', 'blue');
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
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
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
    const formik = useFormik({
      initialValues: {
        search: '',
      },
      onSubmit: (values) => {
        if (values === '') {
          

        }
        window.location.href = `./searchPage/${values.search}`;

      },
    })
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
          <HStack px="10px" border="1px solid black" borderRadius="10px" >
            <IconButton icon={<SearchIcon onClick={formik.handleSubmit} variant={'ghost'} />}></IconButton>
            <Input required  id="search" border="0px solid white" onChange={formik.handleChange}  value={formik.values.search} marginLeft="30px" borderColor="white" borderRadius="16px" placeholder='ابحث عن أي شيء'></Input>
          </HStack>
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


  ];
  