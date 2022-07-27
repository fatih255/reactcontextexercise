import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import React from 'react'
import Navbar from '@common/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return <React.Fragment>
    <Navbar />
    <Component {...pageProps} />
  </React.Fragment>
}

export default MyApp
