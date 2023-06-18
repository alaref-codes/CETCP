import Layout from "../components/layout"
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/tajawal/300.css'
import '@fontsource/almarai/400.css';
import { AuthProvider } from "@/context/AuthContext";

import { extendTheme } from '@chakra-ui/react'
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
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} >
          <AuthProvider>
            <Component {...pageProps}></Component>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
      )
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme} >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
    </QueryClientProvider>
  )
}
