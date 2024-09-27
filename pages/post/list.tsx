import React from 'react'
import PostPaginatedListView from '@/app/views/PostPaginatedList'
import MainLayout from '@/app/MainLayout'


export default function PostListPage() {
  return (
    <MainLayout>
      <PostPaginatedListView />
    </MainLayout>
  )
}