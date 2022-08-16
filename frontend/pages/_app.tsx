import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
  const [ queryClient ] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp
