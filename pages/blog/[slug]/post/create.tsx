import React from 'react'
import MainLayout from "@/app/MainLayout"
import PostCreateView from "@/app/views/PostCreate";
import type {GetServerSidePropsContext} from "next";

export default function PostCreatePage(props) {
  return (
    <MainLayout>
      <PostCreateView slug={props.slug} />
    </MainLayout>
  )
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      slug: ctx.query.slug
    }
  }
})