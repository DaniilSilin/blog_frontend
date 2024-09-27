import React from 'react'
import MainLayout from '@/app/MainLayout'
import PostView from '@/app/views/Post'
import type { GetServerSidePropsContext } from 'next'


export default function PostPage(props) {
  return (
    <MainLayout>
      <PostView slug={props.slug} post_id={props.post_id} />
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