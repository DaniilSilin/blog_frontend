import React from 'react'
import CommentCreateView from '@/app/views/CommentCreate'
import MainLayout from '@/app/MainLayout'


export default function CreateCommentPage() {
  return (
    <MainLayout>
      <CommentCreateView />
    </MainLayout>
  )
}