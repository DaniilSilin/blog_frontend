import React from 'react'
import BlogListView from '@/app/views/BlogPaginatedList'
import MainLayout from '../../app/MainLayout'

export default function BlogListPage() {
  return (
    <MainLayout>
      <BlogListView />
    </MainLayout>
  )
}