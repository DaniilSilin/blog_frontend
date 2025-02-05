import React from 'react'
import PostPaginatedListView from '@/app/views/PostPaginatedList'
import MainLayout from '@/app/MainLayout'
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper"

export default function PostListPage() {
  return (
    <MainLayout>
      <PostPaginatedListView />
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  [
    "getPostPaginatedList",
  ],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {},
    }
  }
)

