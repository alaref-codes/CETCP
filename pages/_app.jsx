import Layout from "../components/layout"
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/tajawal/300.css'
import '@fontsource/almarai/400.css';
import { AuthProvider } from "@/context/AuthContext";
import { extendTheme } from '@chakra-ui/react'
import Head from 'next/head'

import { 
  QueryClient,
  QueryClientProvider,
 } from '@tanstack/react-query';

// 2. Extend the theme to include custom colors, fonts, etc


const theme = extendTheme({
  fonts: {
    heading: `'Almarai', sans-serif`,
    body: `'Almarai', sans-serif`,
  },
})


export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
        <title>CETCP</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="College of electronic technology courses platform, كلية التقنية الإلكترونية منصة تعليمية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme} >
                <Component {...pageProps}></Component>
            </ChakraProvider>
          </QueryClientProvider>
      </AuthProvider>
      </>
      )
  }

  return (
    <>
    <Head>
    <title>CETCP</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="description" content="College of electronic technology courses platform, كلية التقنية الإلكترونية منصة تعليمية" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} >
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
    </>
  )
}
