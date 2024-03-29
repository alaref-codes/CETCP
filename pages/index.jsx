import Head from 'next/head'
import Hero from '../components/Hero'
import CoursesCards from '@/components/CoursesCards'
import SubHeader from '@/components/SubHeader'
import { Box,Spinner } from '@chakra-ui/react'
import { useEffect, useState,useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && typeof(user) !== "undefined") {
      if (user.type === "trainer") {
        router.push("/instructor/courses");
      } else {
        setIsLoading(false);
      }
    } else { 
      setIsLoading(false);
    }

  }, [user,isLoggedIn])
  
  if (isLoading) {
    return <Spinner
    padding={"50px"}
    margin={"300px 650px"}
    thickness='15px'
    speed='1.20s'

    emptyColor='gray.200'
    color='blue.500'
    size='xl'
    />
  }
  return (
    <>
      <Head>
        <title>CETCP</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="College of electronic technology courses platform, كلية التقنية الإلكترونية منصة تعليمية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      {isLoading ? <Spinner
        padding={"50px"}
        margin={"300px 650px"}
        thickness='15px'
        speed='1.20s'

        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />: 
      <>
        <Hero></Hero>
        <SubHeader></SubHeader>
          <CoursesCards/></> }
        <Box bg={"gray.50"} height="100px"/>
      </main>
    </>
  )
}
