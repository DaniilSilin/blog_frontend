import React from 'react'
import MainLayout from '../app/MainLayout'
import LikedPostListView from "@/app/views/LikedPostList"
import {getConfig, serverSideResolverWrapper} from "@/app/store/wrapper";

export default function LikedPostListPage() {
  return (
    <MainLayout>
      <LikedPostListView />
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["likedPostList", () => ({ page: 1 })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {},
    }
  }
)