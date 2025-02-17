import React from 'react'
import BlogListView from '@/app/views/BlogPaginatedList'
import MainLayout from '../../app/MainLayout'
import {getConfig, serverSideResolverWrapper} from "@/app/store/wrapper"

export default function BlogListPage() {
  return (
    <MainLayout>
      <BlogListView />
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["getBlogPaginatedList", () => ({ page: 1 })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {},
    }
  }
)
