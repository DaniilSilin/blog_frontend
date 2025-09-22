import React from "react";
import BlogView from "@/app/views/Blog";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BlogPage(props: any) {
  return (
    <MainLayout>
      <BlogView slug={props.slug} />
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
    return !!results.getBlog.isError;
  },
);
