import React from 'react'
import EditorMainLayout from "@/app/EditorMainLayout"
import type { GetServerSidePropsContext } from 'next'
import MainLayout from "@/app/MainLayout";
import BlogEditorInviteView from "@/app/views/BlogEditorInvite";

export default function BlogEditorInvite(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorInviteView slug={props.slug} />
      </EditorMainLayout>
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