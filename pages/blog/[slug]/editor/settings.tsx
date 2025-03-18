import React from "react";
import type { GetServerSidePropsContext } from "next";
import BlogEdit from "@/app/components/modules/blog_edit";
import EditorMainLayout from "@/app/EditorMainLayout";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BlogPage(props: any) {
  return (
    <MainLayout>
      <EditorMainLayout slug={props.slug}>
        <BlogEdit slug={props.slug} />
      </EditorMainLayout>
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["getBlog", (ctx) => ({ slug: ctx!.query.slug })],
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
