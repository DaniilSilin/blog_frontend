import React from 'react'
import MainLayout from '@/app/MainLayout'
import type { GetServerSidePropsContext } from 'next'
import PostEditView from "@/app/views/PostEdit"


export default function PostPage(props) {
  return (
    <MainLayout>
      <PostEditView slug={props.slug} post_id={props.post_id} />
    </MainLayout>
  )
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      slug: ctx.query.slug,
      post_id: ctx.query.post_id
    }
  }
})