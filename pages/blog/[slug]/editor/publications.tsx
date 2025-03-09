import React from 'react'
import EditorMainLayout from "@/app/EditorMainLayout"
import BlogEditorPublicationsView from "@/app/views/BlogEditorPublications"
import type { GetServerSidePropsContext } from 'next'
import MainLayout from "@/app/MainLayout";
import {getConfig, serverSideResolverWrapper} from "@/app/store/wrapper";

export default function BlogEditorPublications(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorPublicationsView slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["blogEditorPosts", (ctx) => ({ slug: ctx!.query.slug, page: 1 })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {
        slug: ctx.query.slug,
      },
    }
  },
  results => {
    return false
  }
)
