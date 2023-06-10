import Layout from "../components/layout"
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/tajawal/300.css'
import '@fontsource/almarai/300.css';

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc


const theme = extendTheme({
  fonts: {
    heading: `'Almarai', sans-serif`,
    body: `'Almarai', sans-serif`,
  },
})


export default function App({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(
    <ChakraProvider theme={theme} >
      <Component {...pageProps}></Component>
      </ChakraProvider>
      )
  }

  return (
    <ChakraProvider theme={theme} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
