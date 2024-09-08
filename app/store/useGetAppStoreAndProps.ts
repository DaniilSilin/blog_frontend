import { useMemo } from "react"
import { initializeStore } from "./index"
import { AppProps } from "next/app"

export interface WrapperProps {
  initialProps: any
  initialState: any
}

const useGetAppStoreAndProps = (incomingProps: any, context: any) => {
  // createWrapper adds WrapperProps to incomingProps, they are not present in P so type needs to be coerced here
  const {
    initialState: giapState,
    initialProps,
    ...props
  } = incomingProps as AppProps & WrapperProps

  // getStaticProps state
  const gspState = props?.__N_SSG ? props?.pageProps?.initialState : null
  // getServerSideProps state
  const gsspState = props?.__N_SSP ? props?.pageProps?.initialState : null
  // getInitialPageProps state
  const gippState =
    !gspState && !gsspState ? props?.pageProps?.initialState ?? null : null

  const store = useMemo(
    () =>
      initializeStore(
        {
          ...(giapState || {}),
          ...(gspState || {}),
          ...(gsspState || {}),
          ...(gippState || {}),
        },
        context
      ),
    [giapState, gspState, gsspState, gippState]
  )

  // useHybridHydrate(store, giapState, gspState, gsspState, gippState);

  let resultProps: any = props

  // order is important! Next.js overwrites props from pages/_app with getStaticProps from page
  // @see https://github.com/zeit/next.js/issues/11648
  if (initialProps && initialProps.pageProps) {
    resultProps.pageProps = {
      ...initialProps.pageProps, // this comes from wrapper in _app mode
      ...props.pageProps, // this comes from gssp/gsp in _app mode
    }
  }

  // just some cleanup to prevent passing it as props, we need to clone props to safely delete initialState
  if (props?.pageProps?.initialState) {
    resultProps = { ...props, pageProps: { ...props.pageProps } }
    delete resultProps.pageProps.initialState
  }

  // unwrap getInitialPageProps
  if (resultProps?.pageProps?.initialProps) {
    resultProps.pageProps = {
      ...resultProps.pageProps,
      ...resultProps.pageProps.initialProps,
    }
    delete resultProps.pageProps.initialProps
  }

  return { store, props: { ...initialProps, ...resultProps } }
}

export default useGetAppStoreAndProps