import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import EditorMainLayout from "@/app/EditorMainLayout";
import BlogEditorPublicationsView from "@/app/views/BlogEditorPublications";
import MainLayout from "@/app/MainLayout";

export default function BlogEditorPublications(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEditorPublicationsView slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["blogEditorPosts", (ctx) => ({ slug: ctx!.query.slug, page: 1 })],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {
        slug: ctx.query.slug,
      },
    };
  },
  (results) => {
    return false;
  },
);
