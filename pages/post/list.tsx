import React from "react";
import MainLayout from "@/app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";
import PostListView from "@/app/views/PostPaginatedList";

export default function PostListPage() {
  return (
    <MainLayout>
      <PostListView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["getPostPaginatedList", () => ({ page: 1 })],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
