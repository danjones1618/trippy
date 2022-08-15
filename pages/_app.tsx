import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Header from '../components/header'
import { theme } from '../styles/theme'

type TrippyPageProps = NextPage & {
  title?: string
}

type TrippyAppProps = AppProps & {
  Component: TrippyPageProps
}

function MyApp({ Component, pageProps }: TrippyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Trippy</title>
        <meta name="description" content="A self-hosted shared image gallary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={Component.title || ""} />
      <Container p={4} maxW="container.lg">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp
