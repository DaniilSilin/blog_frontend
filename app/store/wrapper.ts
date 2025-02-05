import { GetServerSidePropsResult } from "next/types"
import { AnyAction, Store } from "redux"
import wrapper from "./base"
import DjangoService from './services/DjangoService'
import { GetServerSidePropsContext } from "next"

export type EndpointArgsFunction = (
  ctx: GetServerSidePropsContext | null,
  parentResult?: any
) => any
export type EndpointTuple = [string] | [string, EndpointArgsFunction]
export type EndpointManualFunction = (
  call: (method: string, arg: any) => Promise<any>,
  ctx: GetServerSidePropsContext | null
) => any
export type EndpointRawResult = { name: string; result: any; isError: boolean }
export type EndpointListResult = Record<
  string,
  {
    result: any
    isError: boolean
  }
>

export type ReduxWrapperConfig = Array<EndpointTuple | EndpointManualFunction>

const DEFAULT_CONFIG: ReduxWrapperConfig = []
const AUTH_CONFIG: ReduxWrapperConfig = [['getUserData']]

export const getConfig = (resolveConfig: ReduxWrapperConfig) => {
  return [...(DEFAULT_CONFIG || []), ...(resolveConfig || [])]
}

const unpackNamedArray = (
  namedArray: Array<EndpointRawResult | EndpointRawResult[]>
) => {
  return namedArray.reduce((acc: EndpointListResult, item) => {
    if (Array.isArray(item)) {
      item.forEach(_item => {
        acc[_item.name] = { result: _item.result, isError: _item.isError }
      })
    } else {
      acc[item.name] = { result: item.result, isError: item.isError }
    }
    return acc
  }, {})
}

const executeQueries = (
  queries: Array<EndpointTuple | EndpointManualFunction>,
  dispatch: any,
  ctx: GetServerSidePropsContext | null
): any => {
  const _queries = !!ctx!.req.cookies.token ? [...AUTH_CONFIG, ...queries] : queries
  const promises: any = _queries.map(async query => {
    if (typeof query === "function") {
      const call = (endpointName: string, params: any) => {
        const service = DjangoService
        const endpoint: AnyAction = (service as any).endpoints[
          endpointName
        ].initiate(params)
        return dispatch(endpoint)
          .unwrap()
          .then((result: any) => ({
            name: endpointName,
            isError: false,
            result,
          }))
          .catch((error: any) => ({
            name: endpointName,
            isError: true,
            result: error,
          }))
      }
      return query(call, ctx)
    } else {
      const [endpointName, argsFunction] = query
      const params = argsFunction ? argsFunction(ctx) : undefined
      const endpoint: AnyAction = (DjangoService as any).endpoints[
        endpointName
      ].initiate(params)
      return dispatch(endpoint)
        .unwrap()
        .then((result: any) => ({
          name: endpointName,
          isError: false,
          result,
        }))
        .catch((error: any) => ({
          name: endpointName,
          isError: true,
          result: error,
        }))
    }
  })
  return Promise.all(promises).then((result: any) => {
    return unpackNamedArray(result)
  })
}

export const serverSideResolverWrapper = (
  config: ReduxWrapperConfig,
  wrapped: (ctx: GetServerSidePropsContext, res?: any) => GetServerSidePropsResult<any>,
  decideIf404?: (results: any) => boolean
) =>
  wrapper.getServerSideProps(
    ({ dispatch }: Store) =>
      async (ctx: GetServerSidePropsContext) => {
        // executing all queries
        const res = await executeQueries(config, dispatch, ctx)

        // finding out if url should throw 404 based on queries result
        if (decideIf404) {
          if (decideIf404(res)) {
            return {
              notFound: true,
            }
          }
        }
        return wrapped(ctx, res)
      }
  )

export default serverSideResolverWrapper