import '../public/style/style.css'
import 'react-image-crop/dist/ReactCrop.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import useGetAppStoreAndProps from "@/app/store/useGetAppStoreAndProps"
import { useRouter } from "next/router"
import React from "react";
import Wrapper from '../app/components/wrapper'

export default function App(props: AppProps) {
  const router = useRouter()

  const {
    store,
    props: { Component, pageProps },
  } = useGetAppStoreAndProps(props, router)

  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}