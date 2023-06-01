import Layout from "../components/layout"
import '@fontsource/tajawal/300.css'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc


const theme = extendTheme({
  fonts: {
    heading: `'Tajawal', sans-serif`,
    body: `'Tajawal', sans-serif`,
  },
})



export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
