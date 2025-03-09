import React from 'react'
import BlogView from '@/app/views/Blog'
import MainLayout from '@/app/MainLayout'
import { getConfig, serverSideResolverWrapper } from '@/app/store/wrapper'

export interface Props {
    children: React.ReactNode
}

export default function BlogPage(props, children) {
  return (
    <MainLayout>
      <BlogView children={children} slug={props.slug} />
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["getBlog", (ctx) => ({ slug: ctx!.query.slug })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {
        slug: ctx.query.slug,
      },
    }
  },
  results => {
    return !!results.getBlog.isError
  }
)
