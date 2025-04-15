import React from "react";

import BlogCreateView from "@/app/views/BlogCreate/BlogCreateView";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function BlogCreatePage() {
  return (
    <MainLayout>
      <BlogCreateView />
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
  (results) => {
    return false;
  },
);
