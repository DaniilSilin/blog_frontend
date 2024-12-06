import React from 'react'
import CommentCreateView from '@/app/views/CommentCreate'
import MainLayout from '@/app/MainLayout'
import type {GetServerSidePropsContext} from "next";


export default function CreateCommentPage(props) {
  return (
    <MainLayout>
      <CommentCreateView post_id={props.post_id} slug={props.slug} />
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