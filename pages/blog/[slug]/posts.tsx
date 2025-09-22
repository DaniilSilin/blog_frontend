import React from "react";
import BlogPostsView from "@/app/views/BlogPosts";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BlogPostsPage(props: any) {
  return (
    <MainLayout>
      <BlogPostsView slug={props.slug} />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["getBlog", (ctx) => ({ slug: ctx!.query.slug })],
  ["getBlogPosts", (ctx) => ({ slug: ctx!.query.slug, page: 1 })],
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
