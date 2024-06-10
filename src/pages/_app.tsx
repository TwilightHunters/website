// These styles apply to every route in the application
import '@/styles/globals.css'
import RootLayout from '../components/layout'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextUIProvider } from '@nextui-org/react'
import NextNProgress from 'nextjs-progressbar'
import { CookiesProvider } from 'react-cookie'
 
export default function App({ Component, pageProps }: AppProps) {  
  return (
    <>
      <SpeedInsights />
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
        <title>Taste the World | Головна</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CookiesProvider>
        <NextUIProvider>
          <RootLayout>
            <NextNProgress color="#467529" />
            <Component {...pageProps} />
          </RootLayout>
        </NextUIProvider>
      </CookiesProvider>
    </>
  )
}