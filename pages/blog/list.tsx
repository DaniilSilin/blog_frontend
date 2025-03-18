import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import BlogListView from "@/app/views/BlogPaginatedList";
import MainLayout from "../../app/MainLayout";

export default function BlogListPage() {
  return (
    <MainLayout>
      <BlogListView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["getBlogPaginatedList", () => ({ page: 1 })],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
