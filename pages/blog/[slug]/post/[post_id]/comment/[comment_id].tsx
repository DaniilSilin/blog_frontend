import React from 'react'
import MainLayout from '@/app/MainLayout'
import CommentView from "@/app/views/Comment"
import type {GetServerSidePropsContext} from "next";


export default function CommentPage(props) {
  return (
    <MainLayout>
      <CommentView post_id={props.post_id} slug={props.slug} comment_id={props.comment_id} />
    </MainLayout>
  )
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      slug: ctx.query.slug,
      post_id: ctx.query.post_id,
      comment_id: ctx.query.comment_id
    }
  }
})