import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import MainLayout from "@/app/MainLayout";
import BlogsMyView from "@/app/views/BlogsMy";

export default function BlogsMyPage() {
  return (
    <MainLayout>
      <BlogsMyView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
